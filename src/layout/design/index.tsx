import React, { memo } from 'react';
import styles from './styles.less';

export default memo(() => {
  return (
    <footer className={styles.footer}>
      Copyright (c) Sites Group All Rights Reserved.{' '}
      <div>
        <a
          target="blank"
          data-line
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602011734"
        >
          {/* NO : 33010602011734 */}
          浙公网安备33010602011734号
        </a>
        <a data-line href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
          滇ICP备2020009525号-3
        </a>
      </div>
      {/* . */}
      {/* <a data-line href="/global-feed.xml" target="_blank">
        <i className="iconrss1 iconfont" />
        rss
      </a> */}
    </footer>
  );
});
