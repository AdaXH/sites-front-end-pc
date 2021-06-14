import React, { useState, createRef, useEffect, useCallback } from 'react';
import { Input, Radio } from 'antd';
import { useDidMount } from '@/utils/hooks';
import Notification from '@/component/Notification';
import BindAccount from './components/bindAccount';
import UserIcon from './userIcon';
import { USER_INFO } from './constant';
import { queryMyBasicInfo, updateMyBasicInfo } from './service';

import styles from './styles.less';

const MAP_COMPONENT = {
  input: Input,
  radio: Radio.Group,
  email: Input,
  textarea: Input.TextArea,
};

interface DataState {
  avatar?: { value: string };
  email?: string;
  qqUserId?: string;
  name?: string;
}

export default ({ reLoad, dispatch, history }) => {
  const [data, setData] = useState<DataState>({});
  const [needBind, setBind] = useState(false);
  const iconRef: BasicRef = createRef();
  const onOut = useCallback(() => {
    dispatch({
      type: 'user/signOut',
    });
    history.push('/');
  }, []);

  const query = useCallback(async () => {
    const { success, data: resData } = await queryMyBasicInfo();
    if (success && resData) {
      setData(resData);
    }
  }, []);

  useDidMount(query);

  const onUpdate = async () => {
    const body = {
      ...data,
      avatar: iconRef.current.getValue(),
    };
    const { success } = await updateMyBasicInfo(body);
    if (success) {
      Notification.success({ msg: '已更新～' });
      reLoad();
    }
  };
  const onChange = (eve, code) => {
    setData({
      ...data,
      [code]: eve.target ? eve.target.value : eve,
    });
  };
  const { avatar, email, name } = data;
  const [avatarValue, setAvatar] = useState<{ value: string } | string>('');
  useEffect(() => {
    setAvatar(avatar);
  }, [avatar]);
  const refresh = useCallback(() => {
    query();
    setBind(false);
  }, []);
  return (
    <div className={styles.box}>
      <div className={styles.basic}>
        <div className={styles.avatarBox}>
          <div className={styles.avatar} style={{ backgroundImage: `url(${avatarValue})` }} />
          <div className={styles.emailText}>
            {email ? (
              name
            ) : (
              <span>
                {!needBind ? (
                  <React.Fragment>
                    <a onClick={() => setBind(true)}>绑定</a>
                    已有账号
                  </React.Fragment>
                ) : (
                  <a onClick={() => setBind(false)}>取消绑定</a>
                )}
              </span>
            )}
          </div>
        </div>
        {!needBind ? (
          <div className={styles.info}>
            {USER_INFO.map(({ code, name, type, ...others }) => {
              const Component = MAP_COMPONENT[type];
              if (!Component) return null;
              const value = data[code];
              return (
                <div className={styles.item} key={code}>
                  <span className={styles.label}>{name}：</span>
                  <span className={styles.con}>
                    <Component {...others} value={value} onChange={(e) => onChange(e, code)} />
                  </span>
                </div>
              );
            })}
            <div className={styles.item}>
              <span className={styles.label}>头像：</span>
              <span className={styles.con}>
                <UserIcon
                  ref={iconRef}
                  value={typeof data.avatar === 'string' ? data.avatar : data?.avatar?.value}
                  setAvatar={setAvatar}
                />
              </span>
            </div>
          </div>
        ) : (
          <BindAccount refresh={refresh} reLoad={reLoad} />
        )}
      </div>
      {!needBind && (
        <div className={styles.updBtn}>
          <div className={styles.button} onClick={onUpdate}>
            更新
          </div>
          <div className={styles.button} onClick={onOut}>
            退出登录
          </div>
        </div>
      )}
    </div>
  );
};
