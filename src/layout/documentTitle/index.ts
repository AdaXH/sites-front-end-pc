import { useEffect } from 'react';

export default ({ title }: { title: string }): null => {
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
};
