import React from 'react';
import { DEFAULT_BG } from '../../../layout/constant';
import styles from './styles.less';

export interface BgListProps {
  bgList?: Array<string>;
  onChangeBg?: (bg: string) => void;
}

export default ({ bgList, onChangeBg }: BgListProps) => {
  if (!bgList) return null;
  return (
    <div className={styles.imgList}>
      <div className={styles.imgWrap}>
        <div
          // key={item}
          style={{ backgroundImage: `url(${DEFAULT_BG})` }}
          className={styles.itemImg}
          onClick={() => onChangeBg(DEFAULT_BG)}
        >
          默认
        </div>
      </div>
      {bgList.map((item) => (
        <div key={item} className={styles.imgWrap}>
          <div
            key={item}
            style={{ backgroundImage: `url(${item})` }}
            className={styles.itemImg}
            onClick={() => onChangeBg(item)}
          />
        </div>
      ))}
    </div>
  );
};
