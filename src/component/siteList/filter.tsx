import React, { useCallback, useMemo } from 'react';
import { FILTER_TYPES } from './constant';
import classnames from 'classnames';

// const { code } = FILTER_TYPES[0];

import styles from './styles.less';

export interface SortType {
  filterType: string;
  sortType?: string;
}

export const Filter: React.FC<{
  filterType?: SortType;
  changeFilterQuery: (arg: SortType) => void;
}> = ({ changeFilterQuery, filterType }) => {
  if (!filterType) return null;
  const { sortType } = filterType;
  const isUp = useMemo(() => sortType === 'up', [sortType]);
  const disabledSort = useMemo(() => filterType.filterType === 'random', [filterType]);
  const onChangeSortType = useCallback(() => {
    if (disabledSort) return;
    changeFilterQuery({
      ...filterType,
      sortType: isUp ? 'down' : 'up',
    });
  }, [filterType, isUp, disabledSort]);
  const onChangeFilter = useCallback(
    (arg) => {
      changeFilterQuery({
        ...filterType,
        ...arg,
      });
    },
    [filterType],
  );
  return (
    <div className={styles.con}>
      <div className={styles.filter}>
        {FILTER_TYPES.map(({ code, text, icon }) => (
          <Item
            icon={icon}
            text={text}
            code={code}
            key={code}
            filterType={filterType.filterType}
            onChangeFilter={onChangeFilter}
          />
        ))}
        <div
          onClick={onChangeSortType}
          className={classnames({
            [styles.sort]: true,
            [styles.downSort]: !isUp,
            [styles.disabled]: disabledSort,
          })}
        >
          <span />
          <span />
        </div>
      </div>
    </div>
  );
};

interface ItemProps extends SortType {
  icon?: string;
  text: string;
  code?: string;
  onChangeFilter: (arg: SortType) => void;
  filterType: string;
}

const Item: React.FC<ItemProps> = ({ filterType, icon, text, code, onChangeFilter }) => {
  return (
    <div
      data-current={filterType === code}
      className={styles.filterItem}
      key={code}
      onClick={() => onChangeFilter({ filterType: code })}
    >
      <i className={icon} />
      <span>{text}</span>
    </div>
  );
};
