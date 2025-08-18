import { useState } from 'preact/hooks';

export interface ClipboardProps {
  text: string;
  children?: (props: {
    copy: () => void;
    copied: boolean;
    text: string;
  }) => any;
  onCopy?: (text: string) => void;
  timeout?: number;
}

export function Clipboard({
  text,
  children,
  onCopy,
  timeout = 2000,
}: ClipboardProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      onCopy?.(text);

      setTimeout(() => {
        setCopied(false);
      }, timeout);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  if (children) {
    return children({ copy, copied, text });
  }

  return (
    <button
      onClick={copy}
      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

export function CopyButton({
  text,
  label = 'Copy',
  successLabel = 'Copied!',
  ...props
}: {
  text: string;
  label?: string;
  successLabel?: string;
} & Omit<ClipboardProps, 'text' | 'children'>) {
  return (
    <Clipboard text={text} {...props}>
      {({ copy, copied }) => (
        <button
          onClick={copy}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {copied ? successLabel : label}
        </button>
      )}
    </Clipboard>
  );
}
