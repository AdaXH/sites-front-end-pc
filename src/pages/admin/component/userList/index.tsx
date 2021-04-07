import React, { useState } from 'react';
import { Table, Checkbox, Popconfirm } from 'antd';
import { useDidMount } from '@/utils/hooks';
import { formatTime } from '@/utils/functions';
import { queryUsers, setPermission, deleteUser } from './service';
import styles from './styles.less';

export default () => {
  const [pagination, setPage] = useState({
    current: 1,
    total: 1,
  });
  const [data, setData] = useState([]);
  async function query(page = 1) {
    const { data: resData, totalCount } = await queryUsers({
      page,
    });
    if (resData) {
      setData(resData);
      setPage({
        ...pagination,
        current: page,
        total: totalCount,
      });
    }
  }
  useDidMount(query);
  const onSetPermission = async (admin, userId) => {
    const { success } = await setPermission({ admin, userId });
    if (success) {
      setData(
        data.map((item) => {
          if (item._id === userId) {
            item.admin = admin;
          }
          return item;
        }),
      );
    }
  };
  const deleteUserAdmin = async (userId) => {
    const { success } = await deleteUser({ userId });
    if (success) {
      setData(data.filter((item) => item._id !== userId));
    }
  };
  const columns = [
    {
      title: 'name',
      render: (a) => <a onClick={() => window.open(`/site-userInfo/${a._id}`)}>{a.name}</a>,
    },
    {
      title: 'email',
      dataIndex: 'email',
      render: (a) => <a href={`mailto:${a}`}>{a}</a>,
    },
    {
      title: '上次登录',
      dataIndex: 'lastLoginTime',
      render: (d) => formatTime(d),
    },
    {
      title: '操作',
      render: (d) => (
        <React.Fragment>
          <Checkbox checked={d.admin} onChange={(e) => onSetPermission(e.target.checked, d._id)}>
            管理员
          </Checkbox>
          <Popconfirm title="删除将不可恢复，确认？" onConfirm={() => deleteUserAdmin(d._id)}>
            <a>删除</a>
          </Popconfirm>
        </React.Fragment>
      ),
    },
  ];
  return (
    <div className={styles.box}>
      <Table
        dataSource={data}
        rowKey="_id"
        columns={columns}
        pagination={{
          ...pagination,
          pageSize: 10,
          onChange: (pageNo) => query(pageNo),
        }}
      />
    </div>
  );
};
