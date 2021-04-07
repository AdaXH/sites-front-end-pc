import React, { useMemo, useState } from 'react';
import Notification from '@/component/Notification';
import { User } from '@/models/user';
import Fly from './fly';
import Login from '../login';
import styles from './styles.less';

interface WelProps {
  dispatch?: Function;
  user?: User;
  history: any;
}

export const Welcome: React.FC<WelProps> = ({ dispatch, user, history }) => {
  const [visible, setVisible] = useState(false);
  const onSign = () => {
    if (!visible) {
      setVisible(true);
    }
  };
  const { isLogin, name, admin } = user;
  const onView = () => {
    history.push('/user/basic-info');
  };
  const topTyle = useMemo(
    () => ({
      top: visible && !isLogin ? '30%' : '42%',
    }),
    [visible, isLogin],
  );
  const gotoAdmin = () => {
    if (!isLogin) {
      Notification.error({ msg: '你还没有登录哦' });
      return;
    }
    window.open('/super-admin');
  };
  return (
    <div className={styles.homeContainer}>
      <div className={styles.welcomeContainer} style={topTyle}>
        <div className={styles.tips}>
          因为热爱，所以
          <span className={styles.word}>
            <Fly>相聚</Fly>
          </span>
        </div>
        {(!visible || isLogin) && (
          <div className={styles.desc}>
            <div className={styles.line} />
            <div className={styles.title}>
              <div>站点聚合平台</div>
              <div>让更多的人知道您的网站</div>
            </div>
            {!isLogin ? (
              <React.Fragment>
                <a onClick={onSign}>登录</a>以解锁站点提交、收藏、留言等操作
                <div>
                  不想注册？点击
                  <a onClick={() => history.push('/submit-site?submitType=quickSubmit')}>
                    快速提交站点
                  </a>
                  ，跳过登录！
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                欢迎您，{name}，<a onClick={onView}>进入个人中心</a>
              </React.Fragment>
            )}
            {admin && (
              <div className={styles.adminEntry}>
                超级管理员
                <span onClick={gotoAdmin}>入口</span>
              </div>
            )}
          </div>
        )}
      </div>
      {visible && !isLogin && <Login dispatch={dispatch} />}
    </div>
  );
};
