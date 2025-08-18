import { Auth0Button } from '../components/Auth0Button';

export default {
  title: 'Design System/Auth0Button',
  component: Auth0Button,
  tags: ['autodocs'],
  argTypes: {
    className: { control: 'text' },
    children: { control: 'text' },
  },
};

export const Default = {};
export const CustomClass = { args: { className: 'bg-blue-500' } };
export const WithChildren = { args: { children: 'Zaloguj się' } };
