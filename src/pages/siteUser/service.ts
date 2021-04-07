import Api from '@/utils/request';
import { stringify } from '@/utils/functions';

export async function querySiteUser(param: AnyCommonObj) {
  return Api(`api/querySiteUser?${stringify(param)}`);
}
