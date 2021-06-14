import React, { useState } from 'react';
import { Table, Popconfirm } from 'antd';
import { useDidMount } from '@/utils/hooks';
import { MAP_SITE_TYPE } from '@/utils/constant';
import { queryMyFavorite, togglCollectSite } from './service';

import styles from '../mySites/styles.less';

export default () => {
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
  const columns = [
    {
      title: '名称',
      render: ({ siteType, siteName, _id }) => (
        <a
          className={`${styles.item} ${styles.name}`}
          onClick={() => window.open(`/site-info?siteId=${_id}&siteType=${siteType}`)}
        >
          {siteName}
        </a>
      ),
    },
    {
      title: '分类',
      render: ({ siteType }) => MAP_SITE_TYPE[siteType],
    },
    {
      title: '点赞',
      render: ({ siteUpvotes }) => (
        <span className={styles.upvote}>
          <i className="iconfont icondianzan" />
          <span className={styles.upvoteNum}>{siteUpvotes.length}</span>
        </span>
      ),
    },
    {
      title: '链接',
      render: ({ siteLink }) => (
        <a href={siteLink} className={styles.link} target="_blank" rel="noreferrer">
          {siteLink}
          <i className="iconfont iconlink" />
        </a>
      ),
    },
    {
      title: '操作',
      render: ({ siteType, siteName, _id, userId }) => (
        <div className={styles.item}>
          <Popconfirm
            title={`确认取消收藏站点：${siteName}?`}
            onConfirm={() => cancelFavorite(_id, siteType)}
          >
            <a className={styles.link}>取消收藏</a>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table className={styles.table} rowKey={(d) => d._id} dataSource={data} columns={columns} />
  );
};
