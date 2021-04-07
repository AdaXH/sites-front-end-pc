import React from 'react';
import { Pagination } from 'antd';
import { itemRender } from './util';
import styles from './styles.less';

export interface Pagenation {
  total?: number;
  pageSize?: number;
  current?: number;
  onChange?: (page?: number, pageSize?: number) => void;
}

export default (props: { pagination: Pagenation }) => {
  const { total = 1, pageSize = 12, current = 1, onChange } = props.pagination || {};
  return (
    <div className={styles.pageCon}>
      <Pagination
        total={total}
        pageSize={pageSize}
        current={current}
        onChange={onChange}
        itemRender={(current, type, originalElement: React.ReactElement) =>
          itemRender(current, type, originalElement, total)
        }
      />
    </div>
  );
};
