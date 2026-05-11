interface SectionHeaderProps {
  title: string;
  emphasis?: string;
  meta?: string;
}

export default function SectionHeader({ title, emphasis, meta }: SectionHeaderProps) {
  return (
    <div className="section-head">
      <h2>
        {title}
        {emphasis ? <> <em>{emphasis}</em></> : null}
      </h2>
      {meta ? <div className="section-meta">{meta}</div> : null}
    </div>
  );
}
