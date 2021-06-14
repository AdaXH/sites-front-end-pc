import Api from '@/utils/request';

export function bindAccount(data: AnyCommonObj) {
  return Api('api/bindAccount', 'POST', data);
}
