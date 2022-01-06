import React, { useState } from 'react';
import { Input, Modal } from 'antd';
import { ModalData } from '.';
import { updateSiteAdmin } from './service';

import styles from './styles.less';

interface EditProps {
  onClose?: (bool?: boolean) => void;
  data?: ModalData;
  updateCurRow?: (item: SiteModel) => void;
}

export const EditModal: React.FC<EditProps> = ({ onClose, data, updateCurRow }) => {
  const { visible, ...others } = data;
  const [state, setState] = useState(others);
  const { siteName, siteLink, siteDesc, _id: siteId, rss } = state;
  const onSetVal = (val, changeKey) => {
    setState({
      ...state,
      [changeKey]: val,
    });
  };
  const onPressEnter = async () => {
    const { success } = await updateSiteAdmin({ siteId, ...state });
    if (success) {
      updateCurRow(state);
    }
    // if
  };
  if (!visible) return null;

  return (
    <Modal
      className={styles.modal}
      closable={false}
      visible={visible}
      onOk={onPressEnter}
      onCancel={() => onClose(false)}
    >
      <div className={styles.item}>
        <span>站点名称：</span>
        <span>
          <Input value={siteName} onChange={(e) => onSetVal(e.target.value, 'siteName')} />
        </span>
      </div>
      <div className={styles.item}>
        <span>站点链接：</span>
        <span>
          <Input value={siteLink} onChange={(e) => onSetVal(e.target.value, 'siteLink')} />
        </span>
      </div>
      <div className={styles.item}>
        <span>站点描述：</span>
        <span>
          <Input.TextArea
            maxLength={200}
            value={siteDesc}
            onChange={(e) => onSetVal(e.target.value, 'siteDesc')}
          />
        </span>
      </div>

      <div className={styles.item}>
        <span>RSS：</span>
        <span>
          <Input value={rss} onChange={(e) => onSetVal(e.target.value, 'rss')} />
        </span>
      </div>
    </Modal>
  );
};
