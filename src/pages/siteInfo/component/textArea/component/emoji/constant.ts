import Emoji from './component/emoji';
import TextEmoji from './component/textEmoji';

export const EMOJI_PREFIX = '::';

export const EMOJI_TYPE = [
  {
    code: 'emoji',
    component: () => Emoji,
    text: '动画表情',
  },
  {
    code: 'textEmoji',
    text: '颜表情',
    component: () => TextEmoji,
  },
];
