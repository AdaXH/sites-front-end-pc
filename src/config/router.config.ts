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
    path: '/sites',
    component: () => import('@/pages/sites/index'),
    exact: false,
  },
  {
    path: '/site-userInfo',
    component: () => import('@/pages/siteUser/index'),
  },
  {
    path: '/user-center/',
    component: () => import('@/pages/userCenterNew/index'),
  },
  {
    path: '/super-admin/user-list',
    component: () => import('@/pages/admin/userList'),
  },
  {
    path: '/super-admin/web/page-src/create',
    component: () => import('@/pages/admin/web/createSrc'),
  },
  {
    path: '/super-admin/web/page-src/list',
    component: () => import('@/pages/admin/web/srcList'),
  },
  {
    path: '/super-admin/siteslist/:siteType',
    component: () => import('@/pages/admin/siteList'),
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
  {
    path: '/site-info',
    component: () => import('@/pages/siteInfo/index'),
  },
  {
    path: '/transport',
    component: () => import('@/pages/transport/index'),
  },
];
