import { CounterButton } from '../components/CounterButton';

export default {
  title: 'Design System/CounterButton',
  component: CounterButton,
  tags: ['autodocs'],
  argTypes: {
    initial: { control: 'number' },
    className: { control: 'text' },
  },
};

export const Default = {};
export const WithInitial = { args: { initial: 5 } };
export const CustomClass = { args: { className: 'bg-green-500' } };
