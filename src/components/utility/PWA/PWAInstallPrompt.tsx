import { useState, useEffect } from 'preact/hooks';

export interface PWAInstallPromptProps {
  children?: (props: {
    install: () => void;
    canInstall: boolean;
    isInstalled: boolean;
    deferredPrompt: any | null;
  }) => any;
  onInstall?: () => void;
  onCancel?: () => void;
}

export function PWAInstallPrompt({
  children,
  onInstall,
  onCancel,
}: PWAInstallPromptProps) {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [canInstall, setCanInstall] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setCanInstall(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setCanInstall(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if app is already installed
    if ('getInstalledRelatedApps' in navigator) {
      try {
        (navigator as any).getInstalledRelatedApps().then((apps: any[]) => {
          if (apps && apps.length > 0) {
            setIsInstalled(true);
          }
        });
      } catch (error) {
        // Ignore error if API is not available
      }
    }

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        onInstall?.();
      } else {
        onCancel?.();
      }

      setDeferredPrompt(null);
      setCanInstall(false);
    } catch (error) {
      console.error('Error installing PWA:', error);
    }
  };

  if (children) {
    return children({ install, canInstall, isInstalled, deferredPrompt });
  }

  if (!canInstall || isInstalled) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-sm">
      <h3 className="text-lg font-semibold mb-2">Install App</h3>
      <p className="text-gray-600 mb-4">
        Install this app on your device for a better experience.
      </p>
      <div className="flex gap-2">
        <button
          onClick={install}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Install
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Later
        </button>
      </div>
    </div>
  );
}

export function PWAOfflineIndicator() {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg">
      You're offline. Some features may be unavailable.
    </div>
  );
}
