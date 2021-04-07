import React from 'react';
import { STATIC_TEXT } from './constant';
import { EmojiProps } from '../../index';
import styles from './styles.less';

export default ({ onAdd }: EmojiProps) => {
  return (
    <div className={styles.box}>
      {STATIC_TEXT.map((item, index) => (
        <div onClick={() => onAdd(item, 1)} className={styles.item} key={index}>
          {item}
        </div>
      ))}
    </div>
  );
};
