import React from 'react';
import { connect } from 'dva';
import { RootState, User } from 'state-typings';
import Login from '@/component/loginModal';
import HotList from './components/hotList';

import styles from './styles.less';

export default connect(({ user }: RootState) => ({
  user,
}))((props) => {
  const { user, dispatch, history } = props;
  const userInfo: User = user || {};
  const loginEntry = () => {
    Login.show({ history, dispatch, user: userInfo }, true);
  };
  const { pageConfig } = userInfo;
  const { mainTitle, desc } = pageConfig || {};
  return (
    <div className={styles.index}>
      <div className={styles.topWrap}>
        <div className={styles.siteInfo}>
          <div className={styles.basic}>
            <p className={styles.desc}>“因为热爱， 所以相聚”.</p>
            <p className={styles.desc}>站点聚合平台，让更多的人记住您的网站.</p>
            <h1>SITES.LINK</h1>
          </div>
          <div className={styles.project}>
            <h1>{mainTitle}</h1>
            <p className={styles.desc}>{desc}</p>
          </div>
          <div className={styles.joing}>
            <a onClick={() => history.push('/sites/submit-site')}>提交您的网站，加入我们！</a>
            <i className="iconqianjin2 iconfont" />
          </div>
        </div>
        <a className={styles.transport} href="/transport" target="_blank">
          <i className="iconfeidie iconfont" />
        </a>
        <div className={styles.userEntry}>
          <i className="iconuser2 iconfont" onClick={loginEntry} />

          {(userInfo.admin || userInfo.superAdmin) && (
            <a href="/super-admin/user-list" target="_blank">
              <i className="iconjishu iconfont" />
            </a>
          )}
          <a href="https://github.com/AdaXH/sites-front-end-pc" target="_blank" rel="noreferrer">
            <i className="icongithub1 iconfont" />
          </a>
        </div>
      </div>
      <div className={styles.view}>
        <HotList history={history} />
      </div>
    </div>
  );
});
