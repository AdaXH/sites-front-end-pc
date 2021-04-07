import React from 'react';
import { connect } from 'dva';
import { RootState, User } from 'state-typings';
// import { useDidMount, useUnmount } from '@/utils/hooks';
import UserInfo from './components/userInfo';
import Wrap from './components/wraper';
import styles from './styles.less';

interface WrapProps {
  user: User;
  dispatch?: any;
  history?: any;
}

export default connect(({ user }: RootState) => ({
  user,
}))((props: WrapProps) => {
  const { user, dispatch, history } = props;
  const userInfo = user || {};
  const reLoad = () => {
    dispatch({ type: 'user/getUserInfo' });
  };
  return (
    <div className={styles.indexContainer}>
      <UserInfo user={userInfo} dispatch={dispatch} history={history} />
      <Wrap reLoad={reLoad} user={userInfo} history={history} />
    </div>
  );
});
