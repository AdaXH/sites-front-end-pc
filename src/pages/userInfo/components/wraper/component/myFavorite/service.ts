import Api from '@/utils/request';

export async function queryMyFavorite() {
  return Api<SiteModel[]>('api/queryMyFavorite');
}

export async function togglCollectSite(body) {
  return Api('api/togglCollectSite', 'POST', body);
}
