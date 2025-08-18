import { AppTitle } from '@components/AppTitle';
import { ApiTester } from '@components/ApiTester';
import { usePageTranslations } from '@services/i18n';
import { CheckIcon, Card, CardHeader, CardBody } from '@components/display';

export function HomePage() {
  const t = usePageTranslations('home');

  return (
    <div className="space-y-8">
      <div className="text-center">
        <AppTitle />
        <p
          className="text-lg text-text-muted"
          style="margin-bottom: var(--spacing-xl)"
        >
          {t('welcome')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-text-primary">
              {typeof t('features') === 'string' ? t('features') : ''}
            </h3>
          </CardHeader>
          <CardBody>
            <ul className="space-y-3 text-text-muted">
              <li className="flex items-center">
                <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                {t('featureSSR')}
              </li>
              <li className="flex items-center">
                <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                {t('featureSignals')}
              </li>
              <li className="flex items-center">
                <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                {t('featureTailwind')}
              </li>
              <li className="flex items-center">
                <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                {t('featureResponsive')}
              </li>
              <li className="flex items-center">
                <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                {t('featureTheme')}
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-text-primary">
              {typeof t('apiTesting') === 'string' ? t('apiTesting') : ''}
            </h3>
          </CardHeader>
          <CardBody>
            <p
              className="text-text-muted"
              style="margin-bottom: var(--spacing-xl)"
            >
              {t('apiDescription')}
            </p>
            <ApiTester />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
