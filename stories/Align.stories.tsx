import * as React from 'react';
import Align, { AlignProps, AlignConfig } from '../src/components/Align';
import { Story } from '@storybook/react/types-6-0';
import './align.css';

export default {
  title: 'Components/Align',
  components: Align
};

const Template: Story<AlignProps> = (args) => <Align {...args} />;

export const Basic = Template.bind({});
export const MonitorResize = Template.bind({});

const defaultAlignConfig: AlignConfig = {
  placement: 'right-start',
  elOffset: [0, 0],
  anchorElOffset: [0, 0],
  margin: 14
};

Basic.args = {
  alignConfig: defaultAlignConfig,
  children: <div className="source">source-1</div>,
  anchorEl: () => document.querySelector('.anchor-el--basic'),
  delay: 100
};

Basic.decorators = [
  (story) => (
    <div>
      <div className="anchor-el anchor-el--basic">anchor-basic</div>
      {story()}
    </div>
  )
];

MonitorResize.args = {
  alignConfig: defaultAlignConfig,
  children: <div className="source">source-2</div>,
  anchorEl: () => document.querySelector('.anchor-el--resize'),
  delay: 100
};

MonitorResize.decorators = [
  (story) => (
    <div>
      <h3>Resize the window to see the source element keep adjust itself</h3>
      <div className="anchor-el anchor-el--resize">anchor-resize</div>
      {story()}
    </div>
  )
];
