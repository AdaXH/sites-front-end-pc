import React, { memo } from 'react';
import { User } from 'state-typings';
import { Layout } from 'antd';
import { connect } from 'dva';
import styles from './styles.less';

const { Header: AntdHeader } = Layout;

export const Header: React.FC<{ user?: User }> = memo(
  connect(({ user }) => ({ user }))(({ user }) => {
    const { avatar, name } = user;
    return (
      <AntdHeader className={styles.header}>
        <div className={styles.box}>
          <div className={styles.name}>Hi, {name}</div>
          <div className={styles.avatar} style={{ backgroundImage: `url(${avatar})` }} />
        </div>
      </AntdHeader>
    );
  }),
);
