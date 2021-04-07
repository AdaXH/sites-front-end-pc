import Api from '@/utils/request';

export async function getConfig() {
  return Api('api/getConfig', 'GET', {});
}
