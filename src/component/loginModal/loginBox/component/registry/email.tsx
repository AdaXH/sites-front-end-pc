import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { IS_EMAIL } from '@/utils/regexp';
import Input from '../input';
import { sendCodeToEmail } from './service';
// import { Button }
import styles from './styles.less';

interface Props {
  email?: string;
  onChange?: Function;
  registerEmailCode?: string;
  onSetEmailCode?: Function;
  onEnter?: Function;
  type?: string;
}

const Component: any = ({ email, onChange, registerEmailCode, onSetEmailCode, onEnter }: Props) => {
  const [time, setTime] = useState(0);
  const isEmail = IS_EMAIL.test(email);
  const [btnDisabled, setDisabled] = useState(false);
  useEffect(() => {
    if (time === 0) {
      clearInterval(Component.interVal);
      setDisabled(false);
    }
  }, [time]);
  const disabledStatus: boolean = useMemo(() => !isEmail || btnDisabled, [isEmail, btnDisabled]);
  const getCode = useCallback(async () => {
    if (disabledStatus) return;
    const res = await sendCodeToEmail({ email: email.trim() });
    if (res.success) {
      setDisabled(true);
      let start = 60;
      Component.interVal = setInterval(() => {
        setTime(start);
        start -= 1;
      }, 1000);
    }
  }, [disabledStatus, email]);
  return (
    <>
      <div className={styles.email}>
        <Input type="text" name="邮箱" value={email} onChange={onChange} onEnter={onEnter} />
        <a onClick={getCode} data-disabled={disabledStatus}>
          点击获取验证码{time !== 0 && `${time}s`}
        </a>
      </div>
      <Input
        type="text"
        name="验证码"
        onEnter={onEnter}
        value={registerEmailCode}
        onChange={onSetEmailCode}
      />
    </>
  );
};

export default Component;
