import React, { useCallback, useMemo, useState } from 'react';
import { Switch, Redirect } from 'dva/router';
import { mapRouteMethod } from '@/router/util';
import { PageSlide } from '@/component/pageSlide';
import { useDidMount } from '@/utils/hooks';
import { getConfig } from '@/layout/service';
import { SITES_ROUTES } from './constant';

import styles from './styles.less';

const menus = SITES_ROUTES.map(({ title, path, mainTitle }) => ({ title, mainTitle, path }));

export default ({ history }: { history: History }) => {
  const {
    location: { pathname },
  } = history;
  const { mainTitle, desc } = useMemo(() => SITES_ROUTES.find((item) => item.path === pathname), [
    pathname,
  ]);

  const [current, setPage] = useState<number>(
    () => menus.findIndex((item) => item.path === pathname) + 1,
  );
  const onChange = useCallback((page) => {
    history.push(menus[page - 1]?.path);
    setPage(page);
  }, []);
  const [config, setCfg] = useState<{ bgList?: Array<string> }>({});
  useDidMount(async () => {
    const { success, data } = await getConfig();
    if (success && data) {
      setCfg(data);
    }
  });
  const img = useMemo(() => {
    if (config.bgList?.length) {
      return config.bgList[current];
    }
  }, [config, current]);
  return (
    <div className={styles.sites}>
      <div className={styles.pageBox}>
        <PageSlide current={current} total={menus.length} onChange={onChange} />
      </div>
      <section className={styles.sitesCon}>
        <div
          className={styles.siteBigTitle}
          style={{
            backgroundImage: `url(${img})`,
          }}
        >
          <div className={styles.title}>
            <h3 className={styles.sitesConTitle}>{mainTitle}</h3>
            <h3 className={styles.desc}>{desc}</h3>
          </div>
        </div>
        <div className={styles.routeContainer}>
          <Switch>
            {mapRouteMethod(SITES_ROUTES)}
            <Redirect to="/sites/technology" />
          </Switch>
        </div>
      </section>
    </div>
  );
};
