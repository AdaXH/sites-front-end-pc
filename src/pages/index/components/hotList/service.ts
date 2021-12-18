import Api from '@/utils/request';

export function getData(url: string = 'getHotList') {
  return Api(`api/${url}`, 'GET', {});
}
