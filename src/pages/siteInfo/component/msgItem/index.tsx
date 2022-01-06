import React, { useEffect, useState } from 'react';
import { formatTime, sliceNumber } from '@/utils/functions';
import Notification from '@/component/Notification';
import showdown from 'showdown';
import { MsgItemData } from '../../';
import MsgModal from '../textArea';
import { MsgProps } from '../../';
import { leaveMsg, deleteMsg } from '../../service';
import { replaceEmoji } from '../textArea/component/preview/util';
import styles from './styles.less';
import { Modal } from 'antd';

const converter = new showdown.Converter();

export default ({
  data,
  setMsgList,
  siteUserId,
  isLogin,
  newMsgNode,
  setNewMsgEntry,
  superAdmin,
}: MsgProps) => {
  const { message, siteType, siteId } = data || {};
  if (!message) return null;
  const [visible, setVisible] = useState(false);
  const [toUserId, setInfo] = useState(siteUserId);
  const onNewMsg = async () => {
    if (!isLogin) {
      Notification.error({ msg: '你还没有登陆噢' });
      return;
    }
    await setInfo(siteUserId);
    setVisible(true);
  };
  useEffect(() => {
    try {
      if (newMsgNode) {
        onNewMsg();
      }
    } finally {
      setNewMsgEntry(false);
    }
  }, [newMsgNode]);
  const getValue = async (value: string) => {
    if (!value || (value.trim && !value.trim())) {
      Notification.error({ msg: '输入不规范' });
      return;
    }
    const { success, data: resData } = await leaveMsg({
      siteId,
      siteType,
      content: value,
      toUserId,
    });
    if (success && resData.message) {
      await setMsgList(resData.message);
      setVisible(false);
    }
  };
  const onDelete = async (msgId: string, fromUserId: string) => {
    const { success, data: resData } = await deleteMsg({
      siteId,
      siteType,
      msgId,
      fromUserId,
    });
    if (success && resData) {
      setMsgList(message.filter((item: MsgItemData) => item._id !== msgId));
    }
  };
  const toRepeat = async (newId: string) => {
    if (!isLogin) {
      Notification.error({ msg: '你还没有登陆噢' });
      return;
    }
    await setInfo(newId);
    setVisible(true);
  };
  return (
    <div className={styles.message}>
      <Modal
        onCancel={() => setVisible(false)}
        visible={visible}
        closable={false}
        maskClosable
        destroyOnClose
        footer={null}
        title={null}
        className={styles.modal}
        width={650}
      >
        <MsgModal visible={visible} onClose={() => setVisible(false)} getValue={getValue} />
      </Modal>
      {message.map((msgItem, index) => (
        <div className={styles.msgItem} key={msgItem._id}>
          <div className={styles.left}>{sliceNumber(index + 1)}</div>
          <div className={styles.right}>
            <div className={styles.top}>
              <div className={styles.msgName}>
                <h1>
                  <a
                    data-default
                    href={`/site-userInfo?userId=${msgItem.fromUserId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {msgItem?.fromUser?.name}
                  </a>
                  {msgItem.toUserId && msgItem.fromUserId !== msgItem.toUserId && (
                    <>
                      {' '}
                      <a data-default>@</a>{' '}
                      <a
                        data-default
                        href={`/site-userInfo?userId=${msgItem.toUserId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {msgItem?.toUser?.name}
                      </a>
                    </>
                  )}
                </h1>
                <div className={styles.operation}>
                  <a
                    className={styles.reply}
                    data-default
                    onClick={() => toRepeat(msgItem.fromUserId)}
                  >
                    <i className="iconqianjin iconfont" />
                  </a>
                </div>
              </div>
              <p className={styles.msgDate}>{formatTime(msgItem.date)}</p>
            </div>
            <div className={styles.info}>
              <div
                className={styles.avatar}
                style={{ backgroundImage: `url(${msgItem?.fromUser?.avatar})` }}
              />
            </div>
            <div className={styles.msgBoxWrap}>
              <p
                className={styles.msgContent}
                dangerouslySetInnerHTML={{
                  __html: converter.makeHtml(replaceEmoji(msgItem.content) || ''),
                }}
              ></p>
              {superAdmin && (
                <a
                  className={styles.delete}
                  onClick={() => onDelete(msgItem._id, msgItem.fromUserId)}
                >
                  <i className="iconfont icondelete" />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
