/* eslint-disable */
import Cookies from 'js-cookie';
import Loading from '@/component/loading';
import Notification from '@/component/Notification';
import { NO_LOADING_API, NOERROR_API } from './constant';
import LoginModal from '@/component/loginModal';
import { stringify } from './functions';

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

function parseError(error) {
  return error instanceof Object ? JSON.stringify(error) : error.toString() || '出错啦：' + error;
}

interface Response<T> {
  success: boolean;
  data: T;
  totalCount?: number;
  redirect?: boolean;
}

const isBuild = /5050+|link+|applinzi/.test(window.location.href);
export default function Api<T extends Record<string, any>>(
  url,
  method: string = 'GET',
  data?: AnyCommonObj,
  isSvg = false,
): Promise<Response<T>> {
  const _url_ = (isBuild ? url.replace(/api/, '') : url).replace(/\/more/, '');
  const { origin } = window.location;
  const needLoading = NO_LOADING_API.includes(
    /api/.test(_url_) ? _url_.replace(/api/g, '') : _url_,
  );
  // 不需要提示错误的接口
  const noError = NOERROR_API.includes(/api/.test(_url_) ? _url_.replace(/api/g, '') : _url_);
  if (!isSvg) {
    const options: RequestInit & Record<string, any> = {
      method,
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        authorization: Cookies.get('siteToken') || 'null',
        withCredentials: 'true',
      },
    };
    method === 'POST' && (options.body = JSON.stringify(data));
    let senceKey = origin[origin.length - 1] === '/' ? '' : '/';
    if (isBuild) {
      senceKey = '';
    }
    let queryString = '';
    if (method === 'GET' && data) {
      queryString = `?${stringify(data)}`;
    }
    return new Promise((resolve, reject) => {
      !needLoading && Loading.show();
      fetch(`${origin}${senceKey}${_url_}${queryString}`, options)
        .then((response) => {
          if (response.status >= 200 && response.status < 300) return response.json();
          return response.status;
        })
        .then((result) => {
          if ((typeof result === 'boolean' && result) || result.success) {
            resolve(result);
          } else {
            reject(result);
            if (result?.openLogin) {
              LoginModal.show({}, true);
            }
            if (noError) {
              return;
            }
            Notification.fail({
              msg: parseError((result && result.errorMsg) || result),
            });
          }
        })
        .catch((err) => reject(err))
        .finally(() => {
          Loading.hide();
        });
    });
  }
  // else {
  //   const options = {
  //     method,
  //     headers: {
  //       'content-type': 'image/svg+xml',
  //       accept: 'image/svg+xml',
  //       withCredentials: true,
  //     },
  //   };
  //   const { origin } = window.location;
  //   return new Promise((resolve) => {
  //     fetch(`${origin}${_url_}`, options)
  //       .then((response) => {
  //         if (response.status >= 200 && response.status < 300) return response.text();
  //         return response.status;
  //       })
  //       .then((response) => {
  //         resolve(response);
  //       });
  //   });
  // }
}
