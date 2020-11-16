import { AlignConfig } from '../Align/interface';
import React, { useRef, useState } from 'react';
import { composeRef, contains } from '../../util';
import Popup from '../Popup';

type Action = 'click' | 'hover' | 'focus';
type OpenAction = 'click' | 'mouseEnter' | 'focus';
type CloseAction = 'click' | 'mouseLeave' | 'blur';

function noop() {}

export interface TriggerProps {
  popup: React.ReactElement;
  popupId?: string | number;
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  open?: boolean;
  defaultOpen?: boolean;
  popupStyle?: React.CSSProperties;
  popupClass?: string;
  popupAlignConfig?: AlignConfig;
  popupAnchorEl: HTMLElement | (() => HTMLElement);
  popupContainer?: HTMLElement | (() => HTMLElement);
  popupDestoryOnClose?: boolean;
  zIndex?: number;
  action?: Array<Action>;
  closeAction?: Array<CloseAction>;
  openAction?: Array<OpenAction>;
  onOpen?: (event) => void;
  onClose?: (event) => void;
  enterDelay?: number | null;
  leaveDelay?: number | null;
  focusDelay?: number | null;
  blurDelay?: number | null;
  interactive?: boolean;
  children: React.ReactElement;
}

function lineTwoEvents(actionEvent, eventHandler) {
  return (event) => {
    if (eventHandler) {
      eventHandler(event);
    }
    actionEvent(event);
  };
}

const Trigger = React.forwardRef<any, TriggerProps>(function Trigger(props, ref) {
  const {
    popup,
    popupId,
    open: openProp,
    defaultOpen = false,
    popupStyle,
    popupClass = 'popup',
    popupAlignConfig = {
      anchorElOffset: { left: 0, top: 0 },
      elOffset: { left: 0, top: 0 },
      margin: 10,
      placement: 'right-start'
    },
    popupAnchorEl,
    popupContainer = () => document.body,
    popupDestoryOnClose = false,
    zIndex = 999,

    action = ['click'],
    openAction = [],
    closeAction = [],
    children,

    enterDelay = 230,
    leaveDelay = 230,
    focusDelay = 230,
    blurDelay = 230,
    interactive: disableInteractive = false,
    onOpen = noop,
    onClose = noop
  } = props;

  // solve controlled and uncontrolled condition
  const { current: openIsControlled } = useRef(openProp !== undefined);
  const [open, setOpen] = useState(defaultOpen);

  const openState = openIsControlled ? openProp : open;
  const setOpenIfUncontrolled = React.useCallback((value) => {
    if (!openIsControlled) {
      setOpen(value);
    }
  }, []);

  const enterTimer = React.useRef(null);
  const leaveTimer = React.useRef(null);

  const syncOpenState = React.useRef<Boolean>(openState);

  React.useEffect(() => {
    syncOpenState.current = openState;
  }, [openState]);

  const popupRef = React.useRef(null);
  const nodeRef = React.useRef(null);

  const mouseEnterToOpen =
    action.indexOf('hover') !== -1 || openAction.indexOf('mouseEnter') !== -1;
  const mouseLeaveToClose =
    action.indexOf('hover') !== -1 || closeAction.indexOf('mouseLeave') !== -1;

  const clickToOpen = action.indexOf('click') !== -1 || openAction.indexOf('click') !== -1;
  const clickToClose = action.indexOf('click') !== -1 || closeAction.indexOf('click') !== -1;

  const focusToOpen = action.indexOf('focus') !== -1 || openAction.indexOf('focus') !== -1;
  const blurToClose = action.indexOf('focus') !== -1 || closeAction.indexOf('blur') !== -1;

  const handleOpen = (event) => {
    onOpen(event);
    setOpenIfUncontrolled(true);
  };

  const handleClose = (event) => {
    onClose(event);
    setOpenIfUncontrolled(false);
  };

  const handleEnter = (event) => {
    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    if (enterDelay !== null) {
      enterTimer.current = window.setTimeout(() => {
        handleOpen(event);
      }, enterDelay);
    } else {
      handleOpen(event);
    }
  };

  const hanldeLeave = (event) => {
    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    if (leaveDelay !== null) {
      leaveTimer.current = window.setTimeout(() => {
        handleClose(event);
      }, leaveDelay);
    } else {
      handleClose(event);
    }
  };

  const handleClick = (event) => {
    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
    if (!openState) {
      onOpen(event);
    } else {
      onClose(event);
    }
    setOpenIfUncontrolled(!openState);
  };

  const handleDocumentClick = (event) => {
    if (syncOpenState.current) {
      const { target } = event;
      const rootDom = nodeRef.current;
      const popupInnerDom = popupRef.current.getPopupInnerDomNode();
      if (!contains(rootDom, target) && !contains(popupInnerDom, target)) {
        clearTimeout(enterTimer.current);
        clearTimeout(leaveTimer.current);
        handleClose(event);
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  React.useEffect(() => {
    return () => {
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
    };
  }, []);

  const handleMouseEnter = handleEnter;
  const handleMouseLeave = hanldeLeave;
  const handleMouseClick = handleClick;

  const handleFocus = (event) => {
    handleEnter(event);
  };

  const hanldePopupMouseEnter = (event) => {
    clearTimeout(enterTimer.current);
    clearTimeout(leaveTimer.current);
  };

  const handlePopupMouseLeave = handleMouseLeave;

  const handleBlur = hanldeLeave;

  const childrenProps = { ...children.props };
  const popupListenerWrapper: any = {};

  if (mouseEnterToOpen) {
    childrenProps.onMouseEnter = lineTwoEvents(handleMouseEnter, childrenProps.onMouseEnter);
    if (!disableInteractive) {
      popupListenerWrapper.onMouseEnter = hanldePopupMouseEnter;
    }
  }

  if (mouseLeaveToClose) {
    childrenProps.onMouseLeave = lineTwoEvents(handleMouseLeave, childrenProps.onMouseLeave);
    if (!disableInteractive) {
      popupListenerWrapper.onMouseLeave = handlePopupMouseLeave;
    }
  }

  if (focusToOpen) {
    childrenProps.onFocus = lineTwoEvents(handleFocus, childrenProps.onFocus);
    if (!disableInteractive) {
      popupListenerWrapper.onFocus = handleFocus;
    }
  }

  if (blurToClose) {
    childrenProps.onBlur = lineTwoEvents(handleBlur, childrenProps.onBlur);
    if (!disableInteractive) {
      popupListenerWrapper.onBlur = handleBlur;
    }
  }

  if (clickToClose && clickToOpen) {
    childrenProps.onClick = lineTwoEvents(handleMouseClick, childrenProps.onClick);
  }

  const handleNodeRef = composeRef(nodeRef, (children as any).ref);

  return (
    <React.Fragment>
      {React.cloneElement(children, { ...childrenProps, ref: handleNodeRef })}
      <Popup
        id={popupId}
        ref={popupRef}
        open={openState}
        alignConfig={popupAlignConfig}
        anchorEl={popupAnchorEl}
        container={popupContainer}
        keepMounted={!popupDestoryOnClose}
        className={popupClass}
        style={{ ...popupStyle, position: 'absolute' }}
        zIndex={zIndex}
        {...popupListenerWrapper}
      >
        {popup}
      </Popup>
    </React.Fragment>
  );
});

export default Trigger;
