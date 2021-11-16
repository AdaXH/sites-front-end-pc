import React, { useState, createRef, useMemo, useCallback } from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { RootState, User } from 'state-typings';
import { useDidMount } from '@/utils/hooks';
import { getValueByRef, getParam } from '@/utils/functions';
import Notification from '@/component/Notification';
import { querySite } from '@/utils/service';
import SubmitContent from './component/content';
import { SUBMIT_TYPES, QUICK_SUBMIT_STYPE } from './constant.tsx';
import { checkVal } from './util';
import { submitSite, updateSite, quickSubmitApi } from './service';

import styles from './styles.less';

interface SubmitProps {
  user: User;
  history?: any;
}

export default connect(({ user }: RootState) => ({ user }))((props: SubmitProps) => {
  const { history, user } = props;
  const comRef = createRef();
  const {
    location: { search },
  } = history;
  const siteId = getParam(search, 'siteId');
  const initSubmitType = getParam(search, 'submitType');
  const siteType = getParam(search, 'siteType');
  const [data, setData] = useState<SiteModel>({});
  const isEdit = !!siteId;
  const hasLogin = useMemo(() => {
    if (!user.isLogin) return false;
    return true;
  }, [user]);
  const [submitType, setType] = useState(initSubmitType || 'login');
  useDidMount(async () => {
    try {
      if (isEdit) {
        const result = await querySite({ siteType, siteId });
        if (result.success) {
          setData(result.data || {});
        }
      }
    } finally {
      // Loading.hide();
    }
  });
  const onSubmit = async () => {
    try {
      const values = checkVal(getValueByRef(comRef));
      const api = siteId ? updateSite : submitSite;
      const save = await api({ siteType, ...values, siteId });
      if (save.success) {
        Notification.success({
          msg: isEdit ? '已更新～' : '已提交，请等待审核',
        });
      }
    } catch (error) {
      if (error?.message) Notification.warning({ msg: error?.message });
    }
  };

  const quickSubmit = useCallback(async () => {
    try {
      const values = checkVal(getValueByRef(comRef), submitType === QUICK_SUBMIT_STYPE);
      const save = await quickSubmitApi({ siteType, ...values });
      if (save.success) {
        Notification.success({
          msg: isEdit ? '已更新～' : '已提交，请等待审核',
        });
      }
    } catch (error) {
      if (error?.message) Notification.warning({ msg: error?.message });
    }
  }, [comRef, submitType]);

  return (
    <div className={styles.container}>
      {!siteId && !hasLogin && (
        <div className={styles.submitTypeBox}>
          {SUBMIT_TYPES.map(({ title, key, desc }) => (
            <div
              onClick={() => setType(key)}
              data-current={submitType === key}
              className={styles.submtiTypeItem}
              key={key}
            >
              <h1>
                <i className="iconqianjin iconfont" />
                {title}
              </h1>
              <p>{desc(props)}</p>
            </div>
          ))}
        </div>
      )}

      <SubmitContent
        submitType={submitType}
        isEdit={isEdit}
        ref={comRef}
        value={data}
        siteType={siteType}
      />
      <div className={styles.footerWrap}>
        {submitType === QUICK_SUBMIT_STYPE ? (
          <Button className={styles.footer} type="primary" onClick={quickSubmit}>
            快速提交
          </Button>
        ) : (
          <Button disabled={!hasLogin} onClick={onSubmit} className={styles.footer} type="primary">
            {isEdit ? '更新站点' : '提交收录'}
            {!hasLogin && '（还没有登陆噢）'}
          </Button>
        )}
      </div>
    </div>
  );
});
