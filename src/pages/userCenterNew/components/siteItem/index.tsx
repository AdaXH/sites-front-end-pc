import React from 'react';
import { MAP_SITE_TYPE } from '@/utils/constant';

import styles from './styles.less';

type Site = Partial<SiteModel & { userId: string }>;

interface Props {
  data: Site;
  renderOperation: (data: Site) => void;
  history?: History;
}

export const SiteItem: React.FC<Props> = ({ data, renderOperation, history }) => {
  const { siteName, siteType, siteLink, _id: siteId, siteDesc } = data;
  return (
    <div className={styles.item}>
      <div className={styles.prefix} />
      <div className={styles.container}>
        <div className={styles.name}>
          「<span>{siteName}</span>」
        </div>
        <div className={styles.operation}>
          <a className={styles.tag} onClick={() => history.push(`/${siteType}`)}>
            {MAP_SITE_TYPE[siteType]}
          </a>
          <a
            rel="noreferrer"
            onClick={() => window.open(`/site-info?siteId=${siteId}&siteType=${siteType}`)}
          >
            详情
          </a>
          <a href={siteLink} className={styles.link} target="_blank" rel="noreferrer">
            源站直达
            <i className="iconfont iconlink" />
          </a>
          {renderOperation(data)}
        </div>
        <div className={styles.summary}>{siteDesc}</div>
      </div>
    </div>
  );
};
