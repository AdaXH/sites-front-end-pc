import React, { useMemo, ReactNode, useEffect, memo } from 'react';
import { formatTime, sliceNumber, stringify } from '@/utils/functions';
import { Pagenation } from '../pagination';
import { Filter, SortType } from './filter';
import styles from './styles.less';
import classNames from 'classnames';

interface PageProps {
  history: any;
  title?: string;
  data?: Array<SiteModel>;
  pagination?: Pagenation;
  changeFilterQuery?: (arg: SortType) => void;
  filterType?: SortType;
  topContent?: ReactNode;
  viewDetail?: (arg: Record<string, any>) => void;
  extraTitle?: ReactNode;
  extraDesc?: ReactNode;
  extracFn?: any;
}

export default memo(
  ({
    history,
    // title,
    // topContent,
    data,
    pagination,
    changeFilterQuery,
    filterType,
    extraTitle,
    extraDesc,
    extracFn,
  }: PageProps) => {
    const {
      location: { pathname },
      push,
    } = history;
    const onNew = () => {
      push('/submit-site?siteType=' + pathname.slice(1));
    };

    const displayStyle = useMemo(
      () => ({
        display: data.length === 0 ? 'none' : 'flex',
      }),
      [data.length],
    );
    const { onChange, current, total } = pagination || {};
    const goUserInfo = (userId) => {
      if (userId === 'qucikSubmitUser') return;
      push(`/site-userInfo?userId=${userId}`);
    };
    useEffect(() => {
      function listenScoll() {
        if (!data.length || data.length === total || total === 1 || !total) return;
        const scrollTop = document.scrollingElement.scrollTop;
        const scrollHeight = document.scrollingElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        if (scrollTop + clientHeight === scrollHeight) {
          onChange(current + 1);
        }
      }
      window.addEventListener('scroll', listenScoll);
      return () => window.removeEventListener('scroll', listenScoll);
    }, [current, total, data.length]);
    return (
      <>
        {data.length === 0 && (
          <div className={styles.info}>
            该分类还没有站点，赶快
            <a data-line onClick={onNew}>
              提交
            </a>
            ，成为第一个叭~
          </div>
        )}
        {pagination && (
          <span style={displayStyle} className={styles.filterWrap}>
            <Filter filterType={filterType} changeFilterQuery={changeFilterQuery} />
          </span>
        )}

        <div className={styles.list}>
          {data.map((item, index) => {
            return (
              <div
                className={classNames(styles.item, { [styles.odd]: (index + 1) % 2 === 0 })}
                key={item._id}
              >
                <div className={styles.siteInfo}>
                  <div className={styles.siteImg}>
                    <div className={styles.siteNo}>
                      <span>number.</span>
                      <span>{sliceNumber(index + 1)}</span>
                    </div>
                    <div className={styles.imgWrap}>
                      <div
                        className={styles.img}
                        style={{ backgroundImage: `url(${item.siteImgs?.[0]?.src})` }}
                      ></div>
                    </div>
                  </div>
                  <div className={styles.siteInfoText}>
                    <div className={styles.basic}>
                      <h1>{item.siteName}</h1>
                      <p>{item.siteDesc}</p>
                    </div>
                    <div className={styles.basicBottom}>
                      <h1>关于</h1>
                      <p>
                        于{formatTime(item.submitDate)}提交，热度：{item.hot}.
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.siteOperation}>
                  <div className={styles.link}>
                    <h1>
                      <a
                        onClick={() =>
                          push(
                            `/site-info?${stringify({
                              siteType: item.siteType,
                              siteId: item._id,
                            })}`,
                          )
                        }
                      >
                        Link
                        <i className="iconqianjin iconfont" />
                      </a>
                    </h1>
                    <p>点击查看网站详情</p>
                  </div>
                  <div className={styles.user} onClick={() => goUserInfo(item.userId)}>
                    <h1>
                      <a>
                        User
                        <i className="iconqianjin iconfont" />
                      </a>
                    </h1>
                    <p>
                      {item.userId !== 'qucikSubmitUser'
                        ? '点击查看站长信息'
                        : '网站类型为快速提交，没有站长信息'}
                    </p>
                  </div>
                  {extraTitle && (
                    <div className={styles.user} onClick={() => extracFn(item._id, item.siteType)}>
                      <h1>
                        <a>
                          {extraTitle}
                          <i className="iconqianjin iconfont" />
                        </a>
                      </h1>
                      <p>{extraDesc}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  },
  (pre, next) => {
    if ('extraTitle' in next) return false;
    if (next.pagination?.total === 1 || !next.pagination?.total) return true;
    return false;
  },
);
