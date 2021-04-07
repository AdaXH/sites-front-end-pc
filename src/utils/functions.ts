import moment from 'moment';
import { SITE_BASIC_INFO } from './constant';
// import { createElement } from 'react';
moment.lang('zh-cn');

interface Ref {
  current?: {
    getValue?: Function;
  };
}

export function delay(time: number) {
  return new Promise((ok) => {
    setTimeout(() => {
      ok(undefined);
    }, time * 1000);
  });
}

export const getParam = (search: string, key: string) => {
  try {
    if (!search || !key) return null;
    const url = search.slice(1);
    const chunks = url.split('&');
    for (const item of chunks) {
      const [k, value] = item.split('=');
      if (k === key) return value || undefined;
    }
    return '';
  } catch (error) {
    console.log('error', error);
    return '';
  }
};

export function setCache(key: string, data: AnyCommonObj) {
  try {
    window.localStorage.setItem(key, data instanceof Object ? JSON.stringify(data) : data);
  } catch (error) {
    //
  }
}

export function getCache(key: string) {
  const str = window.localStorage.getItem(key);
  if (str) {
    try {
      return JSON.parse(str);
    } catch (error) {
      return str;
    }
  }
  return null;
}

export function hasChange(data1: AnyCommonObj, data2: AnyCommonObj) {
  return JSON.stringify(data1) !== JSON.stringify(data2);
}

export function relativeTime(time: number) {
  if (isNaN(time)) {
    return moment(time).startOf('minute').fromNow();
  }
  return moment(new Date(Number(time)))
    .startOf('minute')
    .fromNow();
}

// export function formatTime(time) {
//   return moment(new Date(Number(time))).format('YYYY-MM-DD HH:mm:ss');
// }

export function resetObj(obj: any) {
  Object.keys(obj).forEach((key) => (obj[key] = ''));
  return obj;
}

// export function qqSign() {
//   try {
//     window.QC.Login.showPopup({
//       appId: 'appid',
//       redirectURI: '',
//     });
//   } catch (error) {}
// }

export function getValueByRef(ref: Ref) {
  if (ref.current) {
    return ref.current.getValue();
  }
  return null;
}

export function stringify(obj: any) {
  if (!obj) return '';
  let result = '';
  Object.keys(obj).forEach((key, index) => {
    const prefix = index === 0 ? '' : '&';
    result += `${prefix}${key}=${obj[key]}`;
  });
  return result;
}

function setTime(str: string) {
  if (`${str}`.length === 1) return `0${str}`;
  return str;
}

export function formatTime(time: number | Date | string): string {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + '';
  const day = date.getDate() + '';
  const hour = date.getHours() + '';
  const minu = date.getMinutes() + '';
  return `${year}-${setTime(month + 1)}-${setTime(day)} ${setTime(hour)}:${setTime(minu)}`;
}

// export function parseHtml(str) {
//   const ele = document.createElement('div');
//   ele.innerHTML = str;
//   // return ele.innerHTML;
//   return createElement('div', {}, str);
// }
export function getURL2Base64(url: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
      if (this.status === 200) {
        const blob = this.response;
        const fileReader = new FileReader();
        fileReader.onloadend = function (e) {
          const result = e?.target?.result;
          resolve(result);
        };
        fileReader.readAsDataURL(blob);
      }
    };
    xhr.onerror = function () {
      reject();
    };
    xhr.send();
  });
}

const { TITLE, DESC } = SITE_BASIC_INFO;

export function updTitleDesc(title: string, desc: string) {
  document.title = `${title} ${TITLE}`;
  const {
    location: { pathname },
  } = window;
  const newDesc = pathname === '/' ? DESC : desc;
  const meta = document.querySelector('meta[name="Description"]');
  // meta?.content = newDesc;
  meta?.setAttribute('content', newDesc);
  // push2Baidu();
}

export function push2Baidu() {
  const bp = document.createElement('script');
  const curProtocol = window.location.protocol.split(':')[0];
  if (curProtocol === 'https') {
    bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
  } else {
    bp.src = 'http://push.zhanzhang.baidu.com/push.js';
  }
  const s = document.getElementsByTagName('script')[0];
  s?.parentNode?.insertBefore(bp, s);
}
