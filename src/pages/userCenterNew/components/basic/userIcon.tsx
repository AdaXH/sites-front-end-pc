import React, { useState, forwardRef, useImperativeHandle, createRef, useEffect } from 'react';
import { Radio, Input } from 'antd';
import Upload from '@/component/upload';
import { getValueByRef } from '@/utils/functions';

import styles from './styles.less';

export default forwardRef(
  ({ value: oldVal, setAvatar }: { value?: string; setAvatar?: any }, ref) => {
    const [value, setValue] = useState<string>();
    useEffect(() => {
      if (oldVal) {
        setValue(oldVal);
      }
    }, [oldVal]);
    const [iconType, setType] = useState('url');
    const uploadRef = createRef();
    useImperativeHandle(ref, () => ({
      getValue: () => ({
        iconType,
        value: iconType === 'url' ? value : getValueByRef(uploadRef),
        oldVal,
      }),
    }));
    useEffect(() => {
      setAvatar(value);
    }, [value]);
    return (
      <div className={styles.con}>
        <div className={styles.innerBox}>
          <Radio.Group value={iconType} onChange={(e) => setType(e.target.value)}>
            <Radio value="url">链接</Radio>
            <Radio value="upload">上传</Radio>
          </Radio.Group>
          {iconType === 'url' ? (
            <Input value={value} onChange={(e) => setValue(e.target.value)} maxLength={150} />
          ) : (
            <Upload setAvatar={setAvatar} ref={uploadRef} hiddenPreview />
          )}
        </div>
      </div>
    );
  },
);
