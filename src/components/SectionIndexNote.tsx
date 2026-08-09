import type { ReactNode } from 'react';

type SectionIndexNoteProps = {
  index: string;
  children: ReactNode;
};

export function SectionIndexNote({ index, children }: SectionIndexNoteProps) {
  return (
    <div className="section-index-note">
      <span className="section-index-note__index">{index}</span>
      <p>{children}</p>
      <span className="section-index-note__signature" aria-hidden="true">A · P · K</span>
    </div>
  );
}
