import React, { useState } from 'react';
import { connect } from 'dva';
import { RootState } from 'state-typings';
import { PageSlide } from '@/component/pageSlide';
import { LoginBox } from './components/loginBox';

import styles from './styles.less';

export default connect(({ user }: RootState) => ({
  user,
}))((props) => {
  const { user, dispatch, history } = props;
  const userInfo = user || {};
  const [page, setPage] = useState<{ total: number; current: number }>({ total: 3, current: 2 });
  const onChangePage = (no) => {
    setPage({
      ...page,
      current: no,
    });
  };
  const { current } = page;
  return (
    <React.Fragment>
      <div className={styles.pageBox}>
        <PageSlide {...page} onChange={onChangePage} />
      </div>
      <LoginBox {...props} onChangePage={onChangePage} current={current} />
    </React.Fragment>
  );
});
