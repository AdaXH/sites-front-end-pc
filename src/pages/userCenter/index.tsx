import React, { useCallback, useState, useMemo } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { RootState, User } from 'state-typings';
// import Wrap from './components/wraper';
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
  const { dispatch } = props;
  const [activityKey, setKey] = useState<string>(USER_CENTER_ROUTES[0].path);
  const reLoad = useCallback(() => {
    dispatch({ type: 'user/getUserInfo' });
  }, []);
  const Component = useMemo(() => {
    const { title, Component: component } = USER_CENTER_ROUTES.find(
      (item) => item.path === activityKey,
    );
    return {
      component,
      title,
    };
  }, [activityKey]);
  const { component, title } = Component || {};
  return (
    <div className={styles.indexContainer}>
      <div className={styles.menus}>
        {USER_CENTER_ROUTES.map(({ title, path }) => (
          <div className={styles.menuItem} key={path} onClick={() => setKey(path)}>
            {title}
          </div>
        ))}
        <div
          className={classnames({
            [styles.bgCircle]: true,
            [styles[activityKey.replace(/\//g, '')]]: true,
          })}
        >
          <span key={activityKey} className={styles.title}>
            {title}
          </span>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.innerContainer} key={activityKey}>
          {component && component({ ...props, reLoad })}
        </div>
      </div>
    </div>
  );
});
