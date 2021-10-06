import Api from '@/utils/request';

export function sendCodeToEmail(data: object) {
  return Api('api/sendCodeToEmail', 'POST', data);
}

export function register(data: object) {
  return Api('api/register', 'POST', data);
}
