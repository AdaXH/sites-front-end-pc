import React, { useState } from 'react';
import BasicTop from '@/component/basicTop';
import SiteList from '@/component/siteList';
import { User } from 'state-typings';
import { useDidMount } from '@/utils/hooks';
import { querySiteUser } from './service';

import styles from './styles.less';
import { getParam } from '@/utils/functions';

export default ({ history }: { history: History }) => {
  const [data, setData] = useState<User>();
  useDidMount(async () => {
    const {
      location: { search },
    } = history;
    const userId = getParam(search, 'userId');
    if (userId) {
      const { data: resData, redirect } = await querySiteUser<Partial<User>>({ userId });
      if (redirect) {
        history.push('/user-center');
        return;
      }
      if (resData) {
        // @ts-ignore
        setData(resData);
      }
    }
  });
  const { name, avatar, gender, myDesc, mySites } = data || {};
  if (!name) return null;
  return (
    <div className={styles.content}>
      <BasicTop
        needMargin
        leftContent={
          <div className={styles.avatar}>
            <div className={styles.img} style={{ backgroundImage: `url(${avatar})` }}></div>
          </div>
        }
        mainTitle={`${name} (${gender})`}
        desc={myDesc}
      />

      <div className={styles.infos}>
        <h1 className={styles.label}>TA的站点：</h1>
        <SiteList data={mySites} history={history} />
      </div>
    </div>
  );
};
