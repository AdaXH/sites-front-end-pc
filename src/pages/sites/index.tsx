import React, { useCallback, useMemo, useState } from 'react';
import { Switch, Redirect } from 'dva/router';
import { mapRouteMethod } from '@/router/util';
import { PageSlide } from '@/component/pageSlide';
import BasicTop from '@/component/basicTop';
import { SITES_ROUTES, HIDDEN_HREF_URLS } from './constant';

import styles from './styles.less';
import { getParam } from '@/utils/functions';
import { connect } from 'dva';
import { RootState, User } from 'state-typings';

const menus = SITES_ROUTES.map(({ title, path, mainTitle }) => ({ title, mainTitle, path }));

export default connect(({ user }: RootState) => ({
  user,
}))(({ user, history }: { user: User; history: History }) => {
  const {
    location: { pathname, search },
  } = history;
  const { createTitle, createDesc } = useMemo(() => {
    if (getParam(search, 'siteId') && pathname === '/sites/submit-site') {
      return {
        createTitle: 'Update',
        createDesc: '编辑您的站点，站点类型不可变更',
      };
    }
    return {};
  }, [pathname]);

  const [current, setPage] = useState<number>(
    () => menus.findIndex((item) => item.path === pathname) + 1,
  );
  const onChange = useCallback((page) => {
    history.push(menus[page - 1]?.path);
    setPage(page);
  }, []);

  const { mainTitle, desc, smallImg } = user?.pageConfig || {};
  const toSubmit = useCallback(() => {
    history.push(`/sites/submit-site?siteType=${mainTitle?.toLowerCase()}`);
    setPage(menus.length);
  }, [mainTitle]);
  return (
    <div className={styles.sites}>
      <div className={styles.pageBox}>
        <PageSlide current={current} total={menus.length} onChange={onChange} />
      </div>
      <BasicTop
        needMargin
        leftContent={
          <div className={styles.smallImg}>
            <div style={{ backgroundImage: `url(${smallImg})` }} />
          </div>
        }
        mainTitle={createTitle || mainTitle}
        desc={createDesc || desc}
        topText={!HIDDEN_HREF_URLS.includes(pathname) && '提交该类网站'}
        topFn={toSubmit}
      />
      <div className={styles.routeContainer}>
        <Switch>
          {mapRouteMethod(SITES_ROUTES)}
          <Redirect to="/sites/technology" />
        </Switch>
      </div>
    </div>
  );
});
