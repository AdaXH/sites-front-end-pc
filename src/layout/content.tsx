import React, { memo } from 'react';

import styles from './contentStyles.less';

export default memo(
  ({ children, title }: { children?: React.ReactNode; title?: React.ReactNode | string }) => (
    <div className={styles.content}>
      {title && <div className={styles.title}>{title}</div>}
      <div className={styles.slide}>
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  ),
);
