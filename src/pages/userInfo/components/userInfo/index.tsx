import React from 'react';
import { MENUS } from './constant';
import styles from './styles.less';

export default (props) => {
  const { user, dispatch, history } = props;
  const { name, avatar } = user;
  const {
    location: { pathname },
  } = history;
  const onOut = async () => {
    await dispatch({
      type: 'user/signOut',
    });
    history.push('/');
  };
  return (
    <div className={styles.aside}>
      <div className={styles.userInfo}>
        <div className={styles.logined}>
          <div className={styles.avatar}>
            <img src={avatar} alt="" />
          </div>
          <div>{name}</div>
        </div>
        <div className={styles.operations}>
          {MENUS.map(({ path, icon, title }) => (
            <a
              data-current={pathname === path}
              key={path}
              onClick={path === 'logout' ? onOut : () => history.push(path)}
            >
              <i className={icon} />
              {title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
