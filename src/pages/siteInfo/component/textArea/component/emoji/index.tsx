// import a from './images/daku.png';
import React, { memo, useState, useMemo } from 'react';
import { EMOJI_TYPE } from './constant';
import styles from './styles.less';

export interface EmojiItem {
  src: string;
  code: string;
}

export interface EmojiProps {
  onAdd?: Function;
  emojiList?: Array<EmojiItem>;
}

export default memo(({ onAdd, emojiList }: EmojiProps) => {
  const [active, setKey] = useState(EMOJI_TYPE[0].code);
  const Component = EMOJI_TYPE.find((item) => item.code === active).component();
  const menus = useMemo(() => EMOJI_TYPE.map(({ code, text }) => ({ code, text })), [EMOJI_TYPE]);
  return (
    <div className={styles.emojiBox}>
      <div className={styles.emojiMenu}>
        {menus.map(({ code, text }) => (
          <a
            className={code === active ? styles.current : ''}
            onClick={() => setKey(code)}
            key={code}
          >
            {text}
          </a>
        ))}
      </div>
      <div className={styles.container} key={active}>
        <Component onAdd={onAdd} emojiList={emojiList} />
      </div>
    </div>
  );
});
