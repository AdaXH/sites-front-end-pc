import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  createRef,
  useEffect,
  useMemo,
} from 'react';
import { Input, Select } from 'antd';
import { getValueByRef } from '@/utils/functions';
import { SITE_TYPE } from '@/utils/constant';
import { SITETYPE } from 'site-type';
import SitesImg from './siteImgs';
import SiteIcon from './siteIcon';
import { reDesignData } from './util';
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
      setState(reDesignData(value));
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
    linkPrefix = 'https://',
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
  const selectBefore = (
    <Select
      value={linkPrefix}
      onChange={(val: string) => onSetVal('linkPrefix', val)}
      style={{ width: 90 }}
    >
      <Select.Option value="https://">https://</Select.Option>
      <Select.Option value="http://">http://</Select.Option>
    </Select>
  );

  useImperativeHandle(ref, () => {
    return {
      getValue: () => {
        const siteLinkUrl = linkPrefix + siteLink;
        return {
          siteType: 'technology',
          ...state,
          siteIcon: getValueByRef(iconRef),
          siteImgs: getValueByRef(siteImgsRef),
          siteLink: siteLinkUrl,
          originUrl: siteLink,
        };
      },
    };
  });

  return (
    <div className={styles.content}>
      <div className={styles.item}>
        <div className={styles.name}>
          <i className="iconfont iconlink1" />
        </div>
        <div className={styles.con}>
          <Input
            addonBefore={selectBefore}
            value={siteLink}
            onChange={(e) => onSetVal('siteLink', e.target.value)}
            // autoFocus
            maxLength={50}
            placeholder="站点链接 *"
          />
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.name}>
          <i className="iconfont icontype" />
        </div>
        <div className={styles.con}>
          <Select
            value={siteType}
            onChange={(val: string) => onSetVal('siteType', val)}
            style={{ width: 190 }}
            disabled={isEdit}
          >
            {SITE_TYPE.map(({ code, name }) => (
              <Select.Option key={code} value={code}>
                {name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>

      <div className={styles.item}>
        <div className={styles.name}>
          <i className="iconfont iconicon--" />
        </div>
        <div className={styles.con}>
          <Input
            value={siteName}
            onChange={(e) => onSetVal('siteName', e.target.value)}
            maxLength={15}
            placeholder="站点名称 *"
          />
        </div>
      </div>
      <SiteIcon value={siteIcon} ref={iconRef} />
      <div className={styles.item}>
        <div className={styles.name}>
          <i className="iconfont iconicon--" />
        </div>
        <div className={styles.con}>
          <Input.TextArea
            value={siteDesc}
            onChange={(e) => onSetVal('siteDesc', e.target.value)}
            maxLength={100}
            className={styles.textarea}
            placeholder="站点描述 *"
          />
        </div>
      </div>
      <SitesImg isQuickSubmit={isQuickSubmit} value={siteImgs} ref={siteImgsRef} />

      <div className={styles.item}>
        <div className={`${styles.name} defaultItem`}>
          <i className="iconfont iconrss1" />
        </div>
        <div className={styles.con}>
          <Input
            value={rss}
            onChange={(e) => onSetVal('rss', e.target.value)}
            maxLength={200}
            placeholder="提供rss订阅"
          />
        </div>
      </div>
      {isQuickSubmit && (
        <div className={styles.item}>
          <div className={`${styles.name} notRequired`}>
            <i className="iconfont iconemailFilled" />
          </div>
          <div className={styles.con}>
            <Input
              value={notiEmail}
              onChange={(e) => onSetVal('notiEmail', e.target.value)}
              maxLength={200}
              placeholder="选填，审核通过后邮件通知"
            />
          </div>
        </div>
      )}
    </div>
  );
});
