import React, { Fragment } from 'react';
import Shake from './shake';
import Wave from './canvas';
import Design from './design';
import { Header } from './header';

import styles from './styles.less';

interface Props {
  children: React.ReactNode | Element;
  history: any;
}

export default ({ children, history }: Props) => {
  const {
    location: { pathname },
  } = history;
  if (pathname === '/super-admin') return <Fragment>{children}</Fragment>;

  return (
    <div className={styles.body}>
      <Header history={history} />
      <div className={styles.bg}>
        <Wave />
      </div>
      <Shake>
        <div className={styles.childrenBox}>
          <div className={styles.animate}>{children}</div>
        </div>
      </Shake>
      <Design />
    </div>
  );
};
