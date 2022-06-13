import React from 'react';
import { QQ_GROUP_URL } from './constant';
import qqPng from './qq.png';

import styles from './styles.less';

export const JoinQQ: React.FC<{}> = () => {
  return (
    <a className={styles.qqPng} href={QQ_GROUP_URL} target="_blank">
      加入QQ群
      <img src={qqPng} />
    </a>
  );
};
