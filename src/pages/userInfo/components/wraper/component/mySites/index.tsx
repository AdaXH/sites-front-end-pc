import React, { useState } from 'react';
import { Popconfirm } from 'antd';
import { useDidMount } from '@/utils/hooks';
import { MAP_SITE_TYPE } from '@/utils/constant';
import { queryMySites, deleteSite } from './service';

import styles from './styles.less';

export default ({ reLoad }) => {
  const [data, setData] = useState<MySiteMode[]>([]);
  useDidMount(async () => {
    const { data: resData } = await queryMySites();
    if (resData) {
      setData(resData);
    }
  });
  if (!data) return null;
  const onDelete = async (siteId, userId, siteType) => {
    const { success } = await deleteSite({ siteId, userId, siteType });
    if (success) {
      await setData(data.filter((item) => item._id !== siteId));
      reLoad();
    }
  };
  return (
    <div className={styles.sites}>
      {data.map((item, index) => {
        if (!item) return null;
        const { siteLink, siteName, siteUpvotes, _id, siteType, userId } = item;
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
              <a onClick={() => window.open(`/submit-site?siteId=${_id}&siteType=${siteType}`)}>
                编辑
              </a>
              <Popconfirm
                title={`确认删除站点：${siteName}?`}
                onConfirm={() => onDelete(_id, userId, siteType)}
              >
                <a>删除</a>
              </Popconfirm>
            </div>
          </div>
        );
      })}
    </div>
  );
};
