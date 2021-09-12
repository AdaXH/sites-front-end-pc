import React, { useState, useMemo } from 'react';
// import { BasicInfo } from './component/baseInfo';
import { COMPONENT_LIST } from './constant';

import styles from './styles.less';

export type changeFn = (page: number) => void;

export const LoginBox: React.FC<{ current: number; onChangePage: changeFn }> = ({
  current,
  onChangePage,
}) => {
  // const [Component, setCom] = useState();
  //   const { Element } = COMPONENT_LIST[current - 1] || {};
  const style = useMemo(() => {
    return {
      transform: `translate3d(0, -${(current - 1) * 350}px, 0)`,
    };
  }, [current]);
  return (
    <div className={styles.loginBox}>
      <div className={styles.transform} style={style}>
        {COMPONENT_LIST.map(({ title, Element }) => {
          return (
            <div key={title} className={styles.item}>
              <div className={styles.title}>{title}</div>
              <section>
                <Element onChangePage={onChangePage} />
              </section>
            </div>
          );
        })}
      </div>
    </div>
  );
};
