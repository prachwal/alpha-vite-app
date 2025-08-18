import { AppTitle } from '../components/AppTitle';

export default {
  title: 'Design System/AppTitle',
  component: AppTitle,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
  },
};

export const Default = {};
export const CustomClass = { args: { className: 'text-red-500' } };
