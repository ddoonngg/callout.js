import * as React from 'react';
import setRef from './setRef';
export default function composeRef<T>(...refs: React.MutableRefObject<T | null>[]) {
  return React.useMemo(() => {
    return (value: T) => {
      refs.forEach((ref) => {
        setRef(ref, value);
      });
    };
  }, [...refs]);
}
