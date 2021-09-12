import React from 'react';
import { changeFn } from '../..';

import styles from './styles.less';

export const BasicInfo: React.FC<{ onChangePage: changeFn }> = ({ onChangePage }) => (
  <p className={styles.desc}>
    “因为热爱， 所以相聚”，站点聚合平台，让更多的人记住您的站点。
    <span className={styles.joinUs} onClick={() => onChangePage(2)}>
      加入我们
    </span>
    ！
  </p>
);
