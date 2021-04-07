import Api from '@/utils/request';

export function getHotList() {
  return Api('api/getHotList', 'GET', {});
}
