import { getPinKeyByPlacement } from '../src/components/Align/coreAlign';

describe(`test coreAlign func`, () => {
  it(`getPinKeyByPlacement: translate 'placement' to pinKey for both anchor and el (source dom element),
      axis -> {t:top, r:right, l:left, b:bottom}
      axisOffset -> {s:start, c:center, e:end}`, () => {
    expect(getPinKeyByPlacement('top-start')).toEqual({ anchor: 'ts', el: 'bs' });
    expect(getPinKeyByPlacement('top-center')).toEqual({ anchor: 'tc', el: 'bc' });
    expect(getPinKeyByPlacement('top-end')).toEqual({ anchor: 'te', el: 'be' });

    expect(getPinKeyByPlacement('right-start')).toEqual({ anchor: 'rs', el: 'ls' });
    expect(getPinKeyByPlacement('right-center')).toEqual({ anchor: 'rc', el: 'lc' });
    expect(getPinKeyByPlacement('right-end')).toEqual({ anchor: 're', el: 'le' });

    expect(getPinKeyByPlacement('bottom-start')).toEqual({ anchor: 'bs', el: 'ts' });
    expect(getPinKeyByPlacement('bottom-center')).toEqual({ anchor: 'bc', el: 'tc' });
    expect(getPinKeyByPlacement('bottom-end')).toEqual({ anchor: 'be', el: 'te' });

    expect(getPinKeyByPlacement('left-start')).toEqual({ anchor: 'ls', el: 'rs' });
    expect(getPinKeyByPlacement('left-center')).toEqual({ anchor: 'lc', el: 'rc' });
    expect(getPinKeyByPlacement('left-end')).toEqual({ anchor: 'le', el: 're' });
  });
});
