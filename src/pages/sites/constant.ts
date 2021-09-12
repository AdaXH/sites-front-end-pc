export const SITES_ROUTES = [
  {
    path: '/sites/technology',
    component: () => import('@/pages/technology'),
    title: '技术',
    shouMenu: true,
  },
  {
    path: '/sites/life',
    component: () => import('@/pages/life/index'),
    shouMenu: true,
    title: '生活',
  },
  {
    path: '/sites/info',
    component: () => import('@/pages/info/index'),
    shouMenu: true,
    title: '资讯',
  },
  {
    path: '/sites/others',
    component: () => import('@/pages/others/index'),
    shouMenu: true,
    title: '其它',
  },
  {
    path: '/submit-site',
    component: () => import('@/pages/submitSite/index'),
    shouMenu: true,
  },
];
