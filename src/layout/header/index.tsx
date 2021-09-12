import React, { useEffect, useState } from 'react';
import { User } from 'state-typings';
import { connect } from 'dva';
import { routes, Route } from './constant';
import { SITE_BASIC_INFO } from '@/utils/constant';
import Menu from './menu';
import styles from './styles.less';

const { TITLE } = SITE_BASIC_INFO;

interface Props {
  user?: User;
  history: any;
}

export const Header: React.FC<Props> = connect(({ user }) => ({ user }))((props) => {
  const { history, user } = props;
  const {
    location: { pathname },
    push,
  } = history;
  const [activePath, setPath] = useState<String>(pathname);

  useEffect(() => {
    history.listen(() => {
      const {
        location: { pathname },
      } = history;
      const { title } =
        routes.find((item: Route) => {
          if (!item.childRoutes) {
            return item.path === pathname;
          }
          return item.childRoutes.find((iItem) => {
            return iItem.path === pathname;
          });
        }) || {};
      setPath(pathname);
      document.title = pathname === '/' ? TITLE : `${title || ''} ${TITLE}` || TITLE;
    });
  }, [user.isLogin]);
  function renderLinks(links: Array<Route>) {
    return links.map((item, index) => {
      const { hidden, permission, type, childRoutes, path, title, iconfont, needLogin } = item;
      if (hidden || (permission && !user.admin)) return null;
      if (needLogin && !user.isLogin) return null;
      const renderTitle = iconfont ? <i className={`iconfont ${iconfont}`} /> : title;
      let content = (
        <a key={path} onClick={() => push(path)} data-url={path} data-current={activePath === path}>
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
      return (
        <li
          style={{ animationDelay: `${index * 0.05}s` }}
          key={path}
          data-current={pathname === path}
        >
          {content}
        </li>
      );
    });
  }
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <span>site|ink</span>
        <span className={styles.bottom}>sites.link</span>
      </h1>
      <ul>{renderLinks(routes)}</ul>
    </header>
  );
});
