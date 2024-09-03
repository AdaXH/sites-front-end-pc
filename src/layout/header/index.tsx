import React, { useEffect, useState } from 'react';
import { User } from 'state-typings';
import { connect } from 'dva';
import { routes, Route, MAX_TOP_HEIGHT } from './constant';
import { SITE_BASIC_INFO } from '@/utils/constant';
import Menu from './menu';
import styles from './styles.less';
import { simpleThrole } from '@/utils/functions';
import classNames from 'classnames';

const { TITLE } = SITE_BASIC_INFO;

interface Props {
  user?: User;
  history: History;
}

export const Header: React.FC<Props> = connect(({ user }) => ({ user }))((props) => {
  const { history, user } = props;
  const {
    location: { pathname },
    push,
  } = history;
  const [activePath, setPath] = useState<string>(pathname);

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, [user.isLogin]);
  const [visible, setVisible] = useState<boolean>(false);

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
            visible={visible}
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

  useEffect(() => {
    function listenScroll() {
      const top = document.scrollingElement.scrollTop;
      setVisible(top >= MAX_TOP_HEIGHT);
    }
    window.addEventListener(
      'scroll',
      simpleThrole(() => listenScroll()),
    );
    return () =>
      window.removeEventListener(
        'scroll',
        simpleThrole(() => listenScroll()),
      );
  }, []);

  const toTop = () => window.scrollTo({ top: 0 });

  return (
    <>
      {/* <div
        data-hidden={visible}
        className={classNames(styles.wrap, { [styles.dark]: visible })}
      ></div> */}
      <header
        data-hidden={visible}
        className={classNames(styles.header, { [styles.dark]: visible })}
      >
        <h1 className={styles.logo} onClick={() => history.push('/')}>
          <span>site|ink</span>
          <span className={styles.bottom}>sites.link</span>
        </h1>
        <ul>{renderLinks(routes)}</ul>
      </header>

      {visible && (
        <div className={styles.toTop} onClick={toTop}>
          <i className="iconqianjin1 iconfont" />
        </div>
      )}
    </>
  );
});
