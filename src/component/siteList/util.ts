import { colors } from './constant';

export function randomColor(): string {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index] || 'gray';
}
