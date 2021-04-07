import { EMOJI_PREFIX } from '../emoji/constant';
import { emojiList } from '../../constant';
export function replaceEmoji(value: string): string {
  if (!value) return '';
  return replace(value);
}

function replace(str: string): string {
  emojiList.forEach(({ code, src }) => {
    const reg = new RegExp(`${EMOJI_PREFIX}${code}${EMOJI_PREFIX}`, 'g');
    str = str.replace(reg, `<img src="${src}"/>`);
  });
  return str;
}
