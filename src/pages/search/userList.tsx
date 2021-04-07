import React from 'react';
import { User } from 'state-typings';
import styles from './styles.less';

export default ({ data }: { data: Array<User>; history?: any }) => (
  <div className={styles.listCon}>
    <div className={styles.list}>
      {data.map((item) => {
        return (
          <div
            className={styles.item}
            key={item._id}
            onClick={() => window.open('/site-userInfo/' + item._id)}
          >
            <div className={styles.top}>
              <div className={styles.imgBox}>
                <div
                  className={styles.img}
                  style={{
                    background: `url(${item.avatar}) no-repeat`,
                  }}
                  // alt={item.name}
                />
              </div>
              <div className={styles.siteName}>
                <div className={styles.mainName}>{item.name}</div>
                <div className={styles.siteDesc}>{item.myDesc}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
