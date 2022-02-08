import Api from '@/utils/request';

export function getData(url = 'getHotList') {
  return Api<SiteModel[]>(`api/${url}`, 'GET', {});
}
