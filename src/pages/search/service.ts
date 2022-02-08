import Api from '@/utils/request';
import { stringify } from '@/utils/functions';
import { User } from '@/models/user';

export function searchApi(param: AnyCommonObj) {
  return Api<{ users: User[]; sites: SiteModel[] }>(`api/searchApi?${stringify(param)}`);
}
