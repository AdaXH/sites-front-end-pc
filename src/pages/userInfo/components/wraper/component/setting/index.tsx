import React, { useState, useEffect } from 'react';
import { Input, Radio, Switch, Button } from 'antd';
import Notification from '@/component/Notification';
import { SETTINGS } from './constant';
import { updateMySetting } from './service';
import styles from './styles.less';

export default ({ user, reLoad }) => {
  const MAP_COMPONENT = {
    input: Input,
    radio: Radio.Group,
    email: Input,
    textarea: Input.TextArea,
    switch: Switch,
  };
  const [state, setState] = useState(() => {
    const newState = {};
    SETTINGS.forEach(({ code: key }) => {
      newState[key] = false;
    });
    return newState;
  });
  useEffect(() => {
    if (user.setting && user.setting.acessNotification) {
      setState(user.setting.acessNotification);
    }
  }, [user]);
  const [globalNoti, setGlobal] = useState<boolean>();
  useEffect(() => {
    const keys = Object.keys(state);
    setGlobal(keys.every((key) => state[key] === true));
  }, [state]);
  const onChange = (value, code) => {
    setState({
      ...state,
      [code]: value,
    });
  };
  const onSetGlobal = (val) => {
    setGlobal(val);
    const keys = Object.keys(state);
    const newState = {};
    keys.forEach((key) => {
      newState[key] = val;
    });
    setState(newState);
  };
  const onUpdate = async () => {
    const { success } = await updateMySetting({ acessNotification: state });
    if (success) {
      Notification.success({ msg: '已更新~' });
      reLoad();
    }
  };
  return (
    <div className={styles.basic}>
      <div className={styles.item}>
        <span className={styles.label}>全部打开：</span>
        <span className={styles.con}>
          <Switch checked={globalNoti} onChange={(v) => onSetGlobal(v)} />
        </span>
      </div>
      {SETTINGS.map(({ code, name, type, ...others }) => {
        const Component = MAP_COMPONENT[type];
        if (!Component) return null;
        return (
          <div className={styles.item} key={code}>
            <span className={styles.label}>{name}：</span>
            <span className={styles.con}>
              <Component {...others} checked={state[code]} onChange={(e) => onChange(e, code)} />
            </span>
          </div>
        );
      })}
      <div className={styles.updBtn} onClick={onUpdate}>
        <Button type="primary">更新</Button>
      </div>
    </div>
  );
};
