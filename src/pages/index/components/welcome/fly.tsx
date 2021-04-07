import React, { createRef, memo, useEffect, useState, useMemo } from 'react';
import { useUnmount } from '@/utils/hooks';
import styles from './styles.less';

interface ComponentType extends React.FC {
  timer?: any;
}

const Component: ComponentType = memo(({ children }) => {
  const ref: React.LegacyRef<HTMLDivElement> = createRef();
  const [finish, setFinish] = useState(false);
  useUnmount(() => clearTimeout(Component.timer));
  useEffect(() => {
    const getParse = (num: number) => {
      return parseInt('' + Math.random() * num, 10);
    };
    if (ref.current) {
      const divs = Array.from(ref.current.children);
      divs.forEach((div: HTMLDivElement) => {
        const x = (Math.random() + 1) * 800;
        const opx = getParse(100) % 2 === 0 ? -1 : 1;
        const opy = getParse(200) % 2 === 0 ? -1 : 1;
        const opz = getParse(300) % 2 === 0 ? -1 : 1;
        const y = (Math.random() + 1) * 800;
        const styles = `
        opacity: '0';
         transform: scale(100) translateX(${opx * x}px) translateZ(${opz * x}px) translateY(${
          opy * y
        }px);
        }`;
        div.style.cssText = styles;
      });
      Component.timer = setTimeout(() => {
        divs.forEach((div: HTMLDivElement) => {
          const styles = `
        opacity: '1';
         transform: scale(0) translateX(0) translateZ(0) translateY(0);
         transition: all ${Math.random() + 1}s;
        }`;
          div.style.cssText = styles;
        });
        setTimeout(() => {
          setFinish(true);
          if (ref.current) {
            ref.current.style.display = 'none';
          }
        }, 1500);
      }, 10);
    }
  }, [ref]);
  const finishStyle = useMemo(
    () => ({
      opacity: finish ? '1' : '0',
      transform: `scale(${finish ? 1 : 0})`,
    }),
    [finish],
  );
  return (
    <React.Fragment>
      <span className={styles.finish} style={finishStyle}>
        {children}
      </span>
      <div style={{ opacity: finish ? '0' : '1' }} ref={ref}>
        <div className={styles.fly} />
        <div className={styles.fly} />
        <div className={styles.fly} />
        <div className={styles.fly} />
        <div className={styles.fly} />
        <div className={styles.fly} />
        <div className={styles.fly} />
        <div className={styles.fly} />
        <div className={styles.fly} />
        <div className={styles.fly} />
        <div className={styles.fly} />
        <div className={styles.fly} />
        <div className={styles.fly} />
        <div className={styles.fly} />
        <div className={styles.fly} />
        <div className={styles.fly} />
        <div className={styles.fly} />
        <div className={styles.fly} />
        <div className={styles.fly} />
        <div className={styles.fly} />
      </div>
    </React.Fragment>
  );
});

export default Component;
