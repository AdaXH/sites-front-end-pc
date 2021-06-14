// @ts-nocheck

import Api from '@/utils/request';
import Cookies from 'js-cookie';

const NAMESPACE = 'user';

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
}

export default {
  namespace: NAMESPACE,
  state: {
    name: '',
    isLogin: false,
    avatar: 'https://bucker-for-sae.oss-cn-hangzhou.aliyuncs.com/sitesImages/82486042.jpg',
  },
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
      const result = yield call(Api, 'api/login', 'POST', payload);
      if (result.success) {
        yield put({
          type: 'setData',
          payload: result.data,
        });
      } else {
        return result.errorMsg;
      }
      // return result;
    },
    *load(_, { select, put }) {
      const user = yield select((state) => state.user);
      if (!user.isLogin) {
        yield put({
          type: 'getUserInfo',
        });
      }
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
