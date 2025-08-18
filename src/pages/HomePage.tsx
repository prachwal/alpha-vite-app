import { AppTitle } from "@components/AppTitle";
import { CounterButton } from "@components/CounterButton";
import { ApiTester } from "@components/ApiTester";
import { usePageTranslations } from "@services/i18n";
import { CheckIcon } from "@components/legacy/CheckIcon";
import { SectionCard } from "@components/legacy/SectionCard";

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
        <SectionCard
          title={typeof t("features") === "string" ? t("features") : ""}
        >
          <ul className="space-y-3 text-text-muted">
            <li className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
              {t("featureSSR")}
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
              {t("featureSignals")}
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
              {t("featureTailwind")}
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
              {t("featureResponsive")}
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
              {t("featureTheme")}
            </li>
          </ul>
        </SectionCard>

        <SectionCard
          title={typeof t("apiTesting") === "string" ? t("apiTesting") : ""}
        >
          <p
            className="text-text-muted"
            style="margin-bottom: var(--spacing-xl)"
          >
            {t("apiDescription")}
          </p>
          <ApiTester />
        </SectionCard>
      </div>
    </div>
  );
}
