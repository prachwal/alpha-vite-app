// No need to import h - it's handled by JSX transform
import { useState, useEffect } from 'preact/hooks';
import { cn } from '../../../utils/cn';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-bash';

export interface CodeBlockProps {
  code: string;
  language?: string;
  theme?: 'light' | 'dark' | 'auto';
  showLineNumbers?: boolean;
  highlightLines?: readonly number[];
  copyable?: boolean;
  maxHeight?: string | number;
  wrapLines?: boolean;
  className?: string;
}

export const CodeBlock = ({
  code,
  language = 'typescript',
  showLineNumbers = true,
  highlightLines = [],
  copyable = true,
  maxHeight,
  wrapLines = false,
  className,
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && Prism) {
      const grammar = Prism.languages[language] || Prism.languages.markup;
      const highlighted = Prism.highlight(code, grammar, language);
      setHighlightedCode(highlighted);
    }
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const lines = highlightedCode.split('\n');
  const hasMaxHeight = maxHeight !== undefined;

  return (
    <div className={cn('relative rounded-lg overflow-hidden', className)}>
      {copyable && (
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 z-10 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      )}

      <div
        className={cn(
          'bg-gray-900 text-gray-100 p-4 overflow-auto',
          hasMaxHeight && 'overflow-y-auto'
        )}
        style={
          maxHeight
            ? {
                maxHeight:
                  typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight,
              }
            : {}
        }
      >
        <pre
          className={cn(
            'text-sm leading-relaxed',
            wrapLines ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'
          )}
        >
          <code>
            {lines.map((line, index) => {
              const lineNumber = index + 1;
              const isHighlighted = highlightLines.includes(lineNumber);

              return (
                <div
                  key={index}
                  className={cn(
                    'flex',
                    isHighlighted && 'bg-yellow-900/30',
                    showLineNumbers && 'pl-8'
                  )}
                >
                  {showLineNumbers && (
                    <span className="absolute left-4 text-gray-500 select-none">
                      {lineNumber}
                    </span>
                  )}
                  <span
                    dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }}
                  />
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
};
