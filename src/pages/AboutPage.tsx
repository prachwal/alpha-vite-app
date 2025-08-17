import { usePageTranslations } from "../services/i18n";
import { CheckIcon } from "../components/common/CheckIcon";
import { SectionCard } from "../components/common/SectionCard";

export function AboutPage() {
  const t = usePageTranslations("about");

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1
          className="text-4xl font-bold text-text-primary"
          style="margin-bottom: var(--spacing-md)"
        >
          {t("title")}
        </h1>
        <p
          className="text-lg text-text-muted"
          style="margin-bottom: var(--spacing-xl)"
        >
          {t("description")}
        </p>
      </div>

      <div
        className="grid grid-cols-1 lg:grid-cols-2"
        style="gap: var(--spacing-xl)"
      >
        <SectionCard
          title={typeof t("frontendTech") === "string" ? t("frontendTech") : ""}
        >
          <ul className="space-y-3 text-text-muted">
            <li className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
              {t("featurePreact")}
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
              {t("featureTypeScript")}
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
              {t("featureVite")}
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
              {t("featureVitest")}
            </li>
          </ul>
        </SectionCard>

        <SectionCard
          title={typeof t("backendTech") === "string" ? t("backendTech") : ""}
        >
          <ul className="space-y-3 text-text-muted">
            <li className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
              {t("featureNode")}
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
              {t("featureREST")}
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
              {t("featureConfig")}
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
              {t("featureSecurity")}
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
              {t("featureError")}
            </li>
            <li className="flex items-center">
              <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
              {t("featureDeploy")}
            </li>
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
