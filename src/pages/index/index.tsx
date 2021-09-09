import React from 'react';
import { connect } from 'dva';
import { RootState } from 'state-typings';
import { PageSlide } from '@/component/pageSlide';
import styles from './styles.less';

export default connect(({ user }: RootState) => ({
  user,
}))((props) => {
  const { user, dispatch, history } = props;
  const userInfo = user || {};
  return (
    <React.Fragment>
      <div className={styles.pageBox}>
        <PageSlide total={3} current={1} />
      </div>
    </React.Fragment>
  );
});
