import React from 'react';
import { Modal } from 'antd';
import styles from './styles.less';

export default (src: string) => {
  Modal.info({
    title: null,
    content: (
      <img onClick={() => Modal.destroyAll()} className={styles.img} src={src} alt="预览图" />
    ),
    maskClosable: true,
    okButtonProps: {
      style: { display: 'none' },
    },
    icon: null,
    className: styles.imgView,
    width: '70%',
  });
};
