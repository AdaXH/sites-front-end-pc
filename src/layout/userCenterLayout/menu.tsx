import React, { useCallback, useState } from 'react';
import { Layout, Menu } from 'antd';
import { removeInfo } from '@/models/user';
import { MENUS } from './constant';
import styles from './styles.less';

const { Sider } = Layout;

export const MenuSide: React.FC<{ history?: any; defaultPath: string }> = ({
  history,
  defaultPath,
}) => {
  const [collapsed, onChangeSlide] = useState(false);
  const handleClick = useCallback((path, onClick) => {
    if (onClick) {
      onClick();
      return;
    }
    if (path === 'logout') {
      removeInfo();
      window.location.href = 'https://sites.link';
      return;
    }
    history.push(path);
  }, []);
  return (
    <Sider
      theme="light"
      collapsible
      collapsed={collapsed}
      onCollapse={(bool) => onChangeSlide(bool)}
    >
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <span />
          <span />
          <span />
        </div>
        {!collapsed && <div className={styles.title}>个人中心</div>}
      </div>
      <Menu theme="light" defaultSelectedKeys={[defaultPath]} mode="inline">
        {MENUS.map(({ path, title, icon, onClick }) => (
          <Menu.Item key={path} onClick={() => handleClick(path, onClick)}>
            <i className={icon} />
            {!collapsed && <span className={styles.menuTitle}>{title}</span>}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};
