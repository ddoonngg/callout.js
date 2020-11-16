import { Offset, direction, Geometry, ElSize, VisibleRect } from './interface';

function getScroll(dir: direction): number {
  if (dir === 'top') {
    const y: number =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    return y;
  } else if (dir === 'left') {
    const x: number =
      window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft;
    return x;
  }
  return 0;
}

function borrow(
  el: HTMLElement,
  options: {
    [key: string]: any;
    [index: number]: any;
  },
  callback: (el: Element) => void
) {
  const old: {
    [key: string]: any;
    [index: number]: any;
  } = {};
  const style: CSSStyleDeclaration = el.style;
  let prop: string;
  for (prop in style) {
    if (options.hasOwnProperty(prop)) {
      old[prop] = style[prop];
      style[prop] = options[prop];
    }
  }
  callback(el);
  for (prop in options) {
    if (options.hasOwnProperty(prop)) {
      style[prop] = old[prop];
    }
  }
}

/**
 * Get el size {width, height}
 * @param el elment you query
 */
export function getSize(el: HTMLElement): ElSize {
  let w = 0;
  let h = 0;

  if (el.offsetHeight === 0) {
    borrow(
      el,
      {
        position: 'absolute',
        display: 'block',
        visibility: 'hidden'
      },
      (el) => {
        const rect = el.getBoundingClientRect();
        w = rect.width;
        h = rect.height;
      }
    );
  } else {
    const rect = el.getBoundingClientRect();
    w = rect.width;
    h = rect.height;
  }

  return {
    width: w,
    height: h
  };
}

export function getElGeo(el: HTMLElement): Geometry {
  const offset = getOffset(el);
  const size = getSize(el);
  return {
    ...offset,
    ...size
  };
}

function getParent(el: HTMLElement): null | HTMLElement {
  const cssPosition = el.style.position;
  if (cssPosition === 'absolute' || cssPosition === 'fixed') {
    return el.offsetParent === null ? null : (el.offsetParent as HTMLElement);
  } else {
    return el.parentElement;
  }
}

function getOffset(el: HTMLElement): Offset {
  // TODO: what if there more than one docuement in one winow, e.g., iframe
  const doc = el.ownerDocument;
  const docEl = doc.documentElement;
  const body = doc.body;
  let x = 0;
  let y = 0;
  if (el.offsetParent === null) {
    borrow(
      el,
      {
        position: 'absolute',
        display: 'block',
        visibility: 'hidden'
      },
      (el) => {
        const rect = el.getBoundingClientRect();
        x = rect.left;
        y = rect.top;
      }
    );
  } else {
    const rect = el.getBoundingClientRect();
    x = rect.left;
    y = rect.top;
  }

  x += getScroll('left');
  y += getScroll('top');

  return {
    left: x,
    top: y
  };
}

export function getCroppedVisibleRect(el: HTMLElement): VisibleRect | null {
  const visibleRect: VisibleRect = {
    top: 0,
    right: Infinity,
    left: 0,
    bottom: Infinity
  };
  let curEl: HTMLElement | null = el;

  while (curEl !== null) {
    if (curEl === null) {
      break;
    }
    // TODO: crop only if the parent element is scrollable
    let { left, top, width, height } = getElGeo(curEl);
    left += el.clientLeft;
    top += el.clientTop;
    visibleRect.top = Math.max(top, visibleRect.top);
    visibleRect.right = Math.min(left + width, visibleRect.right);
    visibleRect.bottom = Math.min(top + height, visibleRect.bottom);
    visibleRect.left = Math.max(left, visibleRect.left);
    // update parent
    if (el === document.documentElement) {
      break;
    }
    curEl = getParent(curEl);
  }
  return visibleRect.left >= 0 &&
    visibleRect.left <= visibleRect.right &&
    visibleRect.top >= 0 &&
    visibleRect.top <= visibleRect.bottom
    ? visibleRect
    : null;
}
