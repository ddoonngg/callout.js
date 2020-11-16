export interface Offset {
  top: number;
  left: number;
}

export interface Geometry {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface AlignConfig {
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom-center'
    | 'left-end'
    | 'left-start'
    | 'left-center'
    | 'right-end'
    | 'right-start'
    | 'right-center'
    | 'top-end'
    | 'top-start'
    | 'top-center';
  elOffset?: [number, number];
  anchorElOffset?: [number, number];
  margin?: number;
}

export interface ElSize {
  width: number;
  height: number;
}

export type direction = 'top' | 'right' | 'bottom' | 'left';

export interface VisibleRect {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
