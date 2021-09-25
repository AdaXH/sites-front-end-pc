// @ts-nocheck
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
  return Api(`api/querySite?${stringify(param)}`);
}
import mock from './mock';
export function querySites(body) {
  // return Api('api/querySites', 'POST', body);
  return mock;
}

export function querySitesv2(body) {
  return Api('api/querySitesv2', 'POST', body);
}
