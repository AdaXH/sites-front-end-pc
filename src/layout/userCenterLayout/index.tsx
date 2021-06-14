import React from 'react';
import { Layout } from 'antd';
import { MenuSide } from './menu';
import { BreadcrumbWrap } from './breadcrumb';
import { Header } from './header';
import Footer from './footer';
import Bg from './bg';
import styles from './styles.less';

const { Content } = Layout;

const UserCenter: React.FC<{ children?: React.ReactNode; history?: History }> = ({
  children,
  history,
}) => {
  const {
    location: { pathname },
  } = history;
  return (
    <React.Fragment>
      <Bg />
      <div className={styles.layoutWrap}>
        <Layout className={styles.outLayout}>
          <MenuSide history={history} defaultPath={pathname} />
          <Layout>
            <Header />
            <Content className={styles.content}>
              <BreadcrumbWrap history={history} />
              <div className={styles.children}>{children}</div>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </div>
    </React.Fragment>
  );
};

export default UserCenter;
