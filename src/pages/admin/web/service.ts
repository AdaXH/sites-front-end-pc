import Api from '@/utils/request';

export async function createSrc(body: AnyCommonObj) {
  return Api('api/createSrc', 'POST', body);
}

export async function querySrc() {
  return Api('api/querySrc');
}

export async function deleteSrc(body: AnyCommonObj) {
  return Api('api/deleteSrc', 'POST', body);
}

export async function updateSrc(body: AnyCommonObj) {
  return Api('api/updateSrc', 'POST', body);
}
