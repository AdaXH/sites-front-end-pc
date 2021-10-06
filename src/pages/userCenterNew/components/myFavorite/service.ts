import Api from '@/utils/request';

export async function queryMyFavorite() {
  return Api('api/queryMyFavorite');
}

export async function togglCollectSite(body) {
  return Api('api/togglCollectSite', 'POST', body);
}
