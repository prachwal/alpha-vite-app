import type { Preview } from '@storybook/preact';
import '../src/app.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'label', enabled: true },
        ],
      },
    },
  },
  decorators: [
    (Story) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'p-4';
      const story = Story();
      if (typeof story === 'string') {
        wrapper.innerHTML = story;
      } else if (story && typeof story === 'object') {
        wrapper.appendChild(story as Node);
      }
      return wrapper;
    },
  ],
};

export default preview;
