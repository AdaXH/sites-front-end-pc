import Api from '@/utils/request';
import { stringify } from '@/utils/functions';

export async function querySiteUser<T>(param: AnyCommonObj) {
  return Api<T>(`api/querySiteUser?${stringify(param)}`);
}
