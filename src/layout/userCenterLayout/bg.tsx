import React, { useCallback, useState, memo } from 'react';
import { getCache } from '@/utils/functions';
import { useDidMount } from '@/utils/hooks';
import ViewBox from '../viewBox';
import { DEFAULT_BG, CACHE_BG_KEY } from '../constant';
import { getConfig } from '../service';

import styles from './styles.less';

export default memo(() => {
  useDidMount(async () => {
    const { success, data } = await getConfig();
    if (success && data) {
      setCfg(data);
    }
  });
  const [config, setCfg] = useState<{ bgList?: Array<string> }>({});
  const [curBg, setBg] = useState(getCache(CACHE_BG_KEY) || DEFAULT_BG);
  const { bgList } = config;
  const onChangeBg = useCallback((newBgUrl) => {
    setBg(newBgUrl === 'default' ? DEFAULT_BG : newBgUrl);
  }, []);
  return (
    <React.Fragment>
      {/* <div className={styles.bg} style={{ backgroundImage: `url(${curBg})` }} /> */}
      <ViewBox onChangeBg={onChangeBg} data={{ bgList }} />
      {/* <div className={styles.bgWrap}></div> */}
    </React.Fragment>
  );
});
