import React, { useState } from 'react';
import { useDidMount } from '@/utils/hooks';
import { MAP_SITE_TYPE } from '@/utils/constant';
import { queryMyFavorite, togglCollectSite } from './service';

import styles from './styles.less';

export default ({ history }) => {
  const [data, setData] = useState([]);
  useDidMount(async () => {
    const { data: resData } = await queryMyFavorite();
    if (resData) {
      setData(resData);
    }
  });
  if (!data) return null;
  const cancelFavorite = async (siteId, siteType) => {
    const { success } = await togglCollectSite({ siteId, siteType });
    if (success) {
      setData(data.filter((item) => item._id !== siteId));
    }
  };
  return (
    <div className={styles.sites}>
      {data.map((item, index) => {
        if (!item) return null;
        const { siteLink, siteName, siteUpvotes, _id, siteType } = item;
        return (
          <div key={siteLink} className={styles.siteItem}>
            <a
              className={`${styles.item} ${styles.name}`}
              onClick={() => window.open(`/site-info?siteId=${_id}&siteType=${siteType}`)}
            >
              <div className={styles.index}>{index + 1}</div>
              {siteName}
            </a>
            <div className={styles.item}>
              <span className={styles.upvote}>
                <i className="iconfont icondianzan" />
                <span className={styles.upvoteNum}>{siteUpvotes.length}</span>
              </span>
            </div>
            <div className={styles.item}>
              <span className={styles.siteType}>{MAP_SITE_TYPE[siteType]}</span>
            </div>
            <div className={styles.item}>
              <a href={siteLink} target="_blank" rel="noreferrer">
                {siteLink}
                <i className="iconfont iconlink" />
              </a>
            </div>

            <div className={styles.item}>
              <a onClick={() => cancelFavorite(_id, siteType)}>取消收藏</a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
