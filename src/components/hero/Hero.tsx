import type { ReactNode } from "react";

interface HeroProps {
  title: string;
  emphasis: string;
  subtitle: string;
  tag?: string;
  actions?: ReactNode;
}

export default function Hero({ title, emphasis, subtitle, tag, actions }: HeroProps) {
  return (
    <div className="hero-left fade-up">
      <div>
        {tag ? (
          <div className="hero-tag">
            <span className="dot" />
            {tag}
          </div>
        ) : null}
        <h1>
          {title} <em>{emphasis}</em>
        </h1>
        <p className="hero-sub">{subtitle}</p>
        {actions ? <div className="lp-hero-actions">{actions}</div> : null}
      </div>
    </div>
  );
}
