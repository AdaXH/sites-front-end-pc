import { User } from '@/models/user';
import Api from '@/utils/request';

export async function queryUsers(body) {
  return Api<User[]>('api/queryUsers', 'POST', body);
}

export async function deleteUser(body) {
  return Api('api/deleteUser', 'POST', body);
}

export async function setPermission(body) {
  return Api('api/setPermission', 'POST', body);
}
