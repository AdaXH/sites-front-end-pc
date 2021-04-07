import React, { useState, Fragment } from 'react';
import Notification from '@/component/Notification';
import Input from './input';
import Email from './email';
import { Base64 } from 'js-base64';
import { hex } from 'js-md5';
import ForgetPwd from '../forgetPwd';
// import { register } from './service';
import styles from './styles.less';

interface ValState {
  name?: string;
  email?: string;
  registerEmailCode?: string;
  submitPassword?: string;
  password?: string;
}

const Login: React.FC<{ dispatch: Function }> = ({ dispatch }) => {
  const [values, setVal] = useState<ValState>({});
  const [isLogin, setLogin] = useState(true);
  const { name, email, registerEmailCode, submitPassword, password } = values;
  const setNewVal = (code: string, val: string) => {
    setVal({
      ...values,
      [code]: val,
    });
  };
  const onSubmit = async () => {
    try {
      const body = {
        ...values,
        password: `I don't tell youn how i make password, 嘻嘻`,
      };
      const api = isLogin ? 'user/login' : 'user/register';
      // 注册
      if (!name) {
        throw '请输入用户名';
      }
      if (name.length < 3 || name.length > 30) {
        throw '用户名长度3-30位';
      }
      if (!isLogin && !email) {
        throw '请输入邮箱';
      }
      if (!isLogin && !registerEmailCode) {
        throw '请输入验证码';
      }
      if (!password) {
        throw '请输入密码';
      }
      if (password.length < 6 || name.length > 20) {
        throw '密码长度6-20位';
      }
      if (!isLogin && password !== submitPassword) {
        throw '两次密码不一致';
      }
      // }
      await dispatch({
        type: api,
        payload: body,
      });
    } catch (error) {
      Notification.fail({ msg: error });
    }
  };
  const [modalVisible, setModal] = useState(false);
  return (
    <Fragment>
      {modalVisible && <ForgetPwd setVisible={setModal} />}
      <div className={styles.wrap}>
        <div className={styles.container} style={{ height: isLogin ? '180px' : '380px' }}>
          {/* {err && <div key={err} className={styles.err}>{err.toString()}</div>} */}
          <div className={styles.operation}>
            <a data-current={isLogin} onClick={() => setLogin(true)}>
              登录
            </a>
            <a data-current={!isLogin} onClick={() => setLogin(false)}>
              注册
            </a>
            <a data-current="false" onClick={() => setModal(true)}>
              忘记密码
            </a>
          </div>
          <Input
            name={isLogin ? '用户名或邮箱' : '用户名'}
            value={name}
            onChange={(val: string) => setNewVal('name', val)}
            onEnter={onSubmit}
            type="text"
          />
          {!isLogin && (
            <Email
              name="邮箱"
              email={email}
              registerEmailCode={registerEmailCode}
              onChange={(val: string) => setNewVal('email', val)}
              onSetEmailCode={(val: string) => setNewVal('registerEmailCode', val)}
              onEnter={onSubmit}
            />
          )}

          <Input
            name="密码"
            value={password}
            type="password"
            onChange={(val: string) => setNewVal('password', val)}
            onEnter={onSubmit}
          />
          {!isLogin && (
            <Input
              name="密码确认"
              type="password"
              value={submitPassword}
              onChange={(val: string) => setNewVal('submitPassword', val)}
              onEnter={onSubmit}
            />
          )}
          <div className={styles.footer} onClick={onSubmit}>
            <i className="iconfont iconqianjin" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
