import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useBoolean } from '@/utils/hooks';
import { formatTime, stringify } from '@/utils/functions';
import { getData } from './service';

import styles from './styles.less';

export default ({ history }) => {
  const [state, setState] = useState<{
    loading: boolean;
    list?: SiteModel[];
  }>({
    loading: false,
    list: [],
  });

  const [isHot, { setTrue, setFalse }] = useBoolean(false);
  const [cacheHotData, setCache] = useState<SiteModel[]>([]);

  const api = useMemo(() => (isHot ? 'queryRandom' : 'getHotList'), [isHot]);

  const query = useCallback(
    async (url?: string) => {
      let data = [];
      const extra: any = {};
      const isHotApi = api === 'getHotList';
      if (isHotApi) {
        extra.list = [...cacheHotData];
      }
      console.log('extra', extra.list);
      setState({
        // ...state,
        loading: true,
        ...extra,
      });
      try {
        const { data: resData } = await getData(url || api);
        data = resData;
        if (isHotApi) {
          setCache(resData);
        }
      } finally {
        console.log('extra', extra.list);

        setState({
          loading: false,
          list: data,
        });
      }
    },
    [api, cacheHotData],
  );

  // useDidMount(query);

  const onFresh = useCallback(() => {
    query('queryRandom');
  }, []);

  useEffect(() => {
    query();
  }, [api]);

  const { loading, list = [] } = state;

  const loadingVisible = useMemo(() => loading && api === 'queryRandom', [api, loading]);

  return (
    <div className={styles.listBox}>
      <div className={styles.aminWrap}>
        <div className={styles.dataType}>
          <div className={styles.dataTypeItem} data-current={!isHot} onClick={setFalse}>
            最近活跃
          </div>
          <div className={styles.dot} />
          <div className={styles.dataTypeItem} data-current={isHot} onClick={setTrue}>
            随机推荐
            {isHot && (
              <span className={styles.updIcon} onClick={onFresh}>
                <i className="iconfont iconshuaxin" />
              </span>
            )}
          </div>
          <div data-right={isHot} className={styles.dataTypeLine} />
        </div>
        {!loadingVisible && list.length !== 0 && (
          <div className={styles.list} key={loading.toString()}>
            {list.map(
              ({ siteIcon, siteName, _id: siteId, siteType, siteImgs, siteDesc, submitDate }) => (
                <div key={siteId} className={styles.listItem}>
                  <div className={styles.siteIconWrap}>
                    <div
                      className={styles.siteIcon}
                      style={{ backgroundImage: `url(${siteImgs?.[0]?.src || siteIcon})` }}
                    />
                  </div>
                  <div className={styles.right}>
                    <div className={styles.top}>
                      <h1 className={styles.siteName}>{siteName}</h1>
                      <a
                        className={styles.btn}
                        onClick={() =>
                          history.push(`/site-info?${stringify({ siteType, siteId })}`)
                        }
                      >
                        Link
                      </a>
                    </div>
                    <div className={styles.bottom}>
                      <p className={styles.desc}>{siteDesc}</p>
                      <p className={styles.date}>{formatTime(submitDate)}</p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        )}
        {loadingVisible && (
          <div className={styles.loadingWrap}>
            <div className={styles.loadinDot} />
          </div>
        )}
      </div>
    </div>
  );
};
