import React, { useMemo } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { MENUS } from './constant';

const { Sider } = Layout;
const { SubMenu } = Menu;
export default ({ history }: { history: History }) => {
  const defaultKey = useMemo(() => {
    const {
      location: { pathname },
    } = history;
    return pathname.replace('super-admin/', '');
  }, [history]);
  return (
    <Sider width={200} style={{ background: '#fff' }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={[defaultKey]}
        defaultOpenKeys={MENUS.map((item) => item.title)}
        style={{ height: '100%', borderRight: 0 }}
      >
        {MENUS.map((item) => (
          <SubMenu
            key={item.title}
            title={
              <span>
                <Icon type={item.icon} />
                {item.title}
              </span>
            }
          >
            {item.menus.map((menu) => (
              <Menu.Item onClick={() => history.push(`/super-admin${menu.path}`)} key={menu.path}>
                {menu.title}
              </Menu.Item>
            ))}
          </SubMenu>
        ))}
      </Menu>
    </Sider>
  );
};
