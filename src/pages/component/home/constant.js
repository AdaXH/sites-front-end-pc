import router from 'umi/router';

export const NAVS = [
  {
    link: '/old',
    icon: 'icon-homepx',
    // callback: () => router.push('/'),
  },
  {
    icon: 'icon-QQ',
    color: '#12b7f5',
    callback: () => {
      window.open('http://wpa.qq.com/msgrd?v=3&uin=3532371088&site=qq&menu=yes');
    },
  },
  {
    icon: 'icon-github',
    color: 'balck',
    callback: () => {
      window.open('https://github.com/adaxh');
    },
  },
  {
    icon: 'icon-shequdongtai',
    callback: () => router.push('/moments'),
    bgColor: 'rgb(220 179 85)',
    title: '动态',
    iconfont: 'icon-dongtai',
  },
  {
    icon: 'icon-message',
    callback: () => router.push('/article'),
    bgColor: '#00bbee',
    title: '文章',
    iconfont: 'icon-liuyanban1',
  },
  {
    icon: 'icon-message',
    callback: () => router.push('/message'),
    bgColor: 'rgb(174 109 245)',
    title: '留言板',
    iconfont: 'icon-liuyanban1',
  },
  {
    link: '/friends',
    icon: 'icon-Friends-',
    color: '#f9a01c',
    callback: () => router.push('/friends'),
    bgColor: 'rgb(152, 185, 220)',
    title: '友情链接',
    iconfont: 'icon-lianjie',
  },
  {
    icon: 'icon-weibo',
    color: '#e93748',
    callback: () => {
      router.push({
        pathname: '/weibo',
        query: {
          src: encodeURIComponent('https://weibo.com/u/2845470360'),
        },
      });
    },
    bgColor: 'rgb(234 102 102)',
    title: '微博',
    iconfont: 'icon-weibo2',
  },
];

export const LOGO =
  'https://tvax1.sinaimg.cn/crop.0.0.640.640.180/a99a6e98ly8ggdx2amqlaj20hs0hswsl.jpg';

export const TITLE = 'Ada - Home';

export const STATIC_IMG = [
  '#icon-taiyang',
  '#icon-mengbanhangkonghangtian-xingxingstar',
  '#icon-weather-color_moon-stars',
];
