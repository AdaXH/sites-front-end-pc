import React from 'react';
import ReactDOM from 'react-dom';
import { LoginBox } from './loginBox';

const mountComponent = (component: React.FC<{}>) => {
  const parent = document.getElementById('__wrapComponent____login');
  if (!parent) {
    const __wrapComponent__ = document.createElement('div');
    __wrapComponent__.id = '__wrapComponent____login';
    document.getElementsByTagName('body')[0].appendChild(__wrapComponent__);
  }
  ReactDOM.render(component({}), document.getElementById('__wrapComponent____login'));
};

const showLogin = (destory: boolean, props?: any, autoClose?: boolean) => {
  const Component: React.FC<any> = () => {
    if (destory) return null;
    return <LoginBox {...props} autoClose={autoClose} onClose={() => LoginModal.hide()} />;
  };
  mountComponent(Component);
};

const LoginModal = {
  show: (arg = {}, bool = false) => showLogin(false, arg, bool),
  hide: () => showLogin(true),
};

export default LoginModal;
