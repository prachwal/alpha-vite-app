import { useState, useEffect } from 'preact/hooks';
import { usePageTranslations } from '@services/i18n';
import { Card } from '@components/display/Card';
import { Input } from '@components/form/Input';
import { Button } from '@components/form/Button';
import { Badge } from '@components/display/Badge';
import { Container } from '@components/layout/Container';
import { List } from '@components/display/List';
import { Alert } from '@components/feedback/Alert';

interface TranslationEntry {
  key: string;
  value: string;
  category: string;
  language: string;
}

interface TranslationFile {
  [key: string]: string | TranslationFile;
}

export function TranslationBrowserPage() {
  const pageTranslations = usePageTranslations('translationBrowser');
  const commonTranslations = usePageTranslations('common');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'pl'>('en');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [translations, setTranslations] = useState<TranslationEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Import all translation files
  const translationFiles = {
    en: {
      common: () => import('../locales/en/common.json'),
      home: () => import('../locales/en/home.json'),
      about: () => import('../locales/en/about.json'),
      settings: () => import('../locales/en/settings.json'),
      profile: () => import('../locales/en/profile.json'),
      translationBrowser: () => import('../locales/en/translationBrowser.json'),
    },
    pl: {
      common: () => import('../locales/pl/common.json'),
      home: () => import('../locales/pl/home.json'),
      about: () => import('../locales/pl/about.json'),
      settings: () => import('../locales/pl/settings.json'),
      profile: () => import('../locales/pl/profile.json'),
      translationBrowser: () => import('../locales/pl/translationBrowser.json'),
    },
  };

  useEffect(() => {
    loadTranslations();
  }, [selectedLanguage]);

  const loadTranslations = async () => {
    setLoading(true);
    try {
      const allTranslations: TranslationEntry[] = [];

      // Load all translation files for the selected language
      const files = translationFiles[selectedLanguage];

      for (const [category, loader] of Object.entries(files)) {
        try {
          const module = await loader();
          const data = module.default || module;

          // Flatten nested objects
          const flattened = flattenTranslations(data, category);
          allTranslations.push(...flattened);
        } catch (error) {
          console.error(`Error loading ${category} translations:`, error);
        }
      }

      setTranslations(allTranslations);
    } catch (error) {
      console.error('Error loading translations:', error);
    } finally {
      setLoading(false);
    }
  };

  const flattenTranslations = (
    obj: TranslationFile,
    category: string,
    prefix = ''
  ): TranslationEntry[] => {
    const result: TranslationEntry[] = [];

    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'string') {
        result.push({
          key: fullKey,
          value,
          category,
          language: selectedLanguage,
        });
      } else if (typeof value === 'object' && value !== null) {
        result.push(...flattenTranslations(value, category, fullKey));
      }
    }

    return result;
  };

  const filteredTranslations = translations.filter((translation) => {
    const matchesSearch =
      searchTerm === '' ||
      translation.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
      translation.value.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || translation.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    'all',
    'common',
    'home',
    'about',
    'settings',
    'profile',
    'translationBrowser',
  ];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Copied to clipboard:', text);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const exportTranslations = () => {
    const exportData = filteredTranslations.reduce(
      (acc, { key, value }) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translations-${selectedLanguage}-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Container className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {commonTranslations('translationBrowserPage')}
        </h1>
        <p className="text-text-muted">{pageTranslations('description')}</p>
      </div>

      <Card className="mb-4">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder={pageTranslations('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm((e as any).target.value)}
              className="flex-1"
            />

            <select
              value={selectedLanguage}
              onChange={(e) =>
                setSelectedLanguage((e as any).target.value as 'en' | 'pl')
              }
              className="px-3 py-2 border border-border-primary rounded-md bg-bg-surface"
            >
              <option value="en">English</option>
              <option value="pl">Polski</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory((e as any).target.value)}
              className="px-3 py-2 border border-border-primary rounded-md bg-bg-surface"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all'
                    ? pageTranslations('allCategories')
                    : category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={exportTranslations}
              disabled={filteredTranslations.length === 0}
            >
              {pageTranslations('export')}
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              {pageTranslations('clearFilters')}
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {pageTranslations('results', {
              count: filteredTranslations.length,
            })}
          </h2>
          {loading && <Badge>{pageTranslations('loading')}</Badge>}
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-text-muted">{pageTranslations('loading')}</p>
          </div>
        ) : filteredTranslations.length === 0 ? (
          <Alert title={pageTranslations('noResultsTitle')}>
            {pageTranslations('noResultsDescription')}
          </Alert>
        ) : (
          <div className="space-y-3">
            <List>
              {filteredTranslations.map((translation, index) => (
                <div
                  key={`${translation.key}-${translation.language}-${index}`}
                  className="border-b border-border-primary last:border-b-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 px-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-1 text-xs font-medium bg-bg-accent-soft text-text-accent rounded">
                          {translation.category}
                        </span>
                        <code className="text-sm text-text-muted">
                          {translation.key}
                        </code>
                      </div>
                      <p className="text-text-primary">{translation.value}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(translation.key)}
                      >
                        {pageTranslations('key')}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(translation.value)}
                      >
                        {pageTranslations('value')}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </List>
          </div>
        )}
      </Card>
    </Container>
  );
}
