import { Geometry } from './interface';

enum AxisOffset {
  START = 'start',
  CENTER = 'center',
  END = 'end'
}

enum Axis {
  TOP = 'top',
  RIGHT = 'right',
  LEFT = 'left',
  BOTTOM = 'bottom'
}

function getSymmetry(str) {
  switch (str) {
    case Axis.BOTTOM:
      return Axis.TOP;
    case Axis.TOP:
      return Axis.BOTTOM;
    case Axis.LEFT:
      return Axis.RIGHT;
    case Axis.RIGHT:
      return Axis.LEFT;
    case AxisOffset.CENTER:
      return AxisOffset.CENTER;
    case AxisOffset.START:
      return AxisOffset.END;
    case AxisOffset.END:
      return AxisOffset.START;
    default:
      return '';
  }
}

export function getPinKeyByPlacement(placement: string) {
  const [axis, axisAttach] = placement.split('-');
  return {
    anchor: axis[0].toLowerCase() + axisAttach[0].toLowerCase(),
    el: getSymmetry(axis)[0].toLowerCase() + axisAttach[0].toLowerCase()
  };
}

export const placementPinMap: { [key: string]: [number, number] } = {
  ts: [-1, 1],
  tc: [0, 1],
  te: [1, 1],
  rs: [1, 1],
  rc: [1, 0],
  re: [1, -1],
  be: [1, -1],
  bc: [0, -1],
  bs: [-1, -1],
  le: [-1, -1],
  lc: [-1, 0],
  ls: [-1, 1],
  cc: [0, 0]
};

export function scaleOffsetFromCenter(
  width: number,
  height: number,
  coord: [number, number]
): [number, number] {
  return [(coord[0] * width) / 2, -(coord[1] * height) / 2];
}

export function marginToOffset(placement: string, margin: number): [number, number] {
  let x = 0;
  let y = 0;
  const [mainAxis, _] = placement.split('-');
  switch (mainAxis) {
    case 'left':
      x -= margin;
      break;
    case 'right':
      x += margin;
      break;
    case 'top':
      y += margin;
      break;
    case 'bottom':
      y -= margin;
      break;
    default:
      y -= margin;
      break;
  }

  return [x, y];
}

export function getCoreOffsetToDoc(
  geo: Geometry,
  presetOffset: [number, number],
  placementPinKey: string
): [number, number] {
  const { left: x, top: y, width, height } = geo;
  const [x0, y0] = presetOffset;
  const placementPin = placementPinMap[placementPinKey];
  const [x1, y1] = scaleOffsetFromCenter(width, height, placementPin);
  const newX = x + x0 + x1 + width / 2;
  const newY = y + y0 + y1 + height / 2;
  return [newX, newY];
}
