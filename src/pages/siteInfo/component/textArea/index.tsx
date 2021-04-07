import React, { useState, useRef } from 'react';
import Preview from './component/preview';
import Emoji from './component/emoji';
import { EMOJI_PREFIX } from './component/emoji/constant';
import { emojiList } from './constant';

import styles from './styles.less';

interface AreaProps {
  onClose: Function;
  getValue: Function;
  visible?: boolean;
}

export default (props: AreaProps) => {
  const [data, setData] = useState<string>();
  const { onClose, getValue } = props;
  const [preview, setVisible] = useState(true);
  const [emojiVisible, setEmojiVisible] = useState(true);
  const ref1 = useRef();
  const onAdd = (code: string, pureText = false) => {
    const prefix = pureText ? ' ' : EMOJI_PREFIX;
    setData(`${data || ''}${prefix}${code}${prefix}`);
  };
  return (
    <div className={styles.dialogBox}>
      <div className={styles.bgWrap} onClick={() => onClose()} />
      <div className={styles.container}>
        <div className={styles.content}>
          <textarea
            value={data}
            onChange={(e) => setData(e.target.value)}
            ref={ref1}
            autoFocus
            placeholder="支持markdown语法"
          />
          <div className={styles.footer}>
            <a className={styles.item} onClick={() => setVisible(!preview)}>
              <i className="iconfont iconyulan1" />
            </a>
            <a className={styles.item} onClick={() => setEmojiVisible(!emojiVisible)}>
              <i className="iconfont iconface" />
            </a>
            <a onClick={() => onClose()} className={styles.item}>
              <i className="iconfont iconClosewithcircle" />
            </a>
            <a className={styles.item} onClick={() => getValue(data)}>
              <i className="iconfont iconqueding1" />
            </a>
          </div>
          {emojiVisible && <Emoji onAdd={onAdd} emojiList={emojiList} />}
          {preview && <Preview emojiList={emojiList} value={data} />}
        </div>
      </div>
    </div>
  );
};
