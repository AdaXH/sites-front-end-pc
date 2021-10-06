import React, { ReactNode } from 'react';
import styles from './styles.less';

interface Props {
  mainTitle?: string;
  desc: ReactNode;
  topText?: string;
  topFn?: any;
  leftContent?: ReactNode;
  needMargin?: boolean;
  topHref?: string;
  newWindow?: boolean;
}

export default (props: Props) => {
  const {
    mainTitle,
    desc,
    topText,
    topFn,
    leftContent,
    needMargin,
    topHref,
    newWindow = false,
  } = props;
  return (
    <div className={styles.wrap}>
      {leftContent && <div className={styles.left}>{leftContent}</div>}
      <div className={styles.right} style={{ marginLeft: needMargin && '20px' }}>
        <div className={styles.content}>
          {mainTitle && <h1 className={styles.mainTitle}>{mainTitle}</h1>}
          <p className={styles.dec}>{desc}</p>
        </div>
        {topText && (
          <div className={styles.nextType}>
            <a href={topHref} onClick={topFn} target={newWindow ? '_blank' : ''} rel="noreferrer">
              {topText}
            </a>
            <i className="iconqianjin2 iconfont" />
          </div>
        )}
      </div>
    </div>
  );
};
