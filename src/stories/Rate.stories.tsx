import { Rate } from '../components/form-advanced';

export default {
  title: 'Design System/Advanced Form/Rate',
  component: Rate,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number' },
    onChange: { action: 'onChange' },
    count: { control: 'number' },
    allowHalf: { control: 'boolean' },
    allowClear: { control: 'boolean' },
    disabled: { control: 'boolean' },
    character: { control: 'text' },
    tooltips: { control: 'object' },
    className: { control: 'text' },
  },
};

export const Default = {
  args: {
    value: 3,
    onChange: () => {},
  },
};

export const WithHalfRatings = {
  args: {
    value: 2.5,
    onChange: () => {},
    allowHalf: true,
  },
};

export const CustomCharacter = {
  args: {
    value: 3,
    onChange: () => {},
    character: '♥',
  },
};

export const Disabled = {
  args: {
    value: 3,
    onChange: () => {},
    disabled: true,
  },
};
