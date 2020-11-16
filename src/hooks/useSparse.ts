import { useRef } from 'react';

export default function useSparse(callback: () => boolean, wait: number) {
  const calledRef = useRef<boolean>(false);
  const timerDelay = useRef<number>(null);
  const cancelTrigger = () => {
    window.clearTimeout(timerDelay.current);
  };
  const trigger = () => {
    if (!calledRef.current) {
      if (callback() === false) {
        return;
      }
      calledRef.current = true;
      cancelTrigger();
      timerDelay.current = window.setTimeout(() => {
        calledRef.current = false;
      }, wait);
    } else {
      cancelTrigger();
      timerDelay.current = window.setTimeout(() => {
        calledRef.current = false;
        trigger();
      }, wait);
    }
  };
  return [
    trigger,
    () => {
      calledRef.current = false;
      cancelTrigger();
    }
  ];
}
