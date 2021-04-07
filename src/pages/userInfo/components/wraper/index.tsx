import React from 'react';
import { Route } from 'dva/router';
// import Content from '@/layout/content';
import Basic from './component/basic';
import MySite from './component/mySites';
import Setting from './component/setting';
import styles from './styles.less';
import MyFavorite from './component/myFavorite';

export default (props) => {
  const {
    history: {
      location: { pathname },
    },
  } = props;
  return (
    <div className={styles.slide} key={pathname}>
      <Route
        path="/user/basic-info"
        component={() => (
          // <Content title="基础信息">
          <Basic {...props} />
          // </Content>
        )}
      />
      <Route
        path="/user/my-site"
        component={() => (
          // <Content title="我的站点">
          <MySite {...props} />
          // </Content>
        )}
      />
      <Route
        path="/user/setting"
        component={() => (
          // <Content title="我的设置">
          <Setting {...props} />
          // </Content>
        )}
      />
      <Route
        path="/user/my-favorite"
        component={() => (
          // <Content title="我的收藏">
          <MyFavorite {...props} />
          // </Content>
        )}
      />
    </div>
  );
};
