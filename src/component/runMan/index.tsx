import React, { memo } from 'react';

import styles from './styles.less';

export default memo(() => {
  return (
    <div className={styles.runBg}>
      <div className={styles.man}>
        <div className={styles.head} />
        <div className={styles.body} />
        <div className={styles.feet1} />
        <div className={styles.feet2} />
      </div>
    </div>
  );
});
