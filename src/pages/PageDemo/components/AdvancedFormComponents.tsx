import { useState } from 'preact/hooks';
import {
  Switch,
  Rate,
  Slider,
  RangeSlider,
  ColorPicker,
  AutoComplete,
  AutoCompleteOption,
} from '../../../components/form-advanced';

export function AdvancedFormComponents() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  // Rate states
  const [movieRating, setMovieRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(4);

  // Slider states
  const [temperature, setTemperature] = useState(22);
  const [volume, setVolume] = useState(65);
  const [priceRange, setPriceRange] = useState<readonly [number, number]>([
    200, 800,
  ]);

  // ColorPicker states
  const [primaryColor, setPrimaryColor] = useState('#1890ff');
  const [backgroundColor, setBackgroundColor] = useState('#f5f5f5');

  // AutoComplete states
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const cityOptions: AutoCompleteOption[] = [
    { value: 'new-york', label: 'New York' },
    { value: 'london', label: 'London' },
    { value: 'paris', label: 'Paris' },
    { value: 'tokyo', label: 'Tokyo' },
    { value: 'sydney', label: 'Sydney' },
    { value: 'berlin', label: 'Berlin' },
  ];

  const countryOptions: AutoCompleteOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'fr', label: 'France' },
    { value: 'de', label: 'Germany' },
    { value: 'jp', label: 'Japan' },
    { value: 'au', label: 'Australia' },
  ];

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

      {/* Rate Component */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Rate</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-sm font-medium">Movie Rating</div>
              <Rate
                value={movieRating}
                onChange={setMovieRating}
                tooltips={['Terrible', 'Bad', 'Normal', 'Good', 'Excellent']}
                allowHalf
              />
              <div className="text-xs text-gray-600">
                {movieRating === 0 ? 'Not rated' : `${movieRating}/5 stars`}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Service Quality</div>
              <Rate
                value={serviceRating}
                onChange={setServiceRating}
                character="♥"
                count={5}
              />
              <div className="text-xs text-gray-600">
                {serviceRating}/5 hearts
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Components */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Slider</h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-sm font-medium">
                Temperature: {temperature}°C
              </div>
              <Slider
                value={temperature}
                onChange={setTemperature}
                min={10}
                max={35}
                step={0.5}
                tooltip
                tooltipFormatter={(val) => `${val}°C`}
                marks={{ 10: 'Cold', 22: 'Room', 35: 'Hot' }}
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Volume: {volume}%</div>
              <Slider
                value={volume}
                onChange={setVolume}
                min={0}
                max={100}
                tooltip
                tooltipFormatter={(val) => `${val}%`}
                marks={{ 0: '🔇', 50: '🔉', 100: '🔊' }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </div>
            <RangeSlider
              value={priceRange}
              onChange={setPriceRange}
              min={0}
              max={1000}
              step={50}
              tooltip
              tooltipFormatter={(val) => `$${val}`}
            />
          </div>
        </div>
      </div>

      {/* Color Picker */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Color Picker</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-sm font-medium">Primary Color</div>
              <ColorPicker
                value={primaryColor}
                onChange={setPrimaryColor}
                format="hex"
                presets={[
                  '#1890ff',
                  '#52c41a',
                  '#fa8c16',
                  '#eb2f96',
                  '#722ed1',
                  '#13c2c2',
                  '#fa541c',
                  '#f5222d',
                ]}
              />
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Background Color</div>
              <ColorPicker
                value={backgroundColor}
                onChange={setBackgroundColor}
                format="hex"
              />
            </div>
          </div>

          <div className="p-4 rounded border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
            <p className="text-gray-900 dark:text-gray-100 mb-2">
              Preview of selected colors
            </p>
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded border-2 border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: primaryColor }}
              />
              <div
                className="w-16 h-16 rounded border-2 border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: backgroundColor }}
              />
              <div className="text-sm">
                <div className="text-gray-900 dark:text-gray-100">
                  Primary: {primaryColor}
                </div>
                <div className="text-gray-900 dark:text-gray-100">
                  Background: {backgroundColor}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AutoComplete */}
      <div>
        <h3 className="text-lg font-semibold mb-3">AutoComplete</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-sm font-medium">Select City</div>
              <AutoComplete
                value={selectedCity}
                onChange={setSelectedCity}
                options={cityOptions}
                placeholder="Search cities..."
                size="md"
              />
              {selectedCity && (
                <div className="text-xs text-gray-600">
                  Selected: {selectedCity}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Select Country</div>
              <AutoComplete
                value={selectedCountry}
                onChange={setSelectedCountry}
                options={countryOptions}
                placeholder="Search countries..."
                size="md"
              />
              {selectedCountry && (
                <div className="text-xs text-gray-600">
                  Selected: {selectedCountry}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
