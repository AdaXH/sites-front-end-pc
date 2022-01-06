import React, { useCallback, useState, memo } from 'react';
import { getCache } from '@/utils/functions';
import { useDidMount } from '@/utils/hooks';
import ViewBox from '../viewBox';
import { DEFAULT_BG, CACHE_BG_KEY } from '../constant';
import { getConfig } from '../service';

export default memo(() => {
  useDidMount(async () => {
    const { success, data } = await getConfig();
    if (success && data) {
      setCfg(data);
    }
  });
  const [config, setCfg] = useState<{ bgList?: Array<string> }>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setBg] = useState(getCache(CACHE_BG_KEY) || DEFAULT_BG);
  const { bgList } = config;
  const onChangeBg = useCallback((newBgUrl) => {
    setBg(newBgUrl === 'default' ? DEFAULT_BG : newBgUrl);
  }, []);
  return (
    <React.Fragment>
      <ViewBox onChangeBg={onChangeBg} data={{ bgList }} />
    </React.Fragment>
  );
});
