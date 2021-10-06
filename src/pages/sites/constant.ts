export const SITES_ROUTES = [
  {
    path: '/sites/technology',
    component: () => import('@/pages/technology'),
    title: '技术',
    mainTitle: 'Technology',
    shouMenu: true,
    desc:
      '技术细节型：为了解决某个技术问题而写，此类文章要具备一定深度。 实践总结性：在做了一些工作后，针对工作中出现的实操问题，进行总结，此类文章要针对实践中痛点。 杂谈型：作为个人的总结文章，此类文章主要针对自我提升以及未来规划提出。',
  },
  {
    path: '/sites/life',
    component: () => import('@/pages/life/index'),
    mainTitle: 'Life',
    shouMenu: true,
    title: '生活',
    desc: '生活类站点，记录生活，分享美好的瞬间。',
  },
  {
    path: '/sites/info',
    component: () => import('@/pages/info/index'),
    shouMenu: true,
    mainTitle: 'Info',
    title: '资讯',
    desc: '资讯类站点，你想知道的，我这都有。',
  },
  {
    path: '/sites/others',
    component: () => import('@/pages/others/index'),
    shouMenu: true,
    mainTitle: 'Others',
    title: '其它',
    desc: '其它类站点，我的站点很神秘。',
  },
  {
    path: '/sites/submit-site',
    component: () => import('@/pages/submitSite/index'),
    shouMenu: true,
    mainTitle: 'Join us',
    desc: '站点提交，加入我们。',
  },
];

export const HIDDEN_HREF_URLS = ['/sites/submit-site'];
