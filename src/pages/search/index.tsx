import React, { useState, useCallback } from 'react';
import Content from '@/layout/content';
import SiteList from '@/component/siteList';
import { User } from 'state-typings';
import UserList from './userList';

import { Input } from 'antd';
import { searchApi } from './service';
import styles from './styles.less';

const { Search } = Input;

interface SearchState {
  users?: Array<User>;
  sites?: Array<SiteModel>;
}

export default ({ history }: { history: any }) => {
  const [data, setData] = useState<SearchState>({
    users: [],
    sites: [],
  });
  const [queryWd, setQueryWd] = useState('');
  const onSearch = useCallback(async (val) => {
    console.log('val', val);
    if (val) {
      setQueryWd('');
      const { success, data: searchRes } = await searchApi({ wd: val });
      if (success) {
        const { users, sites } = searchRes;
        setData({
          users: users || [],
          sites: sites || [],
        });
        setQueryWd(val);
      }
    }
  }, []);
  const { users, sites } = data;
  return (
    <Content title="搜索">
      <div className={styles.seachBox}>
        <Search placeholder="用户/站点" onSearch={onSearch} enterButton />
      </div>
      <div className={styles.resBox}>
        {queryWd && (
          <React.Fragment>
            <div>
              关于“{queryWd}”，共搜索到{users.length + sites.length}条：
            </div>
            {users.length !== 0 && (
              <React.Fragment>
                <div className={styles.seachTitle}>用户：</div>
                <UserList data={users} />
              </React.Fragment>
            )}
            {sites.length !== 0 && (
              <React.Fragment>
                <div className={styles.seachTitle}>站点：</div>
                <SiteList data={sites} history={history} />
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    </Content>
  );
};
