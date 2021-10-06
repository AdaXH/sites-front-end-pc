import React, { useCallback, useState } from 'react';
import { useDidMount } from '@/utils/hooks';
import { formatTime, stringify } from '@/utils/functions';
import { queryRandom } from './service';

import styles from './styles.less';

export default () => {
  const [state, setState] = useState<{
    loading: boolean;
    list?: Record<string, number>[];
  }>({
    loading: false,
    list: [],
  });

  const query = useCallback(async () => {
    setState({
      ...state,
      loading: true,
    });
    let data = [];
    try {
      const { data: resData } = await queryRandom();
      data = resData;
    } finally {
      setState({
        loading: false,
        list: data,
      });
    }
  }, []);

  useDidMount(query);

  const onFresh = useCallback(() => {
    query();
  }, []);

  const { loading, list = [] } = state;
  return (
    <div className={styles.listBox}>
      <div className={styles.aminWrap}>
        {loading && (
          <div className={styles.loadingWrap}>
            <div className={styles.loadinDot} />
          </div>
        )}
        <h1 className={styles.title}>
          随机推荐：
          <span className={styles.updIcon} onClick={onFresh}>
            <i className="iconfont iconshuaxin" />
          </span>
        </h1>
        {list.length !== 0 && (
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
                        href={`/site-info?${stringify({ siteType, siteId })}`}
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
      </div>
    </div>
  );
};
