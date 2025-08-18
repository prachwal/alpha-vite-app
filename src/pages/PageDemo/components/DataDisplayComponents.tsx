import { useState } from "preact/hooks";
import {
  List,
  Badge,
  Avatar,
  Tag,
  Statistic,
  Card,
  CardHeader,
  CardBody,
  Table,
} from "../../../components/display";

export function DataDisplayComponents() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const allTableData = [
    {
      id: 1,
      name: "Jan Kowalski",
      age: 28,
      city: "Warszawa",
      status: "Aktywny",
    },
    {
      id: 2,
      name: "Anna Nowak",
      age: 32,
      city: "Kraków",
      status: "Nieaktywny",
    },
    {
      id: 3,
      name: "Piotr Wiśniewski",
      age: 25,
      city: "Gdańsk",
      status: "Aktywny",
    },
    {
      id: 4,
      name: "Maria Lewandowska",
      age: 29,
      city: "Poznań",
      status: "Aktywny",
    },
    {
      id: 5,
      name: "Tomasz Nowicki",
      age: 35,
      city: "Wrocław",
      status: "Aktywny",
    },
    {
      id: 6,
      name: "Katarzyna Kowalczyk",
      age: 27,
      city: "Łódź",
      status: "Nieaktywny",
    },
    {
      id: 7,
      name: "Michał Zieliński",
      age: 31,
      city: "Szczecin",
      status: "Aktywny",
    },
    {
      id: 8,
      name: "Magdalena Szymańska",
      age: 26,
      city: "Bydgoszcz",
      status: "Aktywny",
    },
    {
      id: 9,
      name: "Paweł Woźniak",
      age: 33,
      city: "Lublin",
      status: "Nieaktywny",
    },
    {
      id: 10,
      name: "Agnieszka Dąbrowska",
      age: 30,
      city: "Katowice",
      status: "Aktywny",
    },
    {
      id: 11,
      name: "Rafał Kozłowski",
      age: 24,
      city: "Białystok",
      status: "Aktywny",
    },
    {
      id: 12,
      name: "Joanna Jankowska",
      age: 37,
      city: "Toruń",
      status: "Nieaktywny",
    },
    {
      id: 13,
      name: "Krzysztof Mazur",
      age: 29,
      city: "Rzeszów",
      status: "Aktywny",
    },
    {
      id: 14,
      name: "Beata Krawczyk",
      age: 34,
      city: "Opole",
      status: "Aktywny",
    },
    {
      id: 15,
      name: "Marcin Piotrowski",
      age: 28,
      city: "Kielce",
      status: "Nieaktywny",
    },
  ];

  const tableColumns = [
    { title: "ID", dataIndex: "id" as const, key: "id" },
    { title: "Imię i nazwisko", dataIndex: "name" as const, key: "name" },
    { title: "Wiek", dataIndex: "age" as const, key: "age" },
    { title: "Miasto", dataIndex: "city" as const, key: "city" },
    { title: "Status", dataIndex: "status" as const, key: "status" },
  ];

  const listItems = [
    {
      id: 1,
      title: "Projekt Alpha",
      description: "Nowoczesna aplikacja webowa",
      avatar: "A",
    },
    {
      id: 2,
      title: "Projekt Beta",
      description: "System zarządzania danymi",
      avatar: "B",
    },
    {
      id: 3,
      title: "Projekt Gamma",
      description: "Platforma analityczna",
      avatar: "G",
    },
  ];

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold border-b pb-2">
        Komponenty Wyświetlania Danych
      </h2>

      {/* List Component */}
      <div>
        <h3 className="text-lg font-semibold mb-3">List - Lista elementów</h3>
        <List
          items={listItems}
          renderItem={(item) => (
            <List.Item
              title={item.title}
              description={item.description}
              avatar={<Avatar size="sm">{item.avatar}</Avatar>}
              actions={[
                <button className="text-blue-600 hover:text-blue-800">
                  Edytuj
                </button>,
                <button className="text-red-600 hover:text-red-800">
                  Usuń
                </button>,
              ]}
            />
          )}
          header={
            <div className="font-semibold text-gray-900 dark:text-gray-100">
              Projekty
            </div>
          }
          footer={
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Łącznie: {listItems.length} projektów
            </div>
          }
          bordered
          size="md"
        />
      </div>

      {/* Card Component */}
      <div>
        <h3 className="text-lg font-semibold mb-3">
          Card - Karty informacyjne
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Aktywni użytkownicy</h4>
                <Badge count={42} />
              </div>
            </CardHeader>
            <CardBody>
              <Statistic value={1247} title="Całkowita liczba" />
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Zadania w toku</h4>
                <Badge dot status="processing" />
              </div>
            </CardHeader>
            <CardBody>
              <Statistic value={23} title="Aktywne zadania" />
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Zakończone projekty</h4>
                <Badge dot status="success" />
              </div>
            </CardHeader>
            <CardBody>
              <Statistic value={89} title="Ukończone" />
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Table Component */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Table - Tabela danych</h3>
        <Table
          data={allTableData}
          columns={tableColumns}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: allTableData.length,
            onChange: (page: number) => {
              setCurrentPage(page);
            },
          }}
          bordered
          size="md"
        />
      </div>

      {/* Badge Component */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Badge - Odznaki</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Badge count={5} />
          <Badge count={100} />
          <Badge dot status="success" />
          <Badge dot status="error" />
          <Badge dot status="warning" />
          <Badge dot status="processing" />
          <Badge count={3} status="success" />
          <Badge count={7} status="error" />
        </div>
      </div>

      {/* Avatar Component */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Avatar - Awatary</h3>
        <div className="flex items-center gap-4">
          <Avatar size="sm">JD</Avatar>
          <Avatar size="md">AW</Avatar>
          <Avatar size="lg">PK</Avatar>
          <Avatar size="md">IMG</Avatar>
        </div>
      </div>

      {/* Tag Component */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Tag - Tagi</h3>
        <div className="flex flex-wrap gap-2">
          <Tag>Domyślny</Tag>
          <Tag variant="primary">Primary</Tag>
          <Tag variant="success">Sukces</Tag>
          <Tag variant="warning">Ostrzeżenie</Tag>
          <Tag variant="error">Błąd</Tag>
          <Tag size="sm">Mały</Tag>
          <Tag size="lg">Duży</Tag>
          <Tag closable onClose={() => alert("Tag zamknięty")}>
            Zamykalny
          </Tag>
        </div>
      </div>

      {/* Statistic Component */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Statistic - Statystyki</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Statistic value={1234} title="Odsłon" />
          <Statistic value={5678} title="Użytkowników" prefix="+" />
          <Statistic
            value={98.5}
            title="Skuteczność"
            suffix="%"
            precision={1}
          />
          <Statistic value={123456} title="Przychód" prefix="$" />
        </div>
      </div>
    </section>
  );
}
