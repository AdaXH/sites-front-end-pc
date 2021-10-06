import React, { useCallback } from 'react';
import BasicTop from '@/component/basicTop';
import { connect } from 'dva';
import { RootState, User } from 'state-typings';
import { USER_CENTER_ROUTES } from './constant';
import styles from './styles.less';

interface WrapProps {
  user: User;
  dispatch?: any;
  history?: History;
}

export default connect(({ user }: RootState) => ({
  user,
}))((props: WrapProps) => {
  const { dispatch, user } = props;
  const reLoad = useCallback(() => {
    dispatch({ type: 'user/getUserInfo' });
  }, []);
  const { avatar, name, gender, myDesc } = user;
  return (
    <div className={styles.indexContainer}>
      <BasicTop
        needMargin
        leftContent={
          <div className={styles.smallImg}>
            <div className={styles.img} style={{ backgroundImage: `url(${avatar})` }}></div>
          </div>
        }
        mainTitle={`${name} (${gender})`}
        desc={myDesc}
      />
      <div className={styles.menus}>
        {USER_CENTER_ROUTES.map(({ title, path, Component }) => (
          <div className={styles.menuItem} key={path}>
            <h1 className={styles.menuTitle}>{title}</h1>
            <div>
              <Component {...props} reLoad={reLoad} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
