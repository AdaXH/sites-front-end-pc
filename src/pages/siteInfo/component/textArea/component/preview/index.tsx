import React from 'react';
import showdown from 'showdown';
import { EmojiProps } from '../emoji';
import { replaceEmoji } from './util';

import styles from './styles.less';

const converter = new showdown.Converter();

interface PreviewProps extends EmojiProps {
  value?: string;
}

export default ({ value }: PreviewProps) => {
  return (
    <div
      className={styles.preview}
      data-preview="preview："
      dangerouslySetInnerHTML={{
        __html: converter.makeHtml(replaceEmoji(value) || ''),
      }}
    />
  );
};
