import { AlignConfig } from './interface';
import { getElGeo } from './util';
import { getCoreOffsetToDoc, getPinKeyByPlacement, marginToOffset } from './coreAlign';

/**
 * @description A funtion to align element
 *
 * @param {HTMLElement} el  -An element to be aligned ement} anchorEl  A reference object
 * @param {AlignConfig} alignConfig -Align options / config
 *
 * @returns {void}
 */

export default function makeAlign(
  el: HTMLElement,
  anchorEl: HTMLElement,
  alignConfig: AlignConfig
): void {
  const { elOffset, anchorElOffset, placement = 'bottom-center', margin = 14 } = alignConfig;
  const elGeo = getElGeo(el);
  const anchorElGeo = getElGeo(anchorEl);
  const { anchor: anchorPinKey, el: elPinKey } = getPinKeyByPlacement(placement);
  const anchorElCoreOffset = getCoreOffsetToDoc(anchorElGeo, anchorElOffset, anchorPinKey);
  let elCoreOffset = getCoreOffsetToDoc(elGeo, elOffset, elPinKey);
  let elCoreOffsetCropMargin = mergeOffset(elCoreOffset, marginToOffset(placement, margin));
  console.log({ el, anchorEl, alignConfig });
  const elFutureCoreOffset = anchorElCoreOffset;
  setElCssLocation(
    el,
    elFutureCoreOffset[0] - elCoreOffsetCropMargin[0],
    elFutureCoreOffset[1] - elCoreOffsetCropMargin[1]
  );
}

function mergeOffset(offsetA: [number, number], offsetB: [number, number]) {
  return [offsetA[0] + offsetB[0], offsetA[1] + offsetB[1]];
}

function setElCssLocation(el: HTMLElement, left: number, top: number) {
  let originalLeft = parseFloat(window.getComputedStyle(el).left) | 0;
  let originalTop = parseFloat(window.getComputedStyle(el).top) | 0;
  console.log({ originalLeft, originalTop });
  console.log({ left, top });
  el.style.left = originalLeft + left + 'px';
  el.style.top = originalTop + top + 'px';
}
