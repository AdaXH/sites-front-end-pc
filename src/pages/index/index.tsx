import React from 'react';
import { connect } from 'dva';
import { RootState } from 'state-typings';

export default connect(({ user }: RootState) => ({
  user,
}))((props) => {
  const { user, dispatch, history } = props;
  const userInfo = user || {};
  return <React.Fragment></React.Fragment>;
});
