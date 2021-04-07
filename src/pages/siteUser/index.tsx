import React, { useState } from 'react';
import Content from '@/layout/content';
// import { SITETYPE } from 'site-type';
import { User } from 'state-typings';
import { useDidMount } from '@/utils/hooks';
import { MAP_SITE_TYPE } from '@/utils/constant';
import { querySiteUser } from './service';

import styles from './styles.less';

export default ({ history }: { history: any }) => {
  const [data, setData] = useState<User>();
  useDidMount(async () => {
    const {
      location: { pathname },
    } = history;
    const userId = pathname.replace(/\/site-userInfo\//, '');
    if (userId) {
      const { data: resData, redirect } = await querySiteUser({ userId });
      if (redirect) {
        history.push('/user/basic-info');
        return;
      }
      if (resData) {
        setData(resData);
      }
    }
  });
  const { name, avatar, gender, myDesc, mySites } = data || {};
  if (!name) return null;
  return (
    <Content title="站长信息">
      <div className={styles.content}>
        <div className={styles.avatar} style={{ backgroundImage: `url(${avatar})` }}></div>
        <div className={styles.userName}>{name}</div>
        <div className={styles.infos}>
          <div className={styles.item}>
            <span className={styles.label}>性别：</span>
            <span className={styles.con}>{gender}</span>
          </div>

          <div className={styles.item}>
            <span className={styles.label}>介绍：</span>
            <span className={styles.con}>{myDesc}</span>
          </div>
          <div className={styles.item}>
            <span className={styles.label}>TA的站点：</span>
            <div className={styles.con}>
              {mySites.map((item, index) => {
                if (!item) return null;
                const { siteLink, siteName, siteId: _id, siteType } = item;
                return (
                  <div key={siteLink} className={styles.siteItem}>
                    <div
                      className={`${styles.item} ${styles.name}`}
                      onClick={() => window.open(`/site-info?siteId=${_id}&siteType=${siteType}`)}
                    >
                      <div className={styles.index}>{index + 1}</div>
                      {siteName}
                    </div>
                    <div className={styles.item}>
                      <span className={styles.siteType}>{MAP_SITE_TYPE[siteType]}</span>
                    </div>
                    <div className={styles.item}>
                      <a href={siteLink} target="_blank" rel="noreferrer">
                        {siteLink}
                        <i className="iconfont iconlink" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
};
