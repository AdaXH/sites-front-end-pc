import React, { useState, memo } from 'react';
import { Breadcrumb } from 'antd';
import { useDidMount } from '@/utils/hooks';
import { MENUS } from './constant';

import styles from './styles.less';

export const BreadcrumbWrap: React.FC<{ history?: History }> = memo(({ history }) => {
  const [title, setTitle] = useState<string>('');
  useDidMount(() => {
    history.listen((p) => {
      const { title: renderTitle } = MENUS.find((item) => item.path === p.pathname) || {};
      setTitle(renderTitle || '');
    });
  });
  return (
    <Breadcrumb className={styles.bread}>
      <Breadcrumb.Item>个人中心</Breadcrumb.Item>
      <Breadcrumb.Item>{title}</Breadcrumb.Item>
    </Breadcrumb>
  );
});
