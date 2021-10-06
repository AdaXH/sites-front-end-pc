import Api from '@/utils/request';

export async function queryMyBasicInfo() {
  return Api('api/queryMyBasicInfo');
}

export async function updateMyBasicInfo(body) {
  return Api('api/updateMyBasicInfo', 'POST', body);
}
