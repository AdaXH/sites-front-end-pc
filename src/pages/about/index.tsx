import React from 'react';
import BasicTop from '@/component/basicTop';

import styles from './styles.less';
import { connect } from 'dva';
import { RootState, User } from 'state-typings';

export default connect(({ user }: RootState) => ({
  user,
}))(({ user }: { user: User; history: History }) => {
  const { pageConfig } = user;
  const { desc } = pageConfig || {};
  return (
    <div className={styles.wrap}>
      <div>
        <BasicTop
          needMargin={false}
          mainTitle="关于本站"
          desc={
            <>
              因为热爱，所以相聚，<a>“站点聚合平台”，</a>让更多的人发现您的站点。
            </>
          }
        />
      </div>
      <div className={styles.content}>
        <h1>简介</h1>
        <p>
          <a>“站点聚合平台”，</a>
          {desc}
        </p>
        <h1>联系本站</h1>
        <div>
          1.{' '}
          <a
            href="http://wpa.qq.com/msgrd?v=3&uin=3532371088&site=qq&menu=yes"
            target="_blank"
            rel="noreferrer"
            data-line
          >
            QQ
          </a>
        </div>
        <div>
          2.{' '}
          <a data-line href="mailto:adaxh@qq.com">
            邮箱发送
          </a>
        </div>
        <div>
          3.{' '}
          <a data-line href="https://github.com/Sites-Groups" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
        {/* <h1>About</h1>
      <p>
        <div>
          This site is in the initial stage. At present, the developer is only me, a humble and
          small front end, and the function is being improved step by step
        </div>
        <div>
          If you want to assist this site, including but not limited to suggestions, interaction,
          code and server, you can{' '}
          <a
            href="http://wpa.qq.com/msgrd?v=3&uin=3532371088&site=qq&menu=yes"
            target="_blank"
            data-line
            rel="noreferrer"
          >
            contact me directly
          </a>
        </div>
        <div>
          or send it to my email address: <a href="mailto:adaxh@qq.com">adaxh@qq.com</a>
        </div>
        <div>Participate, and you will appear in the developer list</div>
      </p> */}
      </div>
    </div>
  );
});
