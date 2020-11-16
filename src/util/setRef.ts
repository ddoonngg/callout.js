import * as React from 'react';

export default function setRef<T>(
  ref: React.MutableRefObject<T | null> | null | undefined | ((instance: T | null) => void),
  value: T | null
): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
