interface HeroProps {
  title: string;
  emphasis: string;
  subtitle: string;
}

export default function Hero({ title, emphasis, subtitle }: HeroProps) {
  return (
    <div className="hero-left fade-up">
      <div>
        <h1>
          {title} <em>{emphasis}</em>
        </h1>
        <p className="hero-sub">{subtitle}</p>
      </div>
    </div>
  );
}
