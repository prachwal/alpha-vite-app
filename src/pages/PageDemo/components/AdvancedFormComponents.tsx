import { useState } from "preact/hooks";
import { Switch } from "../../../components/form-advanced";

export function AdvancedFormComponents() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold border-b pb-2">
        Zaawansowane Komponenty Formularzy
      </h2>

      <div>
        <h3 className="text-lg font-semibold mb-3">Switch</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Switch size="sm" defaultChecked>
              Small Switch
            </Switch>
            <Switch size="md" defaultChecked>
              Medium Switch
            </Switch>
            <Switch size="lg" defaultChecked>
              Large Switch
            </Switch>
          </div>

          <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-medium">Settings Demo</h4>
            <Switch checked={notifications} onChange={setNotifications}>
              Push notifications
            </Switch>
            <Switch checked={darkMode} onChange={setDarkMode}>
              Dark mode
            </Switch>
            <Switch checked={autoSave} onChange={setAutoSave}>
              Auto-save documents
            </Switch>
          </div>

          <div className="flex gap-4">
            <Switch disabled>Disabled</Switch>
            <Switch loading>Loading</Switch>
          </div>
        </div>
      </div>
    </section>
  );
}
