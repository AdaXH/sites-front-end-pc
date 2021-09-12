import React, { useState, useMemo, ChangeEvent } from 'react';
import styles from './styles.less';

interface Props {
  value?: string;
  name: string;
  onChange: Function;
  type: string;
  onEnter?: Function;
}

const Component: React.FC<Props> = ({ value, name, onChange, type = 'text', onEnter }) => {
  const [isFocus, setFoucus] = useState(!!value);
  const nameStyle = useMemo(() => {
    const style: any = {};
    style.transform = `translate3d(${isFocus ? '0px' : '10px'}, ${isFocus ? '-18px' : '0'}, 0)`;
    return style;
  }, [isFocus]);
  const onInsert = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  const onKeyDown = (e: any) => {
    onChange(e?.target?.value);
    if (e?.keyCode === 13) {
      onEnter();
    }
  };
  return (
    <div className={styles.inputItem}>
      {/* <span className={styles.name} style={nameStyle}>
        {name}
      </span> */}
      {/* <div className={styles.inputWrap}> */}
      <input
        onFocus={() => setFoucus(true)}
        onBlur={() => setFoucus(!!value)}
        value={value}
        onKeyDown={(e: any) => onKeyDown(e)}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onInsert(e)}
        type={type}
        placeholder={name}
        // autoComplete="off"
        // autocomplete="new-password"
      />
      {/* </div> */}
    </div>
  );
};

export default Component;
