export const MENUS = [
  {
    path: '/user/basic-info',
    title: '基本信息',
    icon: 'iconfont iconmy',
  },
  {
    path: '/user/my-site',
    title: '我的站点',
    icon: 'iconfont iconwangzhan',
  },
  {
    path: '/user/my-favorite',
    title: '我的收藏',
    icon: 'iconfont iconshoucangshixin',
  },
  {
    path: '/user/setting',
    title: '我的设置',
    icon: 'iconfont iconshezhi',
  },
  {
    path: '/',
    title: '返回主站',
    icon: 'iconfont iconshouye1',
    onClick: () => (window.location.href = 'https://sites.link'),
  },
  {
    path: 'logout',
    title: '注销',
    icon: 'iconfont iconzhuxiao',
  },
];
