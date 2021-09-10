import React, { useState, Fragment } from 'react';
import Notification from '@/component/Notification';
import { qqSign } from '@/utils/functions';
import Input from '../input';
import { Base64 } from 'js-base64';
import { hex } from 'js-md5';
// import { register } from './service';
import styles from './styles.less';

interface ValState {
  name?: string;
  email?: string;
  registerEmailCode?: string;
  submitPassword?: string;
  password?: string;
}

export const Login: React.FC<{ dispatch: Function }> = ({ dispatch }) => {
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
        password: Base64.encode(hex(values.password || '')),
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
      if (password.length < 6 || password.length > 20) {
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
      <div className={styles.wrap}>
        <div className={styles.container}>
          <Input
            name={isLogin ? '用户名或邮箱' : '用户名'}
            value={name}
            onChange={(val: string) => setNewVal('name', val)}
            onEnter={onSubmit}
            type="text"
          />

          <Input
            name="密码"
            value={password}
            type="password"
            onChange={(val: string) => setNewVal('password', val)}
            onEnter={onSubmit}
          />
          <div className={styles.footer} onClick={onSubmit}>
            <i className="iconfont iconqianjin" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
