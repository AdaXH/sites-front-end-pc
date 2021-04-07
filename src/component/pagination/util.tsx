import React from 'react';
import { Icon } from 'antd';
import utilStyles from './styles.less';

export function itemRender(
  current: number,
  type: string,
  originalElement: React.ReactElement,
  allPageCunt: number,
): React.ReactElement {
  const MAX_COUNT = 5;
  if (type === 'prev') {
    return (
      <a className={utilStyles.commonDir}>
        <Icon type="left" />
      </a>
    );
  }
  if (type === 'next') {
    return (
      <a className={utilStyles.commonDir}>
        <Icon type="right" />
      </a>
    );
  }
  if (type === 'page' && current > MAX_COUNT && allPageCunt === current) {
    return <a>共{allPageCunt}页</a>;
  }
  return <span className={utilStyles.defaultPag}>{originalElement}</span>;
}
