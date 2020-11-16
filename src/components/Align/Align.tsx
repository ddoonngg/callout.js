import { AlignConfig } from './interface';
import { monitorResize, composeRef, useEnhancedEffect } from '../../util/index';
import React, { useRef, useEffect } from 'react';
import { useSparse } from '../../hooks/index';
import makeAlign from './makeAlign';

export interface AlignProps {
  alignConfig?: AlignConfig;
  children: React.ReactElement;
  disabled?: boolean;
  anchorEl?: HTMLElement | (() => HTMLElement);
  delay?: number;
}

function getAnchorEl(anchorEl: HTMLElement | (() => HTMLElement)): HTMLElement {
  if (typeof anchorEl === 'function') {
    return anchorEl();
  }
  return anchorEl || document.body;
}

export interface AlignRef {
  forceAlign: () => void;
}

interface MonitorRef {
  element?: HTMLElement;
  cancel: () => void;
}

const defaultAlignConfig: AlignConfig = {
  placement: 'bottom-center',
  elOffset: [0, 0],
  anchorElOffset: [0, 0],
  margin: 14
};

const Align = React.forwardRef<AlignRef, AlignProps>((props, ref) => {
  const { alignConfig = defaultAlignConfig, children, disabled, anchorEl, delay = 300 } = props;

  // A ref that we want to align, which always be updated when mounted
  const nodeRef = useRef<HTMLElement>();

  // The nodeRef for the element we want to align
  const elMonitorRef = useRef<MonitorRef>({
    cancel: () => {}
  });
  // The reference element that align to
  const anchorElMonitorRef = useRef<MonitorRef>({
    cancel: () => {}
  });

  // everytime we make sure all atts in forceAlignRef was updated
  const forceAlignRef = useRef<{
    disable?: boolean;
    anchorElNode?: HTMLElement | (() => HTMLElement);
  }>({});
  forceAlignRef.current.disable = disabled;
  forceAlignRef.current.anchorElNode = anchorEl;

  const [_forceAlign, _cancelForceAlign] = useSparse(() => {
    const latestEl = nodeRef.current;
    const { anchorElNode: latestanchorEl } = forceAlignRef.current;
    // in case of the anchorEl is not rendered to the dom, always use callback instead a dom node
    const target = getAnchorEl(latestanchorEl);
    makeAlign(latestEl, target as HTMLElement, alignConfig);
    return true;
  }, delay);

  useEnhancedEffect(() => {
    _forceAlign();
  });

  useEnhancedEffect(() => {
    const anchorElement = getAnchorEl(anchorEl);
    if (elMonitorRef.current.element !== nodeRef.current) {
      elMonitorRef.current.cancel();
      elMonitorRef.current.element = nodeRef.current;
      elMonitorRef.current.cancel = monitorResize(nodeRef.current, () => {
        _forceAlign();
      });
    }
    if (anchorElMonitorRef.current.element !== anchorElement) {
      anchorElMonitorRef.current.cancel();
      anchorElMonitorRef.current.element = anchorElement;
      anchorElMonitorRef.current.cancel = monitorResize(anchorElement, () => {
        _forceAlign();
      });
    }
  });

  // clear side effects
  useEffect(
    () => () => {
      _cancelForceAlign();
      elMonitorRef.current.cancel();
      anchorElMonitorRef.current.cancel();
    },
    []
  );
  let childNode = React.Children.only(children);

  // ============ Ref expose to parent component

  React.useImperativeHandle(ref, () => ({
    forceAlign: () => _forceAlign()
  }));

  if (React.isValidElement(childNode)) {
    childNode = React.cloneElement(childNode, {
      ref: composeRef((childNode as any).ref, nodeRef)
    });
  }

  return childNode;
});

Align.displayName = 'Align';

export default Align;
