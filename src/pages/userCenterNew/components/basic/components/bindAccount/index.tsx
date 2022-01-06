import React, { memo, useState } from 'react';
import { Button } from 'antd';
import Input from '@/pages/index/components/login/input';
import Notification from '@/component/Notification';
import { Base64 } from 'js-base64';
import { hex } from 'js-md5';
import { bindAccount } from './service';
import styles from './styles.less';

export default memo(({ reLoad, refresh }: { reLoad: VoidFunction; refresh: VoidFunction }) => {
  const [values, setVal] = useState<{ name?: string; password?: string }>({});
  const setNewVal = (key, val) => {
    setVal({
      ...values,
      [key]: val,
    });
  };
  const { name, password } = values;
  const onBind = async () => {
    const body = {
      ...values,
      password: Base64.encode(hex(values.password || '')),
    };
    const { success } = await bindAccount(body);
    if (success) {
      Notification.success({
        msg: '滴~ 绑定成功！',
      });
      reLoad();
      refresh();
    }
  };
  return (
    <div className={styles.bingBox}>
      <Input
        name="用户名或邮箱"
        value={name}
        onChange={(val: string) => setNewVal('name', val)}
        type="text"
      />
      <Input
        name="密码"
        value={password}
        type="password"
        onChange={(val: string) => setNewVal('password', val)}
      />
      <Button type="primary" onClick={onBind}>
        绑定账号：{name}
      </Button>
    </div>
  );
});
