import type { SVGProps } from 'react';

/**
 * Sześć ikon, których faktycznie używa strona. Wstawione bezpośrednio w kodzie —
 * biblioteka ikon dokładałaby zależność i kilkadziesiąt kilobajtów dla tych samych ścieżek.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowUpRight = (props: IconProps) => (
  <Svg {...props}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </Svg>
);

export const ArrowDown = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 5v14" />
    <path d="m5 12 7 7 7-7" />
  </Svg>
);

export const ArrowUp = (props: IconProps) => (
  <Svg {...props}>
    <path d="M12 19V5" />
    <path d="m5 12 7-7 7 7" />
  </Svg>
);

export const Mail = (props: IconProps) => (
  <Svg {...props}>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
    <path d="m3 6.5 9 6.5 9-6.5" />
  </Svg>
);

export const Search = (props: IconProps) => (
  <Svg {...props}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m20 20-4.5-4.5" />
  </Svg>
);

export const Close = (props: IconProps) => (
  <Svg {...props}>
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </Svg>
);

export const MenuLines = (props: IconProps) => (
  <Svg {...props}>
    <path d="M4 8h16" />
    <path d="M4 16h10" />
  </Svg>
);
