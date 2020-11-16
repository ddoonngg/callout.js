/* eslint-disable max-nested-callbacks */
import * as React from 'react';
import ReactDOM from 'react-dom';
import Portal from '../src/components/Portal';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

describe('<Portal/>', () => {
  describe('container', () => {
    it(`should render to the parent element if 'disabledPortal' is true`, () => {
      const { container } = render(
        <Portal disabledPortal>
          <h1>children</h1>
        </Portal>
      );
      expect(container.firstChild).toMatchSnapshot(`<h1>children</h1>`);
    });
  });
});
