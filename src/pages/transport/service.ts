import Api from '@/utils/request';
export function queryRandom(data) {
  return Api('api/queryRandom', 'GET', data);
}
