import { connect } from 'dva';
import React from 'react';
import { RootState, User } from 'state-typings';

import styles from './styles.less';

export const TopImg = connect(({ user }: RootState) => ({
  user,
}))(({ user }: { user: User }) => {
  const image = user?.pageConfig?.image;
  if (!image) return <div className={styles.default} />;
  return <img key={image} alt="image" className={styles.layoutBg} src={image} />;
});
