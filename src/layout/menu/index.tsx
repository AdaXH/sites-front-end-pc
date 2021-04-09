import React, { useEffect, useState } from 'react';
// import { NavLink } from 'dva/router';
import { User } from '@/models/user';
// import classnames from 'classnames';
import { routes, Route } from './constant';
// import { FULL_SCREEN_PATH } from '@/utils/constant';
import { SITE_BASIC_INFO } from '@/utils/constant';
import Menu from './menu';
import { getNavStyle } from './util';
import styles from './styles.less';

const { TITLE } = SITE_BASIC_INFO;

interface Props {
  user?: User;
  history: any;
}

// type Routes = Array<Route>;

export const Header: React.FC<Props> = (props) => {
  const { history, user } = props;
  const [style, setStyle] = useState({});
  // const [headerStyle, setHeaderStyle] = useState(false);
  const {
    location: { pathname },
    push,
  } = history;
  useEffect(() => {
    history.listen(() => {
      const {
        location: { pathname },
      } = history;
      setStyle(getNavStyle(pathname, styles));
      // setHeaderStyle(FULL_SCREEN_PATH.includes(pathname) && pathname.replace(/\/+|-/g, ''));
      const { title } =
        routes.find((item: Route) => {
          if (!item.childRoutes) {
            return item.path === pathname;
          }
          return item.childRoutes.find((iItem) => {
            // item.newTitle = iItem.title;
            return iItem.path === pathname;
          });
        }) || {};
      document.title = pathname === '/' ? TITLE : `${title} ${TITLE}` || TITLE;
    });
  }, []);
  function renderLinks(links: Array<Route>) {
    return links.map((item) => {
      const { hidden, permission, type, childRoutes, path, title, iconfont } = item;
      if (hidden || (permission && !user.admin)) return null;
      const renderTitle = iconfont ? <i className={`iconfont ${iconfont}`} /> : title;
      let content = (
        <a key={path} onClick={() => push(path)} data-url={path} data-current={pathname === path}>
          {renderTitle}
        </a>
      );
      if (type === 'more' && childRoutes.length) {
        content = (
          <Menu
            push={push}
            iconfont={iconfont}
            pathname={pathname}
            routes={childRoutes}
            parent={item}
            key={path}
          />
        );
      }
      return <li key={path}>{content}</li>;
    });
  }
  return (
    <header
    // className={classnames({
    //   [styles[headerStyle]]: true,
    // })}
    >
      <ul>
        {renderLinks(routes)}
        <div className={styles.navLine} style={style} />
      </ul>
    </header>
  );
};
