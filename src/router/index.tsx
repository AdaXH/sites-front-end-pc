import React from 'react';
import { Switch, Router, Redirect } from 'dva/router';
import Layout from '@/layout';
import routes from '../config/router.config';
import { mapRouteMethod } from './util';

export default ({ history }: { history?: any }) => {
  return (
    <Layout history={history}>
      <Router history={history}>
        <Switch>
          {mapRouteMethod(routes)}
          <Redirect to="/" />
        </Switch>
      </Router>
    </Layout>
  );
};
