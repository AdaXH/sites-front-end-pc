import React, { useEffect, createRef, useState } from 'react';
import { useDidMount } from '@/utils/hooks';
import { start1 } from './util';
import { queryRandom } from './service';

import styles from './styles.less';

const App: React.FC<{ historty: History }> = () => {
  const ref = createRef<HTMLCanvasElement>();
  const [data, setData] = useState<SiteModel>(null);
  useEffect(() => {
    if (ref.current) start1(ref.current);
  }, [ref.current]);
  useDidMount(() => {
    setTimeout(() => {
      queryRandom({ randomCount: 1 }).then((res) => {
        if (res.success && res.data) setData(res.data[0]);
        setTimeout(() => {
          window.location.href = res.data[0].siteLink;
        }, 1500);
      });
    }, 1000);
  });
  return (
    <>
      <canvas ref={ref} id="starfield"></canvas>
      <div className={styles.viewport}>
        <div className={styles.p1}>星河渺渺 唯你闪耀.</div>
        <div className={styles.p2} data-finish={Boolean(data)} key={JSON.stringify(data)}>
          {data && (
            <div>
              发现：
              <span>{data.siteName}</span>
            </div>
          )}
          {data && <div className={styles.p3}>“{data.siteDesc}”</div>}
        </div>
      </div>

      <h1 className={styles.logo} onClick={() => window.open('/')}>
        <span>site|ink</span>
        <span className={styles.bottom}>sites.link</span>
      </h1>
    </>
  );
};

export default App;
