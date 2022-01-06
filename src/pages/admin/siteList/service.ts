import Api from '@/utils/request';

export async function siteVerrifyApi(body) {
  return Api('api/siteVerify', 'POST', body);
}

export async function deleteSiteAdmin(body) {
  return Api('api/deleteSiteAdmin', 'POST', body);
}

export async function updateSiteAdmin(body) {
  return Api('api/updateSiteAdmin', 'POST', body);
}
