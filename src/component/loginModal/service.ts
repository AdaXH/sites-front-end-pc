import Api from '@/utils/request';

export async function login(body) {
  return Api('api/login', 'POST', body);
}

export async function registry(body) {
  return Api('api/register', 'POST', body);
}
