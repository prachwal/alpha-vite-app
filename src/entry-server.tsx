import { render } from 'preact-render-to-string';
import { LocationProvider } from 'preact-iso';
import { App } from './app';

export function renderToString(url: string) {
  // Ensure URL is properly formatted for URL constructor
  let fullUrl: string;
  if (url.startsWith('http')) {
    fullUrl = url;
  } else {
    const path = url.startsWith('/') ? url : '/' + url;
    fullUrl = `http://localhost${path}`;
  }

  const parsedUrl = new URL(fullUrl);

  // Mock global location for preact-iso
  const originalLocation = global.location;
  global.location = {
    href: fullUrl,
    pathname: parsedUrl.pathname,
    search: parsedUrl.search,
    hash: parsedUrl.hash,
    protocol: parsedUrl.protocol,
    host: parsedUrl.host,
    hostname: parsedUrl.hostname,
    port: parsedUrl.port,
  } as any;

  // Mock window for SSR to ensure consistent rendering
  const originalWindow = (global as any).window;
  (global as any).window = {
    innerWidth: 1200, // Desktop width for consistent SSR
  };

  try {
    const html = render(
      <LocationProvider>
        <App />
      </LocationProvider>
    );
    return html;
  } finally {
    // Restore original location and window
    if (originalLocation !== undefined) {
      global.location = originalLocation;
    } else {
      (global as any).location = undefined;
    }
    (global as any).window = originalWindow;
  }
}
