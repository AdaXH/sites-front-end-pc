import React, { useCallback, useState, useEffect, Fragment } from 'react';
import { useDidMount } from '../utils/hooks';
import { setCache, getCache } from '../utils/functions';
import { DEFAULT_BG } from './constant';
import { Header } from './menu';
import ViewBox from './viewBox';
import { CACHE_BG_KEY } from './constant';
import { getConfig } from './service';
// import bg from './asset/bg.jpg';

import styles from './styles.less';

interface Props {
  children: React.ReactNode | Element;
  history: any;
}

export default ({ children, history }: Props) => {
  const {
    location: { pathname },
  } = history;
  const [curBg, setBg] = useState(getCache(CACHE_BG_KEY) || DEFAULT_BG);
  useEffect(() => {
    if (curBg) {
      setCache(CACHE_BG_KEY, curBg);
    }
  }, [curBg]);
  const [config, setCfg] = useState<{ bgList?: Array<string> }>({});
  useDidMount(async () => {
    const { success, data } = await getConfig();
    if (success && data) {
      setCfg(data);
    }
  });
  const onChangeBg = useCallback((newBgUrl) => {
    setBg(newBgUrl === 'default' ? DEFAULT_BG : newBgUrl);
  }, []);
  const { bgList } = config;
  if (pathname === '/super-admin') return <Fragment>{children}</Fragment>;
  return (
    <div className={styles.body}>
      <Header history={history} />
      <div className={styles.bg} style={{ backgroundImage: `url(${curBg})` }} />
      <div className={styles.bgWrap}></div>
      <div className={styles.childrenBox}>
        <div className={styles.viewBox}>
          <ViewBox onChangeBg={onChangeBg} data={{ bgList }} />
          <div className={styles.animate} key={/user/.test(pathname) ? 'default' : pathname}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
