import request from '@/util/request';

export async function getConfig() {
  return request('/api/getConfig');
}
