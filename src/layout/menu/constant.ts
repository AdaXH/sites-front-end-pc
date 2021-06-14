export interface Route {
  path?: string;
  title?: string;
  icon?: string;
  desc?: string;
  bgColor?: string;
  iconfont?: string;
  childRoutes?: [Route];
  hidden?: boolean;
  permission?: boolean;
  needLogin?: boolean;
  type?: string;
}

export const routes: Array<Route> = [
  {
    path: '/',
    title: '首页',
    icon: 'icon-gerenziliao',
    desc: '解锁收藏、留言、点赞等功能',
    bgColor: '#b5f1e8',
    iconfont: 'iconshouye1',
  },
  {
    path: '/technology',
    title: '技术类',
    icon: 'icon-zuzhiheguanlitubiao-',
    desc: '技术类站点',
    bgColor: '#f5c56c',
  },
  {
    path: '/life',
    title: '生活类',
    icon: 'icon-coffee-01',
    desc: '生活类站点',
    bgColor: '#c9d1f9',
  },
  {
    path: '/info',
    title: '资讯类',
    icon: 'icon-xunxix',
    desc: '资讯类站点',
    bgColor: '#fdaeae',
  },
  {
    path: '/others',
    title: '其他站点',
    icon: 'icon-qita',
    desc: '其他站点',
    bgColor: '#e6cd6a',
  },
  {
    path: '/submit-site',
    title: '站点提交',
    icon: 'icon-jurassic_add-project',
    desc: '需先登录，提交后等待审核',
    bgColor: '#eadfc8',
  },

  {
    path: '/search',
    title: '搜索',
    icon: 'icon-search',
    bgColor: '#eadfc8',
    iconfont: 'icon-search1',
  },
  {
    path: '/user-center',
    title: '个人中心',
    iconfont: 'iconuser1',
    needLogin: true,
  },
  {
    path: '/more',
    type: 'more',
    title: '更多',
    iconfont: 'iconMore',
    childRoutes: [
      {
        path: '/more/about',
        title: '关于本站',
      },
    ],
  },
  // {
  //   path: '/share-to-qq',
  //   title: 'qq登录',
  //   icon: 'icon-qq',
  // },
  // {
  //   path: '/share-to-weibo',
  //   title: '分享到微博',
  //   icon: 'icon-weibo',
  // },
  // {
  //   path: '/icon-weixin',
  //   title: '微信二维码',
  //   icon: 'icon-weixin',
  // },
];
