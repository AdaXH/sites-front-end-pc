import React, { useMemo } from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import { User, RootState } from 'state-typings';
import Content from '@/layout/content';
import SiteList from './component/siteList';
import UserList from './component/userList';

import styles from './styles.less';

export default connect(({ user: userModel }: RootState) => ({ userModel }))(
  ({ userModel }: { userModel: User }) => {
    const tabs = useMemo(
      () => [
        {
          siteType: 'technology',
          title: '技术类站点',
          component: (siteType) => <SiteList siteType={siteType} />,
        },
        {
          siteType: 'life',
          component: (siteType) => <SiteList siteType={siteType} />,

          title: '生活类站点',
        },
        {
          siteType: 'info',
          component: (siteType) => <SiteList siteType={siteType} />,

          title: '资讯类站点',
        },
        {
          siteType: 'others',
          component: (siteType) => <SiteList siteType={siteType} />,
          title: '其它类站点',
        },
        {
          component: () => <UserList />,
          title: '用户管理',
        },
      ],
      [],
    );
    return (
      <div className={styles.wrap}>
        <Content title="管理员 beta">
          {userModel.admin ? (
            <div className={styles.tab}>
              <Tabs>
                {tabs.map(({ title, siteType, component }) => (
                  <Tabs.TabPane key={title} tab={title}>
                    {component(siteType)}
                  </Tabs.TabPane>
                ))}
              </Tabs>
            </div>
          ) : (
            <div>你没有权限哦</div>
          )}
        </Content>
      </div>
    );
  },
);
