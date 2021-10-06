import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Table, Checkbox, Popconfirm } from 'antd';
import { querySitesv2 } from '@/utils/service';
import { siteVerrifyApi, deleteSiteAdmin } from './service';
import { EditModal } from './editModal';
import styles from './styles.less';

export interface ModalData extends SiteModel {
  visible?: boolean;
}

export default ({ history }: { history: History }) => {
  const [pagination, setPage] = useState({
    current: 1,
    total: 1,
  });
  const {
    location: { pathname },
  } = history;
  const siteType = useMemo(() => {
    try {
      const arr = pathname.split('/');
      return arr[arr.length - 1];
    } catch (error) {
      return '';
    }
  }, [pathname]);
  const [modalInfo, setModal] = useState<ModalData>({});
  const [data, setData] = useState([]);
  async function query(page = 1) {
    const { data: resData, totalCount } = await querySitesv2({
      page,
      siteType,
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
  useEffect(() => {
    if (siteType) query();
  }, [siteType]);
  const onVerify = async (siteVerify, { _id: siteId, userId, siteName, siteType }) => {
    const { success } = await siteVerrifyApi({ siteVerify, siteId, siteType, siteName, userId });
    if (success) {
      setData(
        data.map((item) => ({
          ...item,
          siteVerify: siteId === item._id ? siteVerify : item.siteVerify,
        })),
      );
    }
  };
  const deleteSite = useCallback(
    async (d) => {
      const { _id: siteId, userId, siteType } = d;
      const { success } = await deleteSiteAdmin({ siteId, userId, siteType });
      if (success) {
        setData(data.filter((item) => item._id !== siteId));
      }
    },
    [data],
  );

  const oepnModal = (d) => {
    setModal({
      visible: true,
      ...d,
    });
  };
  const columns = [
    {
      title: '站点名称',
      // dataIndex: 'siteName',
      render: (a) => (
        <a onClick={() => window.open(`/site-info?siteType=${siteType}&siteId=${a._id}`)}>
          {a.siteName}
        </a>
      ),
    },
    {
      title: '站点链接',
      dataIndex: 'siteLink',
      render: (a) => (
        <a href={a} target="_blank" rel="noreferrer">
          {a}
        </a>
      ),
    },
    {
      title: '操作',
      render: (d) => (
        <React.Fragment>
          <Checkbox checked={d.siteVerify} onChange={(e) => onVerify(e.target.checked, d)}>
            审核通过
          </Checkbox>
          <a onClick={() => oepnModal(d)}>编辑</a>
          <Popconfirm title="删除将不可恢复，确认？" onConfirm={() => deleteSite(d)}>
            <a>删除</a>
          </Popconfirm>
        </React.Fragment>
      ),
    },
  ];
  const { visible } = modalInfo;
  const updateCurRow = (newData) => {
    setData(
      data.map((item) => {
        if (item._id === newData._id) {
          item = newData;
        }
        return item;
      }),
    );
    setModal({ visible: false });
  };
  return (
    <div className={styles.box}>
      {visible && (
        <EditModal
          updateCurRow={updateCurRow}
          data={modalInfo}
          onClose={() => setModal({ visible: false })}
        />
      )}
      <Table
        dataSource={data}
        rowKey="_id"
        columns={columns}
        pagination={{
          ...pagination,
          pageSize: 12,
          onChange: (pageNo) => query(pageNo),
        }}
      />
    </div>
  );
};
