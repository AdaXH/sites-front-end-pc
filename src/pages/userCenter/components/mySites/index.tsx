import React, { useState } from 'react';
import { Popconfirm, Table } from 'antd';
import { useDidMount } from '@/utils/hooks';
import { MAP_SITE_TYPE } from '@/utils/constant';
import { queryMySites, deleteSite } from './service';

import styles from './styles.less';

export default ({ reLoad }) => {
  const [data, setData] = useState([]);
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
          <a
            className={styles.link}
            onClick={() => window.open(`/submit-site?siteId=${_id}&siteType=${siteType}`)}
          >
            编辑
          </a>
          <Popconfirm
            title={`确认删除站点：${siteName}?`}
            onConfirm={() => onDelete(_id, userId, siteType)}
          >
            <a className={styles.link}>删除</a>
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <Table rowKey={(d) => d._id} className={styles.table} dataSource={data} columns={columns} />
  );
};
