import { useState } from 'preact/hooks';
import { AutoComplete, AutoCompleteOption } from '../components/form-advanced';

const cityOptions: AutoCompleteOption[] = [
  { value: 'new-york', label: 'New York' },
  { value: 'london', label: 'London' },
  { value: 'paris', label: 'Paris' },
  { value: 'tokyo', label: 'Tokyo' },
  { value: 'sydney', label: 'Sydney' },
  { value: 'berlin', label: 'Berlin' },
  { value: 'moscow', label: 'Moscow' },
  { value: 'cairo', label: 'Cairo' },
];

const countryOptions: AutoCompleteOption[] = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'jp', label: 'Japan' },
  { value: 'au', label: 'Australia' },
  { value: 'ca', label: 'Canada' },
  { value: 'br', label: 'Brazil' },
];

export default {
  title: 'Design System/Advanced Form/AutoComplete',
  component: AutoComplete,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    onChange: { action: 'onChange' },
    options: { control: 'object' },
    onSearch: { action: 'onSearch' },
    placeholder: { control: 'text' },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    maxHeight: { control: 'text' },
    className: { control: 'text' },
  },
};

export const Default = {
  args: {
    value: '',
    onChange: () => {},
    options: cityOptions,
    placeholder: 'Search cities...',
  },
};

export const Small_Size = {
  args: {
    value: '',
    onChange: () => {},
    options: cityOptions,
    placeholder: 'Small size',
    size: 'sm',
  },
};

export const Large_Size = {
  args: {
    value: '',
    onChange: () => {},
    options: cityOptions,
    placeholder: 'Large size',
    size: 'lg',
  },
};

export const Loading = {
  args: {
    value: '',
    onChange: () => {},
    options: [],
    placeholder: 'Loading...',
    loading: true,
  },
};

export const Disabled = {
  args: {
    value: 'Berlin',
    onChange: () => {},
    options: cityOptions,
    disabled: true,
  },
};

export const With_Search = {
  args: {
    value: '',
    onChange: () => {},
    options: countryOptions,
    onSearch: () => {},
    placeholder: 'Search countries...',
  },
};

export const Interactive_Demo = {
  render: () => {
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [email, setEmail] = useState('');

    const emailDomains: AutoCompleteOption[] = [
      { value: 'gmail.com', label: '@gmail.com' },
      { value: 'yahoo.com', label: '@yahoo.com' },
      { value: 'outlook.com', label: '@outlook.com' },
      { value: 'hotmail.com', label: '@hotmail.com' },
      { value: 'company.com', label: '@company.com' },
    ];

    const getEmailSuggestions = (inputValue: string): AutoCompleteOption[] => {
      const atIndex = inputValue.indexOf('@');
      if (atIndex === -1) {
        return emailDomains.map((domain) => ({
          value: `${inputValue}${domain.label}`,
          label: `${inputValue}${domain.label}`,
        }));
      }

      const [username, domain = ''] = inputValue.split('@');
      return emailDomains
        .filter((d) => d.value.toLowerCase().includes(domain.toLowerCase()))
        .map((d) => ({
          value: `${username}@${d.value}`,
          label: `${username}@${d.value}`,
        }));
    };

    return (
      <div className="space-y-6 p-4 max-w-md">
        <div className="space-y-2">
          <div className="text-sm font-medium">Select City</div>
          <AutoComplete
            value={city}
            onChange={setCity}
            options={cityOptions}
            placeholder="Start typing city name..."
          />
          {city && <p className="text-xs text-gray-600">Selected: {city}</p>}
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Select Country</div>
          <AutoComplete
            value={country}
            onChange={setCountry}
            options={countryOptions}
            placeholder="Search for country..."
            size="lg"
          />
          {country && (
            <p className="text-xs text-gray-600">Selected: {country}</p>
          )}
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Email Address</div>
          <AutoComplete
            value={email}
            onChange={setEmail}
            options={getEmailSuggestions(email)}
            placeholder="Enter email address..."
            size="md"
          />
          {email && <p className="text-xs text-gray-600">Email: {email}</p>}
        </div>
      </div>
    );
  },
};
