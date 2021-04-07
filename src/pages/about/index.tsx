import React, { memo } from 'react';
import Content from '@/layout/content';

import styles from './styles.less';

export default memo(() => (
  <React.Fragment>
    <Content title="bug反馈与建议">
      <div className={styles.con}>
        如果您发现了bug或者有建议提供，您可以直接与我
        <a href="http://wpa.qq.com/msgrd?v=3&uin=3532371088&site=qq&menu=yes" target="_blank" rel="noreferrer">
          联系
        </a>
      </div>
    </Content>
    <Content
      title={
        <React.Fragment>
          <div>关于</div>
          <div>About</div>
        </React.Fragment>
      }
    >
      <div className={styles.con}>
        <div>小站正在处于初期阶，功能正在一步步完善中</div>
        <div></div>
        如果您想协助小站，包括但不限于建议、交互、代码、服务器，您都可以直接与我
        <a href="http://wpa.qq.com/msgrd?v=3&uin=3532371088&site=qq&menu=yes" target="_blank" rel="noreferrer">
          联系
        </a>
        <div>
          或者发送至我的邮箱：<a href="mailto:adaxh@qq.com">adaxh@qq.com</a>
        </div>
        <div>参与其中，您将会出现在开发人员列表中</div>
      </div>
      <div className={`${styles.con} init`}>
        <div>
          This site is in the initial stage. At present, the developer is only me, a humble and
          small front end, and the function is being improved step by step
        </div>
        <div>
          If you want to assist this site, including but not limited to suggestions, interaction,
          code and server, you can{' '}
          <a href="http://wpa.qq.com/msgrd?v=3&uin=3532371088&site=qq&menu=yes" target="_blank" rel="noreferrer">
            contact me directly
          </a>
        </div>
        <div>
          or send it to my email address: <a href="mailto:adaxh@qq.com">adaxh@qq.com</a>
        </div>
        <div>Participate, and you will appear in the developer list</div>
      </div>
    </Content>
  </React.Fragment>
));
