import { useState, useRef } from 'react';
import { getTime } from './util';
import { useDidMount, useUnMount } from '@/util/hooks';
import classNames from 'classnames';
import { LOGO, TITLE } from './constant';
import { getConfig } from './service';
import styles from './styles.less';

export default ({ theme, user }) => {
  function getCurTime() {
    const { hour, minute, sec } = getTime();
    return `${hour}:${minute}:${sec}`;
  }
  const [config, setConfig] = useState({});
  const ref = useRef({});
  useDidMount(async () => {
    ref.current = setInterval(() => {
      setTime(getCurTime());
    }, 1000);
    const res = await getConfig();
    if (res.success) {
      setConfig(res.config);
    }
  });
  useUnMount(() => {
    clearInterval(ref.current);
  });
  const [time, setTime] = useState(() => getCurTime());
  const { text1, text2 } = config;
  const { name, avatar } = user || {};
  return (
    <div
      className={classNames({
        [styles.info]: true,
        [styles[theme]]: true,
      })}
    >
      <div className={styles.infoTip}>
        <div className={styles.time}>
          <div className={styles.timeDate}>{time}</div>
          <div className={styles.titleInfo}>{name || TITLE}</div>
        </div>
        <div className={styles.logoTip}>
          <img src={avatar || LOGO} alt="logo" />
        </div>
      </div>
      <div className={styles.cfgView}>
        <div>{text1}</div>
        <div>{text2}</div>
      </div>
    </div>
  );
};
