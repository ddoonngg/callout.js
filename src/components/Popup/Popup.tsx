import React, { useRef } from 'react';
import Portal from '../Portal';
import { AlignConfig } from '../Align/interface';
import PopupInner, { PopupInnerRef } from './PopupInner';

interface PopupProps {
  open?: boolean;
  id?: string;
  alignConfig?: AlignConfig;
  anchorEl: HTMLElement | (() => HTMLElement);
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  zIndex?: number;
  keepMounted?: boolean;
  container?: () => HTMLElement | HTMLElement;
  disabledPortal?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
  onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
}
const Popup = React.forwardRef<any, PopupProps>(function Popup(props, ref) {
  const { container, disabledPortal = false, keepMounted = true, open, ...clonedProps } = props;
  const popupInnerRef = useRef<PopupInnerRef>();

  React.useImperativeHandle(ref, () => ({
    getPopupInnerDomNode: () => {
      return popupInnerRef.current?.getPopupInnerDomNode();
    }
  }));

  if (!open && !keepMounted) {
    return null;
  }

  return (
    <Portal disabledPortal={disabledPortal} container={container}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%'
        }}
      >
        <div>
          <PopupInner ref={popupInnerRef} visible={open} {...clonedProps}></PopupInner>
        </div>
      </div>
    </Portal>
  );
});

export default Popup;
