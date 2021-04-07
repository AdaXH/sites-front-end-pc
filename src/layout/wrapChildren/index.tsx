import React, { Fragment } from 'react';
import styles from './styles.less';

export default ({ children }: { children?: React.ReactNode }) => (
  <Fragment>
    <div className={styles.blackWrap}></div>
    {children}
  </Fragment>
);
