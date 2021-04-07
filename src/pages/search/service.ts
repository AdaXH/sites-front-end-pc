import Api from '@/utils/request';
import { stringify } from '@/utils/functions';

export function searchApi(param: AnyCommonObj) {
  return Api(`api/searchApi?${stringify(param)}`);
}
