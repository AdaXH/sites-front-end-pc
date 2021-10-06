// 不需要loading的接口
export const NO_LOADING_API = [
  '/getUserInfo',
  '/getHotList',
  '/createSrc',
  '/querySrc',
  '/queryRandom',
  '/updateSrc',
  '/parseRss',
];

export const NOERROR_API = ['/getUserInfo', '/login', '/register', '/parseRss'];

export const EMOJI_CACHE_KEY = '__emoji__list';

export const SITE_TYPE = [
  {
    code: 'technology',
    name: '技术类',
  },
  {
    code: 'life',
    name: '生活类',
  },
  {
    code: 'info',
    name: '资讯类',
  },
  {
    code: 'others',
    name: '其它站点',
  },
];

export const MAP_SITE_TYPE = {
  technology: '技术类',
  life: '生活类',
  info: '资讯类',
  others: '其它站点',
};

// export const FULL_SCREEN_PATH = [];

export const SITE_BASIC_INFO = {
  DESC: '站点聚合平台，因为热爱，所以相聚，让更多的人知道您的网站。',
  TITLE: '站点聚合平台',
};
