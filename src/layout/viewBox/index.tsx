import React, { memo } from 'react';
import Antmotion from '@/component/antMotion';
import EffCircle from '@/component/effectCircle';
import { AsideProps } from '@/component/aside';
// import Title from '@/component/title';

import styles from './styles.less';

export default memo(({ data, onChangeBg }: AsideProps) => (
  <React.Fragment>
    <div className={styles.effBox}>
      <EffCircle data={data} onChangeBg={onChangeBg} />
      {/* <div className={styles.pageTitle}>
        <Title />
      </div> */}
      <div className={styles.animationFrameOne} />
      <div className={styles.animationFrameThree} />
      <div className={styles.animationFour} />
      <div className={styles.effBoxRight}>
        <Antmotion />
      </div>
    </div>
  </React.Fragment>
));
