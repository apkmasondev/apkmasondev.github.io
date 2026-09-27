import { useId, type CSSProperties, type ElementType, type ReactNode } from 'react';

/** Zamienia `*fragment*` na kursywę szeryfu. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith('*') && part.endsWith('*') ? <em key={index}>{part.slice(1, -1)}</em> : part,
      )}
    </>
  );
}

/**
 * Nagłówek złożony z jawnie podanych linii. Każda linia wysuwa się spod maski,
 * kiedy nagłówek wchodzi w kadr (`data-reveal` na elemencie nadrzędnym).
 */
export function Lines({
  lines,
  as: Tag = 'h2',
  className = '',
  id,
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  id?: string;
}) {
  return (
    <Tag className={`lines ${className}`} id={id} data-reveal>
      {lines.map((line, index) => (
        // Spacja między liniami: wiersze są blokami, ale tekst nagłówka (czytniki,
        // wyszukiwarki, kopiowanie) nie może sklejać ostatniego i pierwszego słowa.
        <span className="lines__row" key={line} style={{ '--i': index } as CSSProperties}>
          <span className="lines__inner">
            <Rich text={line} />
          </span>{' '}
        </span>
      ))}
    </Tag>
  );
}

export function Kicker({ no, children }: { no?: string; children: ReactNode }) {
  return (
    <p className="kicker" data-reveal>
      {no && <span className="kicker__no">{no}</span>}
      <span className="kicker__rule" aria-hidden="true" />
      {children}
    </p>
  );
}

interface IconProps {
  size?: number;
  className?: string;
  /** Grubość linii w jednostkach siatki 24 px; domyślnie 1.6. */
  stroke?: number;
}

function Svg({ size = 16, className, stroke = 1.6, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const ArrowUpRight = (props: IconProps) => (
  <Svg {...props}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Svg>
);
export const ArrowRight = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </Svg>
);
export const ArrowLeft = (props: IconProps) => (
  <Svg {...props}>
    <path d="M20 12H4M10 6l-6 6 6 6" />
  </Svg>
);
export const ArrowDown = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 4v16M6 14l6 6 6-6" />
  </Svg>
);
export const ArrowUp = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 20V4M6 10l6-6 6 6" />
  </Svg>
);
export const Close = (props: IconProps) => (
  <Svg {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);
export const Search = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.2-4.2" />
  </Svg>
);
export const Copy = (props: IconProps) => (
  <Svg {...props}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </Svg>
);
export const Check = (props: IconProps) => (
  <Svg {...props}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);
export const ListIcon = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </Svg>
);
export const GridIcon = (props: IconProps) => (
  <Svg {...props}>
    <rect x="4" y="4" width="6.5" height="6.5" rx="1" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" />
  </Svg>
);
export const Github = ({ size = 16, className }: IconProps) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z"
    />
  </svg>
);

/** Znak marki — ten sam kształt co favicon, bez tła. */
export function Mark({ size = 28 }: { size?: number }) {
  const uid = useId().replace(/:/g, '');
  const grad = `mark-grad-${uid}`;
  const cuts = `mark-cuts-${uid}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={grad} x1="0" y1="100" x2="100" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#f43f5e" />
          <stop offset="50%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
        <mask id={cuts}>
          <rect x="0" y="0" width="100" height="100" fill="white" />
          <line x1="57.5" y1="0" x2="7.5" y2="100" stroke="black" strokeWidth="2.5" />
          <line x1="0" y1="61" x2="59" y2="61" stroke="black" strokeWidth="1.5" />
          <line x1="0" y1="65" x2="61" y2="65" stroke="black" strokeWidth="1.5" />
        </mask>
      </defs>
      <path
        d="M47.5 16 52.5 16 85 81 71 81 64.5 68 35.5 68 29 81 19 81 19 73ZM50 39 40.5 58 59.5 58Z"
        fill={`url(#${grad})`}
        mask={`url(#${cuts})`}
      />
    </svg>
  );
}
