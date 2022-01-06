import React from 'react';
import Basic from './components/basic';
import MySite from './components/mySites';
import Setting from './components/setting';
import MyFavorite from './components/myFavorite';

export const USER_CENTER_ROUTES = [
  {
    path: '/user-center/basic-info',
    Component: (arg) => <Basic {...arg} />,
    title: '身份证',
  },
  {
    path: '/user-center/setting',
    Component: (arg) => <Setting {...arg} />,
    title: '设置',
  },
  {
    path: '/user-center/my-site',
    Component: (arg) => <MySite {...arg} />,
    title: '我的站点',
  },
  {
    path: '/user-center/my-favorite',
    Component: (arg) => <MyFavorite {...arg} />,
    title: '我的收藏',
  },
];
