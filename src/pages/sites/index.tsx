import { useMemo } from 'react';
import { Switch, Router, Redirect } from 'dva/router';
import Layout from '@/layout';

import { mapRouteMethod } from '@/router/util';
import React from 'react';
import { SITES_ROUTES } from './constant';
import styles from './styles.less';
import { PageSlide } from '@/component/pageSlide';

const menus = SITES_ROUTES.map(({ title, path, mainTitle }) => ({ title, mainTitle, path }));

export default ({ history }: { history: History }) => {
  const {
    location: { pathname },
  } = history;
  const curRoute = useMemo(() => SITES_ROUTES.find((item) => item.path === pathname), [pathname]);
  return (
    <div className={styles.sites}>
      <div className={styles.pageBox}>
        <PageSlide current={1} total={menus.length} />
      </div>
      {/* <Router history={history}> */}
      <header className={styles.menus}>
        {menus.map(({ title, path, mainTitle }) => (
          <div key={title} className={styles.menusItem} onClick={() => history.push(path)}>
            {title}
          </div>
        ))}
      </header>
      <section className={styles.sitesCon}>
        <h3 className={styles.sitesConTitle}>{curRoute?.mainTitle}</h3>
        <Switch>
          {mapRouteMethod(SITES_ROUTES)}
          <Redirect to="/sites/technology" />
        </Switch>
      </section>
    </div>
  );
};
