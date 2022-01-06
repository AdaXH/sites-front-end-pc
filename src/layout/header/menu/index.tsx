import classNames from 'classnames';
import React, { useCallback } from 'react';
import { Route } from '../constant';
import styles from './styles.less';

interface MenuProps extends Route {
  routes: Array<Route>;
  parent?: Route;
  pathname: string;
  push?: Function;
  visible?: boolean;
}

export default ({ routes, parent, iconfont, pathname, push, visible }: MenuProps) => {
  if (!routes) return null;
  const onClick = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
  }, []);
  const renderTitle = iconfont ? <i className={`iconfont ${iconfont}`} /> : parent.title;
  return (
    <a
      className={styles.moreBox}
      data-current={pathname.includes(parent.path)}
      data-url={parent.path}
      onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => onClick(e)}
    >
      {renderTitle}
      <div className={classNames(styles.con, { [styles.bg]: visible })}>
        {routes.map(({ path, title, hidden }) => {
          if (hidden) return null;
          return (
            <a
              // to={path}
              onClick={() => push(path)}
              // url={path}
              data-current={pathname === path}
              className={styles.moreItem}
              data-url={path}
              key={path}
            >
              {title}
            </a>
          );
        })}
      </div>
    </a>
  );
};
