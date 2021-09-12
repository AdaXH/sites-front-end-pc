import React, { useState, Fragment } from 'react';
import Notification from '@/component/Notification';
import { qqSign } from '@/utils/functions';
import Input from '../input';
import { Base64 } from 'js-base64';
import { hex } from 'js-md5';
// import { register } from './service';
import { changeFn } from '../..';
import styles from './styles.less';

interface ValState {
  name?: string;
  email?: string;
  registerEmailCode?: string;
  submitPassword?: string;
  password?: string;
}

export const Registry: React.FC<{ dispatch: Function; onChangePage: changeFn }> = ({
  dispatch,
  onChangePage,
}) => {
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
      const api = 'user/register';
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
    <div className={styles.container}>
      <Input
        // name="User name or E-mail"
        name="用户名"
        value={name}
        onChange={(val: string) => setNewVal('name', val)}
        onEnter={onSubmit}
        type="text"
      />
      <Input
        // name="User name or E-mail"
        name="邮箱"
        value={email}
        onChange={(val: string) => setNewVal('email', val)}
        onEnter={onSubmit}
        type="text"
      />
      <Input
        // name="User name or E-mail"
        name="验证码"
        value={email}
        onChange={(val: string) => setNewVal('registerEmailCode', val)}
        onEnter={onSubmit}
        type="text"
      />
      <Input
        // name="Password"
        name="密码"
        value={password}
        type="password"
        onChange={(val: string) => setNewVal('password', val)}
        onEnter={onSubmit}
      />
      <Input
        // name="Password"
        name="密码确认"
        value={submitPassword}
        type="password"
        onChange={(val: string) => setNewVal('submitPassword', val)}
        onEnter={onSubmit}
      />
      <a data-line className={styles.footer} onClick={onSubmit}>
        GO
        <i className="iconfont iconqianjin" />
      </a>
      <div className={styles.or}>
        已有账号？前往{' '}
        <a data-line onClick={() => onChangePage(2)}>
          登录
        </a>
      </div>
    </div>
  );
};
