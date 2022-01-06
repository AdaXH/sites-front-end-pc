import React, { useState } from 'react';
import Notification from '@/component/Notification';
import { qqSign } from '@/utils/functions';
import Input from '../input';
import { Base64 } from 'js-base64';
import { hex } from 'js-md5';
import { changeFn } from '../..';
import styles from './styles.less';
import { login } from '@/component/loginModal/service';

interface ValState {
  name?: string;
  email?: string;
  registerEmailCode?: string;
  submitPassword?: string;
  password?: string;
}

export const Login: React.FC<{
  dispatch?: Function;
  onChangePage: changeFn;
  autoClose?: boolean;
  onClose?: any;
}> = ({ onChangePage }) => {
  const [values, setVal] = useState<ValState>({});
  const { name, password } = values;
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
      if (!name) {
        throw new Error('请输入用户名');
      }
      if (name.length < 3 || name.length > 30) {
        throw new Error('用户名长度3-30位');
      }

      if (!password) {
        throw new Error('请输入密码');
      }
      if (password.length < 6 || password.length > 20) {
        throw new Error('密码长度6-20位');
      }
      body.submitPassword = null;
      const { success } = await login(body);
      if (success) {
        window.location.reload();
        return;
      }
    } catch (error) {
      Notification.fail({ msg: error?.message || error?.errorMsg });
    }
  };
  return (
    <div className={styles.container}>
      <Input
        name="用户名或邮箱"
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
      <a data-line className={styles.footer} onClick={onSubmit}>
        GO
        <i className="iconfont iconqianjin" />
      </a>
      <div className={styles.or}>
        没有账号？前往{' '}
        <a data-line onClick={() => onChangePage(2)}>
          注册
        </a>
        ，或使用{' '}
        <a data-line onClick={qqSign}>
          QQ
        </a>{' '}
        快速登陆
      </div>
    </div>
  );
};
