import { AppTitle } from "../../../components/AppTitle";
import { CounterButton } from "../../../components/CounterButton";

export function FormComponents() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold border-b pb-2">
        Komponenty Formularzy
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">AppTitle</h3>
          <AppTitle />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">CounterButton</h3>
          <CounterButton />
        </div>
      </div>
    </section>
  );
}
