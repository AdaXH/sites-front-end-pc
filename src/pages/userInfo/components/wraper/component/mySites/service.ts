import Api from '@/utils/request';

export async function queryMySites() {
  return Api('api/queryMySites');
}

export async function deleteSite(body) {
  return Api('api/deleteSite', 'POST', body);
}
