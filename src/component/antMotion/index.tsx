import React, { memo } from 'react';
import TweenOne from 'rc-tween-one';
// @ts-ignore
import PathPlugin from 'rc-tween-one/lib/plugin/PathPlugin';
import styles from './styles.less';
TweenOne.plugins.push(PathPlugin);
export default memo(() => {
  const path = `M4.750000056357962,95.75000234131304 L4.750000056357962,1.7499999417276948 L96.75000326241373,95.75000234131304 L4.750000056357962,95.75000234131304`;
  return (
    <div style={{ position: 'relative', height: 200, width: 200, margin: '10px auto' }}>
      <TweenOne
        animation={{
          path,
          repeat: -1,
          duration: 20000,
          ease: 'linear',
        }}
        style={{ margin: 0, width: 20, height: 20, transform: 'translate(-10px, -10px)' }}
        className={styles.codeShape}
      />
      <svg width="200" height="200">
        <path d={path} fill="none" stroke="#40c2f8" />
      </svg>
    </div>
  );
});
