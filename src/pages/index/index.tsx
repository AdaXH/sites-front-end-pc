import React from 'react';
import { connect } from 'dva';
import { RootState } from 'state-typings';
import { Welcome } from './components/welcome';
import HotList from './components/hotList';

export default connect(({ user }: RootState) => ({
  user,
}))((props) => {
  const { user, dispatch, history } = props;
  const userInfo = user || {};
  return (
    <React.Fragment>
      <Welcome history={history} dispatch={dispatch} user={userInfo} />
      <HotList />
    </React.Fragment>
  );
});
