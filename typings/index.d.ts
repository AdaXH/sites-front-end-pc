declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}

interface Window {
  isMobile?: boolean;
}

type RefCallback<T> = { bivarianceHack(instance: T | null): void }['bivarianceHack'];

type Ref<T> = RefCallback<T> | RefObject<T> | null;

interface BasicRef extends RefAttributes {
  current: {
    [x?]: any;
    getValue?: Function;
  };
}
