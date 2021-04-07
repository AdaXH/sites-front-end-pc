import React, { useMemo } from 'react';
import BgList from './bgList';
import Share from './share';
import styles from './styles.less';

export interface AsideProps {
  onClose?: Function;
  data?: {
    bgList: Array<string>;
  };
  onChangeBg?: (bg: string) => void;
}

export default ({ onClose, data, onChangeBg }: AsideProps) => {
  const { bgList } = data;
  const asidesList = useMemo(
    () => [
      {
        title: '背景图',
        component: () => <BgList onChangeBg={onChangeBg} bgList={bgList} />,
        icon: 'iconfont iconbeijingtupian',
      },
      {
        title: '分享',
        component: () => <Share />,
        icon: 'iconfont iconshare',
      },
      {
        title: '更多',
        component: () => 'comming soon......',
        icon: 'iconfont iconmore2',
      },
    ],
    [bgList, onChangeBg],
  );
  return (
    <div onClick={(e) => e.stopPropagation()} className={styles.asideContainer}>
      <div className={styles.effLine} />
      <div className={styles.asideWarp} onClick={(e) => e.stopPropagation()}>
        <aside>
          <div className={styles.close} onClick={() => onClose()}>
            <i className="iconfont iconbaseline-close-px" />
          </div>
          {asidesList.map(({ title, component, icon }) => (
            <div key={title} className={styles.itemAside}>
              <div className={styles.itemTitle}>
                <i className={icon} />
                {title}:
              </div>
              <div className={styles.itemBox}>{component()}</div>
            </div>
          ))}
        </aside>
      </div>
      <div className={styles.wrap} onClick={() => onClose()} />
    </div>
  );
};
