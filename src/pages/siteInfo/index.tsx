import React, { useCallback, useState, useMemo, ReactNode, useEffect, CSSProperties } from 'react';
import { connect } from 'dva';
import { RootState, User } from 'state-typings';
import ImgView from '@/component/imgModal';
import BasicTop from '@/component/basicTop';
import { useDidMount } from '@/utils/hooks';
import { getParam, formatTime, updTitleDesc, loadImgSize } from '@/utils/functions';
import { querySite } from '@/utils/service';
import MsgItem from './component/msgItem';
import RssList from './component/rssList';
import { toggltUpvoteSite, togglCollectSite, forceHot } from './service';

import styles from './styles.less';

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
  newMsgNode?: ReactNode;
  setNewMsgEntry?: (arg: boolean) => void;
  superAdmin?: boolean;
}

interface SiteData {
  siteName?: string;
  siteDesc?: string;
  userId?: string;
  siteImgs?: Array<{ src: string }>;
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
    const isLogin = useMemo(() => userModel.isLogin, [userModel]);
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
    const { myFavorite, _id: userId, superAdmin } = userModel;
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
      await forceHot({ siteId, siteType });
    }, [siteId, siteType]);
    const [newMsgNode, setNewMsgEntry] = useState<Boolean>(false);
    const [imgStyles, setImg] = useState<Partial<CSSProperties>>({});
    useEffect(() => {
      if (siteImgs?.length) {
        const [{ src }] = siteImgs;
        loadImgSize(src).then(({ ratio }) => {
          if (ratio < 1) {
            setImg({
              backgroundSize: 'auto 390px',
              backgroundPosition: 'center',
            });
          }
        });
      }
    }, [siteImgs]);
    if (!data.siteLink) return null;
    return (
      <div className={styles.siteInfoWrap}>
        <BasicTop
          mainTitle={siteName}
          desc={siteDesc}
          topText="访问源站"
          leftContent={
            <div className={styles.siteIconWrap}>
              <div style={{ backgroundImage: `url(${siteIcon})` }} className={styles.siteIcon} />
            </div>
          }
          topHref={siteLink}
          topFn={turn2Link}
          newWindow
        />
        <div className={styles.contentWrap}>
          <div className={styles.basic}>
            <div className={styles.siteName}>
              <h1>{siteName}</h1>
            </div>
            <div className={styles.link}>
              <h1>Link</h1>
              <p>
                <a data-default href={siteLink} target="_blank" rel="noreferrer">
                  {siteLink}
                </a>
              </p>
            </div>
            <div className={styles.date}>
              <h1>User</h1>
              <p>
                {user && (
                  <a
                    data-default
                    href={`/site-userInfo?userId=${siteUserId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {user}
                    <i className="iconlink iconfont" />
                  </a>
                )}
                于{formatTime(submitDate)}提交，热度飙升至{hot}
              </p>
            </div>
          </div>
          <div className={styles.desc}>
            <div className={styles.left}>
              <div>
                <h1>Desciption</h1>
                <p>{siteDesc}</p>
              </div>

              <div className={styles.btn}>
                <div onClick={onUpvote} data-btn>
                  <i className={`${hasUpvote ? 'icondianzan2' : 'icondianzan1'} iconfont`} />
                  <span>{hot + (siteUpvotes?.length || 0)}</span>
                </div>
                <div onClick={onCollect} data-btn>
                  <i className={`${hasCollect ? 'iconshoucangshixin' : 'iconshoucang'} iconfont`} />
                </div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.blogImgs}>
                <div
                  style={{ backgroundImage: `url(${siteImgs?.[0]?.src})`, ...imgStyles }}
                  onClick={() => ImgView(siteImgs?.[0]?.src)}
                  className={styles.img}
                ></div>
              </div>
            </div>
          </div>
          <div className={styles.msgList}>
            <div className={styles.left}>
              <h1>Message</h1>
              <div className={styles.siteIcon}>
                <div className={styles.img} style={{ backgroundImage: `url(${siteIcon})` }} />
              </div>
              <p>
                截至{formatTime(Date.now())}，共有{message.length}条留言
              </p>
              <div data-btn onClick={() => setNewMsgEntry(true)}>
                留个言
              </div>
            </div>
            <div className={styles.right}>
              <MsgItem
                setMsgList={setMsgList}
                data={{ message, siteType, siteId }}
                siteUserId={siteUserId}
                isLogin={isLogin}
                newMsgNode={newMsgNode}
                setNewMsgEntry={setNewMsgEntry}
                superAdmin={superAdmin}
              />
            </div>
          </div>
          <div className={styles.rss}>
            <h1>RSS</h1>
            <p>最近发布的10篇文章</p>
            <RssList data={rss} />
          </div>
        </div>
      </div>
    );
  },
);
