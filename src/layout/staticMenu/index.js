import React from 'react';
import { NAVS } from './constant';

import styles from './styles.less';

export default ({ history }) => {
  const {
    location: { pathname },
    push,
  } = history;

  return (
    <div className={styles.innerMenu}>
      <div className={styles.menuBox}>
        <div className={styles.menuTitle}>MENU</div>
        <div className={styles.menuWrap}>
          {NAVS.map(({ path, prefix, title, desc, icon }) => (
            <div
              onClick={() => push(path)}
              key={path}
              data-current={pathname === path}
              className={styles.item}
            >
              <div className={styles.iconfont}>
                <i className={`iconfont ${icon}`} />
              </div>
              <div className={styles.firstWord}>{prefix}</div>
              <div className={styles.menuItem} data-current={pathname === path}>
                <div className={styles.navTitle}>{title}</div>
                <div className={styles.desc}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
