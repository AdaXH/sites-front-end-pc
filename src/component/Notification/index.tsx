import { message } from 'antd';
import './styles.css';

type ITypes = 'error' | 'success' | 'fail' | 'warning';

type NotiInstance = {
  [x in ITypes]?: (arg: Props) => void;
};

const Notification: NotiInstance = {};

const setInstance = () => {
  ['error', 'fail', 'warning', 'success'].forEach((_type_: ITypes) => {
    const key: ITypes = _type_;
    Notification[_type_] = (args: Props) => Component(args, key);
  });
};

setInstance();

interface Props {
  position?: string;
  msg?: string;
  duration?: number;
}

const Component = (props: Props, _type_: ITypes) => {
  const { msg = '通知' } = props;
  message[_type_ === 'fail' ? 'error' : _type_](msg);
};

export default Notification;
