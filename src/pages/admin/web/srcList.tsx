import { getValueByRef } from '@/utils/functions';
import { useDidMount, useLoading } from '@/utils/hooks';
import { Button, Modal, Popconfirm, Spin, Table } from 'antd';
import React, { useRef, useState } from 'react';
import { deleteSrc, querySrc, updateSrc } from './service';
import Src from './src';

import styles from './styles.less';

export default ({ history }) => {
  const [data, setData] = useState<any[]>();
  async function query() {
    const { data: res } = await querySrc();
    if (res) {
      setData(res);
    }
  }
  useDidMount(query);
  const onDelete = async (_id) => {
    const { success } = await deleteSrc({ _id });
    if (success) {
      setData(data.filter((item) => item._id !== _id));
    }
  };

  const onEdit = (row) => {
    Modal.info({
      content: <Content data={row} reload={query} />,
      title: null,
      maskClosable: true,
      width: 620,
      okButtonProps: {
        style: { display: 'none' },
      },
    });
  };

  const columns = [
    {
      dataIndex: 'pathname',
      title: '页面路径',
    },
    {
      dataIndex: 'image',
      title: '头图',
      width: '30%',
    },
    {
      dataIndex: 'mainTitle',
      title: '主标题',
    },
    {
      dataIndex: 'desc',
      title: '描述',
      width: '30%',
    },
    {
      title: '操作',
      render: (row) => (
        <div className={styles.operation}>
          <a onClick={() => onEdit(row)}>编辑</a>
          <Popconfirm title="确认删除？" onConfirm={() => onDelete(row._id)}>
            <a>删除</a>
          </Popconfirm>
        </div>
      ),
    },
  ];
  return (
    <div className={styles.box}>
      <Table rowKey="_id" dataSource={data} columns={columns} />
    </div>
  );
};

const Content = ({ data, reload }) => {
  const ref = useRef();
  const [loading, onUpdate] = useLoading(async () => {
    const state = getValueByRef(ref);
    await updateSrc({ ...data, ...state });
    reload();
    Modal.destroyAll();
  });
  return (
    <Spin spinning={loading}>
      <Src data={data} ref={ref} />
      <Button type="primary" onClick={onUpdate}>
        更新
      </Button>
    </Spin>
  );
};
