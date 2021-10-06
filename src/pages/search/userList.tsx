import React from 'react';
import { User } from 'state-typings';
import styles from './styles.less';

export default ({ data }: { data: Array<User>; history?: any }) => (
  <div className={styles.listCon}>
    {data.map((item) => {
      return (
        <a
          className={styles.item}
          key={item._id}
          href={'/site-userInfo?userId=' + item._id}
          target="_blank" rel="noreferrer"
        >
          <div className={styles.left}>
            <div
              className={styles.img}
              style={{
                backgroundImage: `url(${item.avatar})`,
              }}
            />
          </div>
          <div className={styles.right}>
            <h1 className={styles.mainName}>{item.name}</h1>
            <p className={styles.siteDesc}>{item.myDesc}</p>
          </div>
        </a>
      );
    })}
  </div>
);
