import React, { useState, useMemo, CSSProperties, useEffect } from 'react';
import { User } from 'state-typings';
import { COMPONENT_LIST } from './constant';

import styles from './styles.less';

export type changeFn = (page: number) => void;

interface Props {
  dispatch: VoidFunction;
  onClose: VoidFunction;
  user: User;
  history: History;
  autoClose?: boolean;
}

export const LoginBox: React.FC<Props> = ({
  user,
  history,
  dispatch,
  onClose,
  autoClose,
}: Props) => {
  const [current, setCurrent] = useState<number>(1);
  const style: Partial<CSSProperties> = useMemo(() => {
    return {
      transform: `translate3d(0, -${(current - 1) * 360}px, 0)`,
    };
  }, [current]);
  useEffect(() => {
    if (user?.isLogin) {
      onClose();
      history.push('/user-center');
    }
  }, [user]);
  if (user?.isLogin) return null;
  return (
    <div className={styles.mask} onClick={onClose}>
      <div className={styles.loginBox} onClick={(e) => e.stopPropagation()}>
        <div className={styles.transform} style={style}>
          {COMPONENT_LIST.map(({ title, Element }) => {
            return (
              <div key={title} className={styles.item}>
                <div className={styles.title}>{title}</div>
                <section>
                  <Element
                    autoClose={autoClose}
                    onClose={onClose}
                    dispatch={dispatch}
                    onChangePage={setCurrent}
                  />
                </section>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
