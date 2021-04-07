import React from 'react';

import ReactDOM from 'react-dom';
import styles from './styles.less';

const mountComponent = (component: React.FC<{}>) => {
  const parent = document.getElementById('__wrapComponent__');
  if (!parent) {
    const __wrapComponent__ = document.createElement('div');
    __wrapComponent__.id = '__wrapComponent__';
    document.getElementsByTagName('body')[0].appendChild(__wrapComponent__);
  }
  ReactDOM.render(component({}), document.getElementById('__wrapComponent__'));
};

const showLoading = (destory: boolean) => {
  const component = () => {
    if (destory) return null;
    return (
      <div className={styles.loadingUI}>
        <div className={styles.loadingContainer}>
          <div className={styles['k-ball7a']}></div>
          <div className={styles['k-ball7b']}></div>
          <div className={styles['k-ball7c']}></div>
          <div className={styles['k-ball7d']}></div>
        </div>
      </div>
    );
  };
  mountComponent(() => component());
};

const Loading = {
  show: () => showLoading(false),
  hide: () => showLoading(true),
};

export default Loading;
