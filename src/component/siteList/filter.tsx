import React from 'react';
import { FILTER_TYPES, SORTER_TYPE } from './constant';
import styles from './styles.less';

interface SortType {
  filterType: string;
  sortType?: string;
}

export const Filter: React.FC<{
  value: SortType;
  setFilter: (arg: SortType) => void;
  filterType?: string;
}> = ({ filterType, setFilter }) => {
  return (
    <div className={styles.con}>
      <i className="iconfont iconuser-filter" />
      <div className={styles.filter}>
        {FILTER_TYPES.map(({ code, text, icon }) => (
          //   <div
          //     data-current={value.type === code}
          //     className={styles.filterItem}
          //     key={code}
          //     onClick={() => setFilter({type: code, sortType: })}
          //   >
          //     <i className={icon} />
          //     <span>{text}</span>
          //   </div>
          <Item icon={icon} text={text} code={code} setFilter={setFilter} filterType={filterType} />
        ))}
      </div>
    </div>
  );
};

interface ItemProps extends SortType {
  icon?: string;
  text: string;
  code?: string;
  setFilter: (arg: SortType) => void;
  filterType: string;
}

const Item: React.FC<ItemProps> = ({ filterType, icon, text, code, setFilter }) => {
  return (
    <div
      data-current={filterType === code}
      className={styles.filterItem}
      key={code}
      onClick={() => setFilter({ filterType: code })}
    >
      <i className={icon} />
      <span>{text}</span>
    </div>
  );
};
