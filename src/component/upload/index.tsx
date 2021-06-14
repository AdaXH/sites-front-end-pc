import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  createRef,
  useEffect,
  useCallback,
} from 'react';
import { Button } from 'antd';
import Notification from '@/component/Notification';

import styles from './styles.less';

interface UplodaProps {
  value?: {
    src: string;
  };
  text?: string;
  hiddenPreview?: boolean;
  setAvatar?: (arg: string) => void;
}

export default forwardRef(
  ({ value: src, text = '', hiddenPreview, setAvatar }: UplodaProps, ref) => {
    const [value, setVal] = useState<string>();
    const [fileName, setName] = useState<string>();
    useEffect(() => {
      if (src) {
        setVal(src.src);
        setName(src.src);
      }
    }, [src]);
    const onChange = useCallback((e) => {
      const file = e.target.files[0];
      const { name } = file;
      if (!/image/.test(file.type)) {
        Notification.fail({ msg: '不支持的图片类型' });
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (res) => {
        if (res.target.result) {
          setVal(String(res.target.result));
          if (setAvatar) {
            setAvatar(String(res.target.result));
          }
          setName(name);
        }
      };
    }, []);
    useImperativeHandle(ref, () => ({
      getValue: () => ({
        value,
        fileName,
        oldVal: src,
      }),
    }));
    const inputRef: React.LegacyRef<HTMLInputElement> = createRef();
    const onStart = useCallback(() => {
      inputRef.current.click();
    }, [inputRef]);
    return (
      <div className={styles.upload}>
        <input ref={inputRef} onChange={onChange} type="file" alt="" />
        {!hiddenPreview && <img src={value} className={styles.img} alt="" />}
        <Button type="primary" onClick={onStart} className={styles.viewUpload}>
          上传{text}
        </Button>
      </div>
    );
  },
);
