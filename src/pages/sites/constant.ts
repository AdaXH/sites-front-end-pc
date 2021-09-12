export const SITES_ROUTES = [
  {
    path: '/sites/technology',
    component: () => import('@/pages/technology'),
    title: '技术',
    mainTitle: 'Technology',
    shouMenu: true,
  },
  {
    path: '/sites/life',
    component: () => import('@/pages/life/index'),
    mainTitle: 'Life',
    shouMenu: true,
    title: '生活',
  },
  {
    path: '/sites/info',
    component: () => import('@/pages/info/index'),
    shouMenu: true,
    mainTitle: 'Info',
    title: '资讯',
  },
  {
    path: '/sites/others',
    component: () => import('@/pages/others/index'),
    shouMenu: true,
    mainTitle: 'Others',
    title: '其它',
  },
  {
    path: '/submit-site',
    component: () => import('@/pages/submitSite/index'),
    shouMenu: true,
  },
];
