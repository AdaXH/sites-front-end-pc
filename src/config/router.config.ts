export default [
  // {
  //   path: '/',
  //   component: () => import('@/layout/index'),
  // },
  {
    path: '/',
    component: () => import('@/pages/index/index'),
  },
  {
    path: '/technology',
    component: () => import('@/pages/technology'),
  },
  {
    path: '/info',
    component: () => import('@/pages/info/index'),
  },
  {
    path: '/life',
    component: () => import('@/pages/life/index'),
  },
  {
    path: '/others',
    component: () => import('@/pages/others/index'),
  },
  {
    path: '/site-info',
    component: () => import('@/pages/siteInfo/index'),
  },
  {
    path: '/submit-site',
    component: () => import('@/pages/submitSite/index'),
  },
  {
    path: '/site-userInfo/*',
    component: () => import('@/pages/siteUser/index'),
  },
  {
    path: '/user-center/',
    component: () => import('@/pages/userCenter/index'),
  },
  {
    path: '/super-admin',
    component: () => import('@/pages/admin/index'),
  },
  {
    path: '/search',
    component: () => import('@/pages/search/index'),
  },
  {
    path: '/more/about',
    component: () => import('@/pages/about/index'),
  },
  {
    path: '/qq-login',
    component: () => import('@/pages/qqLogin/index'),
  },
];
