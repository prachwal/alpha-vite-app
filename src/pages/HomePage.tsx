import { AppTitle } from "../components/AppTitle";
import { CounterButton } from "../components/CounterButton";
import { ApiTester } from "../components/ApiTester";
import { usePageTranslations } from "../services/i18n";

export function HomePage() {
  const t = usePageTranslations("home");

  return (
    <div className="space-y-8">
      <div className="text-center">
        <AppTitle />
        <p
          className="text-lg text-text-muted"
          style="margin-bottom: var(--spacing-xl)"
        >
          {t("welcome")}
        </p>
        <div className="flex justify-center">
          <CounterButton />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div
          className="bg-bg-surface rounded-lg shadow-md"
          style="padding: var(--spacing-lg)"
        >
          <h2 className="text-2xl font-semibold mb-4 text-text-primary">
            {t("features")}
          </h2>
          <ul className="space-y-3 text-text-muted">
            <li className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {t("featureSSR")}
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {t("featureSignals")}
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {t("featureTailwind")}
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {t("featureResponsive")}
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 text-green-500 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {t("featureTheme")}
            </li>
          </ul>
        </div>

        <div
          className="bg-bg-surface rounded-lg shadow-md"
          style="padding: var(--spacing-lg)"
        >
          <h2
            className="text-2xl font-semibold text-text-primary"
            style="margin-bottom: var(--spacing-lg)"
          >
            {t("apiTesting")}
          </h2>
          <p
            className="text-text-muted"
            style="margin-bottom: var(--spacing-xl)"
          >
            {t("apiDescription")}
          </p>
          <ApiTester />
        </div>
      </div>
    </div>
  );
}
