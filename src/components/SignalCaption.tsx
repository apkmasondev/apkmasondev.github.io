import type { ReactNode } from 'react';

interface SignalCaptionProps {
  children: ReactNode;
  className?: string;
  textClassName?: string;
}

export function SignalCaption({
  children,
  className = '',
  textClassName,
}: SignalCaptionProps) {
  return (
    <div className={`signal-caption${className ? ` ${className}` : ''}`}>
      <span className="signal-glyph" aria-hidden="true" />
      <p className={textClassName}>{children}</p>
    </div>
  );
}
