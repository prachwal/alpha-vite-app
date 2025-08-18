import { Progress } from '@/components/utility/Progress';

export function UtilityComponents() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Komponenty Użytkowe</h2>
        <p className="text-gray-600 mb-6">
          Praktyczne komponenty użytkowe do codziennego użytku.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Progress - Pasek postępu
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Domyślny</p>
              <Progress value={75} showText />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Bez tekstu</p>
              <Progress value={60} showText={false} />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Kolor sukcesu</p>
              <Progress value={85} variant="success" showText />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Rozmiar mały</p>
              <Progress value={45} size="sm" showText />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Wariant striped</p>
              <Progress value={70} striped showText />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Wariant animated</p>
              <Progress value={90} striped animated showText />
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Wartość {'>'} 100%</p>
              <Progress value={150} showText />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
