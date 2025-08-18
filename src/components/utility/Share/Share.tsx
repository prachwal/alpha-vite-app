export interface ShareProps {
  title?: string;
  text?: string;
  url?: string;
  children?: (props: { share: () => void; canShare: boolean }) => any;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function Share({
  title = '',
  text = '',
  url = typeof window !== 'undefined' ? window.location.href : '',
  children,
  onSuccess,
  onError,
}: ShareProps) {
  const canShare =
    typeof navigator !== 'undefined' &&
    'share' in navigator &&
    navigator.share !== undefined;

  const share = async () => {
    if (!canShare) {
      onError?.(new Error('Web Share API not supported'));
      return;
    }

    try {
      await navigator.share({
        title: title || undefined,
        text: text || undefined,
        url: url || undefined,
      });
      onSuccess?.();
    } catch (error) {
      if (error instanceof Error && error.name !== 'AbortError') {
        onError?.(error);
      }
    }
  };

  if (children) {
    return children({ share, canShare });
  }

  if (!canShare) {
    return null;
  }

  return (
    <button
      onClick={share}
      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
    >
      Share
    </button>
  );
}

export function ShareButton({
  title = '',
  text = '',
  url,
  label = 'Share',
  ...props
}: {
  title?: string;
  text?: string;
  url?: string;
  label?: string;
} & Omit<ShareProps, 'title' | 'text' | 'url' | 'children'>) {
  return (
    <Share title={title} text={text} url={url} {...props}>
      {({ share, canShare }) => {
        if (!canShare) return null;

        return (
          <button
            onClick={share}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            {label}
          </button>
        );
      }}
    </Share>
  );
}
