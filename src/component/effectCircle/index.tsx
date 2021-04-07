import React, { memo, useState, useMemo, useCallback } from 'react';
import classnames from 'classnames';
import { AsideProps } from '../aside';
import Aside from '../aside';
import styles from './styles.less';

export default memo(({ data, onChangeBg }: AsideProps) => {
  const [visible, setVisible] = useState(false);
  const centryCalss = useMemo(
    () =>
      classnames({
        [styles.dot]: true,
        [styles.entryVisible]: visible,
      }),
    [visible],
  );
  const onClose = useCallback(() => {
    setVisible(false);
  }, []);
  const { bgList } = data;
  return (
    <React.Fragment>
      <div className={styles.center}>
        <div className={styles.line} onClick={() => setVisible(!visible)}>
          <div className={centryCalss} />
          <div className={centryCalss} />
          <div className={centryCalss} />
          {visible && <Aside onChangeBg={onChangeBg} onClose={onClose} data={{ bgList }} />}
        </div>
        <div className={styles.effCircle}>
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </React.Fragment>
  );
});
