import React, { useRef } from 'react';
import { useLoading } from '@/utils/hooks';
import { Button, Spin } from 'antd';
import Src from './src';
import { createSrc } from './service';

import styles from './styles.less';
import { getValueByRef } from '@/utils/functions';
import Notification from '@/component/Notification';

export default () => {
  const ref = useRef({});

  const [loading, onSubmit] = useLoading(async () => {
    const state = getValueByRef(ref);
    const { success } = await createSrc(state);
    if (success) Notification.success({ msg: '已提交' });
  });
  return (
    <Spin spinning={loading}>
      <div className={styles.create}>
        <Src ref={ref} />
        <Button onClick={onSubmit} type="primary">
          提交
        </Button>
      </div>
    </Spin>
  );
};
