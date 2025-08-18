import { Auth0Button } from "../../../components/Auth0Button";

export function AuthComponents() {
  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold border-b pb-2">
        Komponenty Autoryzacji
      </h2>
      <div>
        <h3 className="text-lg font-semibold mb-3">Auth0Button</h3>
        <Auth0Button />
      </div>
    </section>
  );
}
