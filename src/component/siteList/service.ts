import Api from '@/utils/request';

export async function forceHot(body: AnyCommonObj) {
  return Api('api/forceHot', 'POST', body);
}
