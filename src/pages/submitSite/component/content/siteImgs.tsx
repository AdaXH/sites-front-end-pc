import React, { forwardRef, useImperativeHandle, createRef } from 'react';
import Upload from '@/component/upload';
import { getValueByRef } from '@/utils/functions';

import styles from './styles.less';

export default forwardRef(
  (
    {
      value,
    }: // isQuickSubmit,
    {
      value: Array<{ src: string }>;
      isQuickSubmit?: boolean;
    },
    ref,
  ) => {
    const uploadRefOne = createRef();
    // const uploadRefTwo = createRef();
    useImperativeHandle(ref, () => ({
      getValue: () => {
        const imgs = [];
        const img1 = getValueByRef(uploadRefOne);
        // const img2 = getValueByRef(uploadRefTwo);
        if (img1) imgs.push(img1);
        // if (img2) imgs.push(img2);
        return imgs;
      },
    }));
    return (
      <div className={styles.item}>
        <h1>
          Screenshot
          <i className="iconjietu iconfont" />
        </h1>
        <p>站点截图， 建议pc端截图</p>
        <div className={styles.con}>
          <div className={styles.box}>
            <Upload text="站点截图" ref={uploadRefOne} value={value && value[0]} />
          </div>
          {/* <div className={styles.box}>
          <Upload ref={uploadRefTwo} value={value && value[1]} />
        </div> */}
        </div>
      </div>
    );
  },
);
