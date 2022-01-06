import Api from '@/utils/request';

export function getData(url = 'getHotList') {
  return Api(`api/${url}`, 'GET', {});
}
