import Api from '@/utils/request';
import { stringify } from '@/utils/functions';
export async function parseRss(param: {}) {
  return Api(`api/parseRss?${stringify(param)}`);
}
