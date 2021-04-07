import React, { memo } from 'react';
import { SHARE_LIST } from './util';
import styles from './styles.less';

export default memo(() => {
  return (
    <div className={styles.share}>
      {SHARE_LIST.map(({ onClick, url, icon, text }) => (
        <div
          className={styles.shareItem}
          key={icon}
          onClick={onClick ? onClick : () => window.open(url)}
        >
          <i className={`iconfont ${icon}`} />
          {text}
        </div>
      ))}
    </div>
  );
});
