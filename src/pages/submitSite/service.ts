import Api from '@/utils/request';

export async function submitSite(body: AnyCommonObj) {
  return Api('api/submitSite', 'POST', body);
}

export async function updateSite(body: AnyCommonObj) {
  return Api('api/updateSite', 'POST', body);
}

export async function quickSubmitApi(body: AnyCommonObj) {
  return Api('api/quickSubmit', 'POST', body);
}
