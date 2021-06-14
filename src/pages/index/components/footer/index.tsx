import React, { memo } from 'react';
import styles from './styles.less';

const curraneYear = new Date().getFullYear();

export default memo(() => {
  return (
    <div className={styles.footerInfo}>
      <div className={styles.ba}>
        <a
          target="blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602011734"
        >
          <img src="/ba.png" alt="" />
          <p>浙公网安备 33010602011734号</p>
        </a>
      </div>
      made with <span>❤</span> by{' '}
      <a href="https://www.baidu.com/s?wd=站点聚合平台" target="_blank" rel="noreferrer">
        站点聚合平台
      </a>{' '}
      &copy; {curraneYear}
    </div>
  );
});
