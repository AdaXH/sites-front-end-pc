import React from 'react';
import { Layout } from 'antd';
import Header from './header';
import Aside from './aside';

import styles from './styles.less';

export const Admin: React.FC<any> = ({ children, history }) => {
  return (
    <Layout className={styles.layout}>
      <Header />
      <Layout className={styles.con}>
        <Aside history={history} />
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};
