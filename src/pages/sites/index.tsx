import { Switch, Router, Redirect } from 'dva/router';
import Layout from '@/layout';

import { mapRouteMethod } from '@/router/util';
import React from 'react';
import { SITES_ROUTES } from './constant';

export default ({ history }) => {
  return (
    <div>
      sites
      {/* <Router history={history}> */}
      <Switch>
        {mapRouteMethod(SITES_ROUTES)}
        {/* <Redirect to="/" /> */}
      </Switch>
      {/* </Router> */}
    </div>
  );
};
