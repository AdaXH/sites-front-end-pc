import React, { useState, useEffect } from 'react';
import { Modal, Input, Button } from 'antd';
import { Base64 } from 'js-base64';
import { hex } from 'js-md5';
import { useSetState } from 'react-use';
import { IS_EMAIL } from '@/utils/regexp';
import { delay, resetObj } from '@/utils/functions';
import Notification from '@/component/Notification';
import { sendCodeToEmailForForget, resetPassword } from './service';
import { validateObj } from './util';
import styles from './styles.less';

interface Props {
  setVisible: Function;
}

const Component: any = ({ setVisible }: Props) => {
  const [btnDisabled, setDisabled] = useState(false);
  const [time, setTime] = useState(0);
  const [state, setState] = useSetState({
    email: '',
    code: '',
    pwd: '',
    checkPwd: '',
  });
  const onSetVal = (key: string, value: any) => setState({ [key]: value });
  const { email, code, pwd, checkPwd } = state;
  const isEmail = IS_EMAIL.test(email);
  const getCode = async () => {
    const res = await sendCodeToEmailForForget({ email: email.trim() });
    if (res.success) {
      setDisabled(true);
      let start = 60;
      Component.interVal = setInterval(() => {
        setTime(start);
        start -= 1;
      }, 1000);
    }
  };
  useEffect(() => {
    if (time === 0) {
      clearInterval(Component.interVal);
      setDisabled(false);
    }
  }, [time]);
  const onSubmit = async () => {
    if (pwd.trim().length <= 5) {
      Notification.fail({ msg: '密码长度不能低于6位' });
      return;
    }
    if (pwd !== checkPwd) {
      Notification.fail({ msg: '两次密码不一致' });
      return;
    }
    const { success } =
      (await resetPassword({
        email,
        pwd: Base64.encode(hex(pwd || '')),
        code,
      })) || {};
    if (success) {
      clearInterval(Component.interVal);
      Notification.success({ msg: '密码已更改' });
      setState(resetObj(state));
      setTime(0);
      await delay(0.7);
      setVisible(false);
    }
  };
  const submitDisabled = !isEmail || validateObj(state);
  return (
    <Modal
      className={styles.modal}
      visible
      closable={false}
      zIndex={100}
      destroyOnClose
      maskClosable={false}
      width={537}
      footer={null}
    >
      <div className={styles.item}>
        <span className={styles.label}>输入您的邮箱：</span>
        <Input value={email} onChange={(e) => onSetVal('email', e.target.value)} />
      </div>
      <div className={styles.item}>
        <span className={styles.label}>输入验证码：</span>
        <Input value={code} onChange={(e) => onSetVal('code', e.target.value)} />
        <Button type="primary" onClick={getCode} disabled={!isEmail || btnDisabled}>
          获取验证码{time !== 0 && `${time}s`}
        </Button>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>新密码：</span>
        <Input value={pwd} onChange={(e) => onSetVal('pwd', e.target.value)} type="password" />
      </div>
      <div className={styles.item}>
        <span className={styles.label}>确认新密码：</span>
        <Input
          value={checkPwd}
          onChange={(e) => onSetVal('checkPwd', e.target.value)}
          type="password"
        />
      </div>
      <div className={styles.item}>
        <Button className={styles.cancelBtn} onClick={() => setVisible(false)}>
          取消
        </Button>
        <Button
          className={styles.sbumitBtn}
          disabled={submitDisabled}
          type="primary"
          onClick={onSubmit}
        >
          确认更改
        </Button>
      </div>
    </Modal>
  );
};

export default Component;
