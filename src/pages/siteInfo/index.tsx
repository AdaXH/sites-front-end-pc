import React, { useCallback, useState } from 'react';
import { connect } from 'dva';
import Content from '@/layout/content';
import { RootState, User } from 'state-typings';
import ImgView from '@/component/imgModal';
import { useDidMount } from '@/utils/hooks';
import { getParam, formatTime, updTitleDesc } from '@/utils/functions';
import { querySite } from '@/utils/service';
import MsgItem from './component/msgItem';
import RssList from './component/rssList';
import { toggltUpvoteSite, togglCollectSite, forceHot } from './service';
import { TYPES } from './constant';
// import mock from './mock.json';

import styles from './styles.less';
import { useMemo } from 'react';

interface SiteModel {
  siteId?: string;
  siteType?: string;
}

export interface MsgItemData {
  toUserId?: string;
  fromUserId?: string;
  content?: string;
  fromUser: User;
  _id?: string;
  toUser: User;
  date?: Date | string | number;
}

interface MsgData extends SiteModel {
  [x: string]: any;
  message?: Array<MsgItemData>;
}

export interface MsgProps extends SiteModel {
  data: MsgData;
  setMsgList: (arr?: Array<MsgItemData> | []) => void;
  siteUserId: string;
  isLogin: boolean;
}

interface SiteData {
  siteName?: string;
  siteDesc?: string;
  userId?: string;
  siteImgs?: string;
  user?: {};
  siteLink?: string;
  submitDate?: Date;
  message?: Array<MsgItemData>;
  siteIcon?: string;
  siteUpvotes?: Array<string>;
  rss?: string;
  hot?: number;
}

interface BaseProps {
  userModel: User;
  history?: any;
  dispatch: (obj: any) => void;
}

export default connect(({ user: userModel }: RootState) => ({ userModel }))(
  ({ userModel, history, dispatch }: BaseProps) => {
    const [data, setData] = useState<SiteData>({});
    const [curType, setType] = useState(TYPES[0].key);
    const isBasic = useMemo(() => curType === 'basic', [curType]);
    const isLogin = useMemo(() => userModel.isLogin, [userModel]);
    const renderSiteImgs = useCallback((imgs) => {
      if (!imgs || !imgs.length) return null;
      if (imgs.length === 1) {
        const { src } = imgs[0];
        return (
          <div className={styles.blogImgs}>
            <div onClick={() => ImgView(src)} className={styles.img}>
              <img src={src} alt="" />
            </div>
          </div>
        );
      }
      const [first, second] = imgs;
      return (
        <div className={styles.twoImgs}>
          <div onClick={() => ImgView(first.src)} className={styles.imgOne}>
            <img src={first.src} alt="" />
          </div>
          <div onClick={() => ImgView(second.src)} className={styles.imgTwo}>
            <img src={second.src} alt="" />
          </div>
        </div>
      );
    }, []);

    const {
      siteName,
      siteDesc,
      userId: siteUserId,
      siteImgs,
      user,
      siteLink,
      submitDate,
      message,
      siteIcon,
      siteUpvotes,
      rss,
      hot = 0,
    } = data;
    const { myFavorite, _id: userId } = userModel;
    const {
      location: { search },
    } = history;
    const siteType = getParam(search, 'siteType');
    const siteId = getParam(search, 'siteId');
    useDidMount(async () => {
      const result = await querySite({ siteType, siteId });
      // const result = mock;
      if (result.success) {
        setData(result.data || {});
        if (result.data) {
          const { siteName: title, siteDesc: desc } = result.data;
          updTitleDesc(title, desc);
        }
      }
    });
    const hasUpvote = siteUpvotes && siteUpvotes.includes(userId);
    const onUpvote = useCallback(async () => {
      if (hasUpvote) return;
      const { success } = await toggltUpvoteSite({ siteId, siteType });
      if (success) {
        setData({
          ...data,
          siteUpvotes: [...siteUpvotes, userId],
        });
      }
    }, [hasUpvote]);
    const onCollect = async () => {
      const { success } = await togglCollectSite({ siteId, siteType });
      if (success) {
        dispatch({
          type: 'user/getUserInfo',
        });
      }
    };
    const setMsgList = (newMsgList: MsgData) => {
      setData({
        ...data,
        message: newMsgList.reverse(),
      });
    };
    const hasCollect = myFavorite && myFavorite.find((item: SiteModel) => item.siteId === siteId);
    const turn2Link = useCallback(async () => {
      window.open(siteLink);
      await forceHot({ siteId, siteType });
    }, [siteLink]);
    if (!data.siteLink) return null;
    return (
      <Content>
        <div className={styles.quickOpen}>
          <div style={{ backgroundImage: `url(${siteIcon})` }} className={styles.siteIcon} />
          <a onClick={turn2Link} className={styles.siteName}>
            {siteName}（{siteLink}）
            <i className="iconfont iconlink" />
          </a>
          <div className={styles.hot}>
            <i className="iconfont iconfire" />
            <span>{hot}</span>
          </div>
        </div>
        <div className={styles.contentWrap}>
          <div className={styles.typeBox}>
            {TYPES.map(({ title, key, iconfont }) => (
              <div
                onClick={() => setType(key)}
                data-current={curType === key}
                className={styles.typeItem}
                key={key}
              >
                <i className={iconfont} />
                <span className={styles.selectTitle}>{title}</span>
              </div>
            ))}
          </div>
          <div className={styles.content} style={{ display: !isBasic && 'none' }}>
            {renderSiteImgs(siteImgs)}
            <div className={styles.item}>
              {/* <span className={styles.name}>站点介绍：</span> */}
              <span className={styles.con}>{siteDesc}</span>
            </div>
            <div className={styles.item}>
              <span className={styles.name}>点赞：</span>
              <a className={styles.con} style={{ cursor: hasUpvote && 'not-allowed' }}>
                {siteUpvotes.length}
                <a className={styles.like} data-disabled={hasUpvote} onClick={onUpvote}>
                  <i
                    className="iconfont icondianzan"
                    style={{ color: hasUpvote ? '#fb7272' : 'rgba(255, 255, 255, 0.78)' }}
                  />
                </a>
              </a>
            </div>
            <div className={styles.item}>
              <span className={styles.name}>收藏：</span>
              <a className={styles.coll} onClick={onCollect}>
                <i className={`iconfont ${hasCollect ? 'iconshoucangshixin' : 'iconshoucang'}`} />
              </a>
            </div>
            <div className={styles.item}>
              <span className={styles.name}>站长：</span>
              <div className={styles.con}>
                <a
                  className={styles.con}
                  data-disabled={!user}
                  href={`/site-userInfo/${siteUserId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {user || '该站点为快速提交站点，没有站长信息'}
                  <i className="iconfont iconlink" />
                </a>
                <span className={styles.submitDate}>于{formatTime(submitDate)}提交</span>
              </div>
            </div>
            <MsgItem
              setMsgList={setMsgList}
              data={{ message, siteType, siteId }}
              siteUserId={siteUserId}
              isLogin={isLogin}
            />
          </div>
          {!isBasic && <RssList data={rss} />}
        </div>
      </Content>
    );
  },
);
