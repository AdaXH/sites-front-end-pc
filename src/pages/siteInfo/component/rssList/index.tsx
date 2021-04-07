import React, { useState } from 'react';
import { useDidMount } from '@/utils/hooks';
import { parseRss } from './service';

import styles from './styles.less';

export default ({ data }: { data: string }) => {
  const [list, setList] = useState([]);
  useDidMount(async () => {
    if (data) {
      const { success, data: resData } = await parseRss({ rss: data });
      if (success && resData) {
        setList(resData);
      }
    }
  });
  return (
    <div className={styles.extractBox}>
      <div className={styles.title}>最近10篇文章（基于RSS）</div>
      {data && (
        <div className={styles.list}>
          {list.length !== 0 &&
            list.map((item, index) => (
              <a
                rel="noreferrer"
                style={{ animationDuration: `${index * 0.3}s` }}
                href={item.link}
                key={item.link}
                target="_blank"
              >
                <span className={styles.index}>{index + 1}</span>
                {item.title}
              </a>
            ))}
        </div>
      )}
    </div>
  );
};
