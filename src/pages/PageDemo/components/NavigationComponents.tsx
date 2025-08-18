import { useState } from 'preact/hooks';
import { Tabs } from '../../../components/navigation/Tabs/Tabs';
import { Breadcrumb } from '../../../components/navigation/Breadcrumb/Breadcrumb';
import { Pagination } from '../../../components/navigation/Pagination/Pagination';

export function NavigationComponents() {
  const [activeTab, setActiveTab] = useState('tab1');
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold border-b pb-2">Komponenty Nawigacji</h2>

      <div>
        <h3 className="text-lg font-semibold mb-3">
          Breadcrumb - Nawigacja hierarchiczna
        </h3>
        <Breadcrumb
          items={[
            { label: 'Strona główna', href: '/' },
            { label: 'Produkty', href: '/products' },
            { label: 'Kategoria', href: '/products/category' },
            { label: 'Aktualny produkt' },
          ]}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Tabs - Zakładki</h3>
        <Tabs
          tabs={[
            { id: 'tab1', label: 'Przegląd' },
            { id: 'tab2', label: 'Szczegóły' },
            { id: 'tab3', label: 'Ustawienia' },
            { id: 'tab4', label: 'Historia', disabled: true },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="underline"
          size="md"
        />
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded">
          {activeTab === 'tab1' && <div>Zawartość zakładki 1 - Przegląd</div>}
          {activeTab === 'tab2' && <div>Zawartość zakładki 2 - Szczegóły</div>}
          {activeTab === 'tab3' && <div>Zawartość zakładki 3 - Ustawienia</div>}
          {activeTab === 'tab4' && <div>Zawartość zakładki 4 - Historia</div>}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Pagination - Paginacja</h3>
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(100 / 10)}
            onPageChange={(page) => setCurrentPage(page)}
            showFirstLast
            showPrevNext
          />
        </div>
      </div>
    </section>
  );
}
