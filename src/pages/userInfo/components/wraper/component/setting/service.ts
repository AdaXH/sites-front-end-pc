import Api from '@/utils/request';

export async function updateMySetting(body) {
  return Api('api/updateMySetting', 'POST', body);
}
