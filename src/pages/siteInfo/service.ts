import Api from '@/utils/request';

export async function toggltUpvoteSite(body: {}) {
  return Api('api/toggltUpvoteSite', 'POST', body);
}
//
export async function togglCollectSite(body: {}) {
  return Api('api/togglCollectSite', 'POST', body);
}

export async function leaveMsg(body: {}) {
  return Api('api/leaveMsg', 'POST', body);
}

export async function deleteMsg(body: {}) {
  return Api('api/deleteMsg', 'POST', body);
}

export async function forceHot(body: {}) {
  return Api('api/forceHot', 'POST', body);
}
