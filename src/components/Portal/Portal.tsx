import * as React from 'react';
import ReactDOM from 'react-dom';

type Container = HTMLElement | (() => HTMLElement);

function getContainer(contianer: Container): HTMLElement {
  if (typeof contianer === 'function') {
    return contianer();
  }
  return contianer;
}

interface PortalProps {
  children: React.ReactNode;
  container?: Container;
  disabledPortal?: boolean;
}

const Portal: React.FunctionComponent<PortalProps> = (props) => {
  const { container, children, disabledPortal = false } = props;
  const [mountNode, setMountNode] = React.useState(null);

  React.useEffect(() => {
    if (!disabledPortal) {
      setMountNode(getContainer(container) || document.body);
    }
  }, [disabledPortal, container]);

  if (disabledPortal) {
    if (React.isValidElement(children)) {
      return React.cloneElement(children);
    }
  }
  return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;
};

Portal.displayName = 'Portal';

export default Portal;
