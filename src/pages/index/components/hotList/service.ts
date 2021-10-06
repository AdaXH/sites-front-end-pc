import Api from '@/utils/request';
export function queryRandom() {
  return Api('api/queryRandom', 'GET', {});
}
