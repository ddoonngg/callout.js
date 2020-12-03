/**
 *
 * @param {Element} element the element to be observed for the resizing
 * @param {Function} callback the callback that will be fired when the element's change
 * @returns {Function} a cancel function that cancel the monitor of first argument (element)
 */

import ResizeObserver from 'resize-observer-polyfill';

export default function monitorResize(element: Element, callback: Function) {
  let oldWidth: number = null;
  let oldHeight: number = null;
  function onResize([{ target }]: ResizeObserverEntry[], observer: ResizeObserver) {
    if (!document.documentElement.contains(target)) {
      return;
    }
    const { width, height } = element.getBoundingClientRect();
    const floorWidth = Math.floor(width);
    const floorHeight = Math.floor(height);
    if (oldWidth !== floorWidth || oldHeight !== floorHeight) {
      Promise.resolve().then(() => {
        callback({ width: floorWidth, height: floorHeight });
      });
    }

    oldWidth = floorWidth;
    oldHeight = floorHeight;
  }
  const resizeObserver = new ResizeObserver(onResize);
  if (element) {
    resizeObserver.observe(element);
  }
  return () => {
    // a callback that cancel unobserable element
    resizeObserver.disconnect();
  };
}
