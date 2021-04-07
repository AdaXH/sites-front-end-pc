import React, { useState } from 'react';
import { Popconfirm, Modal } from 'antd';
import { formatTime } from '@/utils/functions';
import Notification from '@/component/Notification';
import showdown from 'showdown';
import { MsgItemData } from '../../';
import MsgModal from '../textArea';
import { MsgProps } from '../../';
import { leaveMsg, deleteMsg } from '../../service';
import { replaceEmoji } from '../textArea/component/preview/util';
import styles from './styles.less';

const converter = new showdown.Converter();

export default ({ data, setMsgList, siteUserId, isLogin }: MsgProps) => {
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
      >
        <MsgModal visible={visible} onClose={() => setVisible(false)} getValue={getValue} />
      </Modal>
      <a className={styles.newMsg} onClick={onNewMsg}>
        新增留言
      </a>
      {message.map((msgItem) => (
        <div className={styles.msgItem} key={msgItem._id}>
          <a className={styles.reply} onClick={() => toRepeat(msgItem.fromUserId)}>
            回复
          </a>
          <div className={styles.info}>
            <div
              className={styles.avatar}
              style={{ backgroundImage: `url(${msgItem.fromUser.avatar})` }}
            />
            <div className={styles.infos}>
              <div className={styles.msgName}>
                <a href={`/site-userInfo/${msgItem.fromUserId}`} target="_blank" rel="noreferrer">
                  {msgItem.fromUser.name}
                </a>
                {msgItem.toUserId && msgItem.fromUserId !== msgItem.toUserId && (
                  <div>
                    {' '}
                    <span className={styles.aite}>@</span>{' '}
                    <a href={`/site-userInfo/${msgItem.toUserId}`} target="_blank" rel="noreferrer">
                      {msgItem.toUser.name}
                    </a>
                  </div>
                )}
                <Popconfirm
                  title="确定删除？"
                  onConfirm={() => onDelete(msgItem._id, msgItem.fromUserId)}
                >
                  <a>
                    <i className="iconfont icondelete" />
                  </a>
                </Popconfirm>
              </div>
              <div className={styles.msgDate}>{formatTime(msgItem.date)}</div>
            </div>
          </div>
          <div
            className={styles.msgContent}
            dangerouslySetInnerHTML={{
              __html: converter.makeHtml(replaceEmoji(msgItem.content) || ''),
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};
