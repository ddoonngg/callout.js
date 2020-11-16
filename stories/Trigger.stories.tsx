/* eslint-disable @typescript-eslint/consistent-type-assertions */
import * as React from 'react';
import './trigger.css';
import Trigger, { TriggerProps } from '../src/components/Trigger';
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: 'Components/Trigger',
  component: Trigger
} as Meta;

const Template: Story<TriggerProps> = (args) => <Trigger {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  popupAnchorEl: () => document.querySelector('.trigger-btn--basic'),
  defaultOpen: false,
  action: ['click', 'hover', 'focus'],
  popup: (
    <div className="popper__inner">
      <article>
        <h3>Popup</h3>
      </article>
    </div>
  ),
  popupStyle: { maxWidth: 222 },
  enterDelay: 200,
  leaveDelay: 200,
  focusDelay: 200,
  blurDelay: 200,
  onOpen: (e) => console.log('trigger的 onOpen'),
  onClose: (e) => console.log('trigger的 onClose'),
  children: <button className="trigger-btn trigger-btn--basic">Basic Trigger</button>,
  popupAlignConfig: {
    anchorElOffset: [0, 0],
    elOffset: [0, 0],
    margin: 30,
    placement: 'bottom-end'
  }
};
Basic.decorators = [(story) => story()];
export const Uncontrolled = Template.bind({});
Uncontrolled.args = {
  popupAnchorEl: () => document.querySelector('.trigger-btn--uncontrolled'),
  defaultOpen: false,
  action: ['click', 'hover', 'focus'],
  popup: (
    <div className="popper__inner">
      <article>
        <h3>Popup</h3>
      </article>
    </div>
  ),
  popupStyle: { maxWidth: 222 },
  enterDelay: 200,
  leaveDelay: 200,
  focusDelay: 200,
  blurDelay: 200,
  onOpen: (e) => console.log('trigger的 onOpen'),
  onClose: (e) => console.log('trigger的 onClose'),
  children: <button className="trigger-btn trigger-btn--uncontrolled">Uncontrolled Trigger</button>,
  popupAlignConfig: {
    anchorElOffset: [0, 0],
    elOffset: [0, 0],
    margin: 30,
    placement: 'bottom-end'
  }
};

Uncontrolled.decorators = [(story) => story()];
export const Controlled = Template.bind({});
Controlled.args = {
  popupAnchorEl: () => document.querySelector('.trigger-btn--controlled'),
  defaultOpen: false,
  action: ['click', 'hover', 'focus'],
  popup: (
    <div className="popper__inner">
      <article>
        <h3>Popup</h3>
      </article>
    </div>
  ),
  popupStyle: { maxWidth: 222 },
  enterDelay: 200,
  leaveDelay: 200,
  focusDelay: 200,
  blurDelay: 200,
  onOpen: (e) => console.log('trigger的 onOpen'),
  onClose: (e) => console.log('trigger的 onClose'),
  children: <button className="trigger-btn trigger-btn--controlled">Controlled Trigger</button>,
  popupAlignConfig: {
    anchorElOffset: [0, 0],
    elOffset: [0, 0],
    margin: 30,
    placement: 'bottom-end'
  }
};
Controlled.decorators = [(story) => story()];
