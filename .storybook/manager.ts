import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'Alpha Vite App',
  brandUrl: '/',
  brandImage: '/vite.svg',
  brandTarget: '_self',
});

addons.setConfig({
  theme,
  sidebar: {
    showRoots: false,
  },
});
