import React from 'react';
import { Layout } from 'antd';

import styles from './styles.less';

const { Header } = Layout;
export default () => {
  return (
    <Header className="header" style={{ position: 'fixed', zIndex: 10, width: '100%' }}>
      <h1 className={styles.logo}>
        <a href="/">
          <i className="iconjishu iconfont" />
          Super-admin
        </a>
      </h1>
    </Header>
  );
};
