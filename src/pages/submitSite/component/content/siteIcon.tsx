import React, { useState, forwardRef, useImperativeHandle, createRef, useEffect } from 'react';
import { Radio, Input } from 'antd';
import Upload from '@/component/upload';
import { getValueByRef } from '@/utils/functions';

import styles from './styles.less';

type SiteIconValue = string | { value?: string };

interface SiteIcon {
  value?: SiteIconValue;
}

export default forwardRef(({ value: oldVal }: SiteIcon, ref) => {
  const [value, setValue] = useState<SiteIconValue>();
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
  return (
    <React.Fragment>
      <Radio.Group
        className={styles.radio}
        value={iconType}
        onChange={(e) => setType(e.target.value)}
      >
        <Radio value="url">站点图标链接</Radio>
        <Radio value="upload">上传站点图标</Radio>
      </Radio.Group>
      <div className={styles.item}>
        <div className={styles.name}>
          <i className="icontupian2 iconfont" />
        </div>
        <div className={styles.con}>
          <div className={styles.innerBox}>
            {iconType === 'url' ? (
              <Input
                placeholder="图标链接 *"
                value={String(value || '')}
                onChange={(e) => setValue(e.target.value)}
                maxLength={150}
              />
            ) : (
              <Upload text="站点图标" ref={uploadRef} />
            )}
            {iconType === 'url' && (
              <div className={styles.previewImg}>
                <img src={String(value)} alt="" />
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
});
