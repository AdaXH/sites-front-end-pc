import React, { useEffect, useRef } from 'react';
import { init } from './util';
import styles from './styles.less';

export default ({ children }) => {
  const ref: Ref<HTMLDivElement> = useRef();
  useEffect(() => {
    if (ref.current) {
      init(ref.current);
    }
  }, [ref]);
  return (
    <div className={styles.shake} ref={ref}>
      <div data-depth="0.6" className={`layer ${styles.layer}`}>
        <div className={styles.someSpace} />
      </div>
      <div data-depth="0.4" className={`layer ${styles.layer}`}>
        {children}
      </div>
    </div>
  );
};
