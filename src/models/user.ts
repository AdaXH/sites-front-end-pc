// @ts-nocheck

import { getSrcConfig } from '@/utils/functions';
import Api from '@/utils/request';
import Cookies from 'js-cookie';

const NAMESPACE = 'user';

/**
 * 素材model
 */
export interface SrcConfig {
  pathname?: string;
  mainTitle?: string;
  desc?: string;
  image?: string;
  smallImg?: string;
}

export interface User {
  name: string;
  isLogin?: boolean;
  avatar: string;
  admin?: boolean;
  userId?: string;
  myFavorite?: Array<SiteModel>;
  _id?: string;
  myDesc?: string;
  gender?: string;
  mySites?: Array<SiteModel>;
  superAdmin?: boolean;
  globalCfg?: SrcConfig[];
  pageConfig?: SrcConfig;
}

export default {
  namespace: NAMESPACE,
  state: {
    name: '',
    isLogin: false,
    avatar: 'https://bucker-for-sae.oss-cn-hangzhou.aliyuncs.com/sitesImages/82486042.jpg',
  } as User,
  effects: {
    *register({ payload }, { call, put }) {
      const result = yield call(Api, 'api/register', 'POST', payload);
      if (result.success) {
        yield put({
          type: 'setData',
          payload: result.data,
        });
      } else {
        return result.errorMsg;
      }
    },
    *getUserInfo(_, { call, put }) {
      const result = yield call(Api, 'api/getUserInfo', 'POST');
      yield put({
        type: 'setData',
        payload: result.data,
      });
    },
    *login({ payload }, { call, put }) {
      console.log('login');
      const result = yield call(Api, 'api/login', 'POST', payload);
      if (result.success) {
        yield put({
          type: 'setData',
          payload: result.data,
        });
      }
    },
    *load(_, { select, put, call }) {
      const user: User = yield select((state) => state.user);
      if (!user.isLogin) {
        yield put({
          type: 'getUserInfo',
        });
      }
      let confgis = user.globalCfg;
      if (!user.globalCfg) {
        const { success, data } = yield call(Api, 'api/querySrc', 'get');
        if (success && data?.length) {
          yield put({
            type: 'setData',
            payload: { globalCfg: data },
          });
          confgis = data;
        }
      }
      yield put({
        type: 'setData',
        payload: {
          pageConfig: getSrcConfig(confgis),
        },
      });
    },
  },
  reducers: {
    setData(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    signOut() {
      removeInfo();
      return {
        isLogin: false,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(() => {
        dispatch({
          type: `${NAMESPACE}/load`,
        });
      });
    },
  },
};

export function removeInfo() {
  ['localhost', '.sites.applinzi.com', 'www.sites.applinzi.com', 'sites.link'].forEach((domain) => {
    Cookies.remove('siteToken', { domain });
  });
}
