import Api from './request';
import { stringify } from './functions';

export async function getDynamic() {
  return Api('api/getDynamic');
}

export async function getArticles() {
  return Api('api/getArticles');
}

export async function getAllMessages() {
  return Api('api/getAllMessages');
}

export async function queryFriends() {
  return Api('api/queryFriends');
}

export function querySite(param) {
  return Api<any>(`api/querySite?${stringify(param)}`);
}

export function querySites(body) {
  return Api<SiteModel[]>('api/querySites', 'POST', body);
}

export function querySitesv2(body) {
  return Api<SiteModel[]>('api/querySitesv2', 'POST', body);
}
