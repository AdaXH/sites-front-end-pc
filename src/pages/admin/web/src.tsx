import { Input } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { SRC_MODELS } from './constant';

import styles from './styles.less';

interface Props {
  data?: Record<string, any>;
}

export default forwardRef((props: Props, ref) => {
  const [state, setState] = useState<any>(props.data || {});
  const onChange = (code, value) => {
    state[code] = value;
    setState({ ...state });
  };

  useImperativeHandle(ref, () => ({
    getValue: () => state,
  }));

  return (
    <div className={styles.create}>
      {SRC_MODELS.map((item) => (
        <div className={styles.item} key={item.code}>
          <div className={styles.label}>{item.title}：</div>
          <div className={styles.con}>
            <Input value={state[item.code]} onChange={(e) => onChange(item.code, e.target.value)} />
          </div>
        </div>
      ))}
    </div>
  );
});
