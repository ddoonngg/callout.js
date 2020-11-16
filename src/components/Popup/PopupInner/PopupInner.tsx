import React from 'react';
import { AlignConfig } from '../../Align/interface';
import Align from '../../Align';
import { AlignRef } from '@/components/Align/Align';

interface PopupInnerProps {
  id?: string;
  visible?: boolean;

  alignConfig?: AlignConfig;
  anchorEl?: HTMLElement | (() => HTMLElement);

  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  zIndex?: number;

  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
  onTouchStart?: React.TouchEventHandler<HTMLDivElement>;
}

export interface PopupInnerRef {
  getPopupInnerDomNode: () => HTMLDivElement;
}

const PopupInner = React.forwardRef<PopupInnerRef, PopupInnerProps>((props, ref) => {
  const {
    id,
    visible,
    alignConfig,
    anchorEl,
    children,
    className,
    style,
    zIndex,
    onMouseLeave,
    onTouchStart,
    ...others
  } = props;

  const alignDelay = 200;
  const alignRef = React.useRef<AlignRef>();
  const nodeRef = React.useRef<HTMLDivElement>();

  React.useImperativeHandle(ref, () => ({
    getPopupInnerDomNode: () => {
      return nodeRef.current;
    }
  }));

  const mergedStyle: React.CSSProperties = {
    zIndex,
    display: visible ? null : 'none',
    ...style
  };
  let childNode = children;
  // 如果 不止有一个node的话，就打包成一个node节点
  if (React.Children.count(children) > 1) {
    childNode = <div className={`content`}>{children}</div>;
  }
  let alignDisabled = false;
  return (
    <Align
      ref={alignRef}
      key="popup"
      alignConfig={alignConfig}
      anchorEl={anchorEl}
      delay={alignDelay}
      disabled={alignDisabled}
    >
      <div
        ref={nodeRef}
        className={className}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        style={{
          ...mergedStyle
        }}
        {...others}
      >
        {childNode}
      </div>
    </Align>
  );
});

PopupInner.displayName = 'PopupInner';
export default PopupInner;
