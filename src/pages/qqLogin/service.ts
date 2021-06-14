import request from '@/utils/request';
import { stringify } from '@/utils/functions';

export async function getOpenid(data) {
  return request(`api/qq_login?${stringify({ ...data, unionid: 1 })}&unionid=1&fmt=json`);
}
