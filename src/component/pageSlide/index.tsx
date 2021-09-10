import React from 'react';
import classNames from 'classnames';
import styles from './styles.less';

interface SlideType {
  total: number;
  onChange?: (page: number) => void;
  current: number;
}

export const PageSlide: React.FC<SlideType> = (props) => {
  const { current, total, onChange } = props;
  const onChangePage = (method: '-' | '+') => {
    if (!onChange) return;
    let nextPage;
    if (method === '-') {
      if (current === 1) {
        nextPage = total;
        return;
      }
      nextPage = current - 1;
    } else {
      if (current === total) return;
      nextPage = current + 1;
    }
    onChange(nextPage);
  };
  return (
    <div className={styles.pageSlide}>
      <div
        className={classNames(styles.top, { [styles.disabled]: current === 1 })}
        onClick={() => onChangePage('-')}
      ></div>
      <div className={styles.box}>
        <div className={styles.current}>{current}</div>
        <div className={styles.line} />
        <div className={styles.total}>{total}</div>
      </div>
      <div
        className={classNames(styles.bottom, { [styles.disabled]: current === total })}
        onClick={() => onChangePage('+')}
      ></div>
    </div>
  );
};
