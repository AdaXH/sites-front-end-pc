import React, { memo } from 'react';
import styles from './styles.less';

export default memo(() => (
  <div className={styles.footer}>
    Copyright ©2018.{' '}
    <a href="https://sites.link" target="_blank" rel="noreferrer">
      站点聚合平台
    </a>
  </div>
));
