import Api from '@/utils/request';

export function sendCodeToEmailForForget(data: object) {
  return Api('api/sendCodeToEmailForForget', 'POST', data);
}

export function resetPassword(data: object) {
  return Api('api/resetPassword', 'POST', data);
}
