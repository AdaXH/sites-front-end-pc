import React, { useState } from 'react';
import { useDidMount } from '@/utils/hooks';
import { sliceNumber } from '@/utils/functions';
import { parseRss } from './service';

import styles from './styles.less';

export default ({ data }: { data: string }) => {
  const [list, setList] = useState<RssModel[]>([]);
  useDidMount(async () => {
    if (data) {
      const { success, data: resData } = await parseRss({ rss: data });
      if (success && resData) {
        setList(resData);
      }
    }
  });
  if (!list?.length) return null;
  return (
    <div className={styles.list}>
      {list.length !== 0 &&
        list.map((item, index) => (
          <a
            rel="noreferrer"
            style={{ animationDuration: `${index * 0.3}s` }}
            href={item.link}
            key={item.link}
            className={styles.item}
            target="_blank"
            data-default
          >
            <span className={styles.index}>{sliceNumber(index + 1)}</span>
            {item.title}
          </a>
        ))}
    </div>
  );
};
