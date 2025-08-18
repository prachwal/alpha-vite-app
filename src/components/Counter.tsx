import { signal } from '@preact/signals';
import { t } from '@services/i18n';

export const count = signal(0);
export const appName = signal(
  import.meta.env.VITE_APP_NAME || t('appName', 'Alpha Vite App')
);
