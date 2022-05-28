import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  createRef,
  useEffect,
  useMemo,
} from 'react';
import { Select } from 'antd';
import { getValueByRef } from '@/utils/functions';
import { SITE_TYPE } from '@/utils/constant';
import { SITETYPE } from 'site-type';
import SitesImg from './siteImgs';
import SiteIcon from './siteIcon';
// import { reDesignData } from './util';
import { QUICK_SUBMIT_STYPE } from '../../constant';

import styles from './styles.less';

interface SiteContent {
  value?: {};
  siteType: SITETYPE;
  isEdit: boolean;
  submitType: string;
}

export default forwardRef(({ value, siteType: preType, isEdit, submitType }: SiteContent, ref) => {
  const [state, setState] = useState<SiteModel>({ siteType: preType });
  const isQuickSubmit = useMemo(() => submitType === QUICK_SUBMIT_STYPE, [submitType]);
  useEffect(() => {
    if (value) {
      setState(value);
    }
  }, [value]);
  useEffect(() => {
    if (preType) {
      setState({
        ...state,
        siteType: preType,
      });
    }
  }, [preType]);
  const {
    siteLink,
    siteName,
    siteDesc,
    siteType = 'technology',
    siteIcon,
    siteImgs,
    rss,
    notiEmail,
  } = state;
  const iconRef = createRef();
  const siteImgsRef = createRef();
  const onSetVal = (key: string, value: string) => {
    setState({
      ...state,
      [key]: value,
    });
  };
  // const selectBefore = (
  //   <Select
  //     value={linkPrefix}
  //     onChange={(val: string) => onSetVal('linkPrefix', val)}
  //     style={{ width: 90 }}
  //   >
  //     <Select.Option value="https://">https://</Select.Option>
  //     <Select.Option value="http://">http://</Select.Option>
  //   </Select>
  // );

  useImperativeHandle(ref, () => {
    return {
      getValue: () => {
        // const siteLinkUrl = linkPrefix + siteLink;
        return {
          siteType: 'technology',
          ...state,
          siteIcon: getValueByRef(iconRef),
          siteImgs: getValueByRef(siteImgsRef),
          siteLink: siteLink,
          originUrl: siteLink,
        };
      },
    };
  });

  return (
    <div className={styles.content}>
      <div className={styles.item}>
        <div className={styles.label}>
          <h1>
            Link <i className="iconfont iconlink1" />
          </h1>
          <p>站点链接，http、https开头</p>
        </div>

        <div className={styles.con}>
          <input
            value={siteLink}
            onChange={(e) => onSetVal('siteLink', e.target.value)}
            maxLength={50}
          />
        </div>
      </div>
      <div className={styles.item}>
        <h1>
          SiteType <i className="iconfont icontype" />
        </h1>
        <p>站点类型</p>
        <div className={styles.con}>
          <Select
            value={siteType}
            onChange={(val: string) => onSetVal('siteType', val)}
            style={{ width: 190 }}
            disabled={isEdit}
          >
            {SITE_TYPE.map(({ code, name, disabled }) => (
              <Select.Option disabled={disabled} key={code} value={code}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>

      <div className={styles.item}>
        <h1>
          Name <i className="iconfont iconicon--" />
        </h1>
        <p>站点名称</p>
        <div className={styles.con}>
          <input
            value={siteName}
            onChange={(e) => onSetVal('siteName', e.target.value)}
            maxLength={15}
          />
        </div>
      </div>
      <SiteIcon value={siteIcon} ref={iconRef} />
      <div className={styles.item}>
        <h1>
          Description <i className="iconfont iconicon--" />
        </h1>
        <p>站点描述</p>
        <div className={styles.con}>
          <textarea
            value={siteDesc}
            onChange={(e) => onSetVal('siteDesc', e.target.value)}
            maxLength={100}
            className={styles.textarea}
          />
        </div>
      </div>
      <SitesImg isQuickSubmit={isQuickSubmit} value={siteImgs} ref={siteImgsRef} />
      <div className={styles.item}>
        <h1>
          Rss <i className="iconfont iconrss1" />
        </h1>
        <p>rss链接，提供订阅</p>
        <div className={styles.con}>
          <input value={rss} onChange={(e) => onSetVal('rss', e.target.value)} maxLength={200} />
        </div>
      </div>
      {isQuickSubmit && (
        <div className={styles.item}>
          <h1>
            Notification <i className="iconfont iconemailFilled" />
          </h1>
          <p>选填，审核通过后邮件通知</p>
          <div className={styles.con}>
            <input
              value={notiEmail}
              onChange={(e) => onSetVal('notiEmail', e.target.value)}
              maxLength={200}
            />
          </div>
        </div>
      )}
    </div>
  );
});
