import { useState } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import { useDidMount } from '@/util/hooks';
import Info from './info';
import styles from './styles.less';

export default connect(({ user }) => ({ user }))((props) => {
  const { user, dispatch } = props;
  const [style, changeStyle] = useState(false);
  const classes = classnames({
    [styles.index]: true,
    [styles.hidden]: style,
  });
  useDidMount(async () => {
    if (!user.isLogin) {
      await dispatch({
        type: 'user/getUserInfo',
      });
    }
  });
  return (
    <div className={classes}>
      <div className={styles.home}>
        <Info theme={props.theme} user={user} />
      </div>
    </div>
  );
});
