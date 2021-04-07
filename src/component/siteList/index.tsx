import React, { useCallback } from 'react';
import Content from '@/layout/content';
// import Component from '@/common/component';
import { formatTime } from '@/utils/functions';
import { forceHot } from './service';
import Page from '../pagination';
import { Pagenation } from '../pagination';
// import { randomColor } from './util';
import styles from './styles.less';

interface PageProps {
  history: any;
  title?: string;
  data?: Array<SiteModel>;
  pagination?: Pagenation;
}

export default ({ history, title, data, pagination }: PageProps) => {
  const {
    location: { pathname },
    push,
  } = history;
  console.log('Content', Content);
  const onNew = () => {
    push('/submit-site?siteType=' + pathname.slice(1));
  };
  const turn2Link = useCallback(async (e, { siteLink, siteId, siteType }) => {
    e.stopPropagation();
    window.open(siteLink);
    await forceHot({ siteId, siteType });
  }, []);
  return (
    <Content title={title}>
      {data.length === 0 ? (
        <div className={styles.info}>
          该分类还没有站点，赶快<a onClick={onNew}>提交</a>，成为第一个叭~
        </div>
      ) : (
        <div className={styles.listCon}>
          <div className={styles.list}>
            {data.map((item) => {
              return (
                <div
                  className={styles.item}
                  key={item._id}
                  onClick={() => {
                    window.open(
                      `/site-info?siteId=${item._id}&siteType=${
                        item.siteType || pathname.replace(/\//, '')
                      }`,
                    );
                  }}
                >
                  <div className={styles.top}>
                    <div className={styles.imgBox}>
                      <div
                        className={styles.img}
                        style={{
                          background: `url(${item.siteIcon}) no-repeat`,
                        }}
                      />
                    </div>
                    <div className={styles.siteName}>
                      <span className={styles.mainName}>{item.siteName}</span>
                      <div className={styles.siteOpe}>
                        <a onClick={(e) => turn2Link(e, item)}>
                          链接直达
                          <i className="iconfont iconlink" />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className={styles.siteDesc}>{item.siteDesc}</div>
                  <div className={styles.date}>{formatTime(item.submitDate)}</div>
                </div>
              );
            })}
          </div>
          {pagination && <Page pagination={pagination} />}
        </div>
      )}
    </Content>
  );
};
