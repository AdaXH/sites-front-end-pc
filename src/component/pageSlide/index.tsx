import React, { useState } from 'react';
import styles from './styles.less';

interface SlideType {
  total: number;
  onChange?: (page: number) => void;
  current: number;
}

export const PageSlide: React.FC<SlideType> = (props) => {
  const { current: initCurrent, total: initTotal, onChange } = props;
  const [state, setState] = useState<Partial<SlideType>>({
    current: initCurrent,
    total: initTotal,
  });
  const { current, total } = state;
  return (
    <div className={styles.pageSlide}>
      <div className={styles.top}></div>
      <div className={styles.box}>
        <div className={styles.current}>{current}</div>
        <div className={styles.line} />
        <div className={styles.total}>{total}</div>
      </div>
      <div className={styles.bottom}></div>
    </div>
  );
};
