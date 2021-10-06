import React, { useState, useCallback } from 'react';
import BasicTop from '@/component/basicTop';
import SiteList from '@/component/siteList';
import { User } from 'state-typings';
import UserList from './userList';

import { Input } from 'antd';
import { searchApi } from './service';
import styles from './styles.less';
import { connect } from 'dva';

const { Search } = Input;

interface SearchState {
  users?: Array<User>;
  sites?: Array<SiteModel>;
}

export default connect(({ user }) => ({ user }))(
  ({ history, user }: { history: History; user: User }) => {
    const [data, setData] = useState<SearchState>({
      users: [],
      sites: [],
    });
    const [queryWd, setQueryWd] = useState<string>('');
    async function query(val: string) {
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
    }
    const onSearch = useCallback(query, []);
    const { users, sites } = data;
    const { mainTitle, desc } = user?.pageConfig || {};
    return (
      <div className={styles.wrap}>
        <BasicTop
          desc={
            <div className={styles.searchBox}>
              <Search placeholder="用户/站点" onSearch={onSearch} enterButton />
            </div>
          }
          needMargin
          leftContent={
            <div className={styles.tips}>
              <h1>{mainTitle}</h1>
              <p>{desc}</p>
            </div>
          }
        />
        <div className={styles.searchContainer}>
          {queryWd && (
            <React.Fragment>
              {/* <div className={styles.tips}>
              <h1>关于“{queryWd}”</h1>
              <p>共搜索到{users.length + sites.length}条：</p>
            </div> */}
              {users.length !== 0 && (
                <React.Fragment>
                  <UserList data={users} />
                </React.Fragment>
              )}
              {sites.length !== 0 && (
                <React.Fragment>
                  <SiteList data={sites} history={history} />
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    );
  },
);
