const principles = [
  {
    head: "Sadece davetle.",
    desc: "Kapımız herkese değil, birinin kefil olduğu kişilere açık. İçerideki herkes bir başkasının güvencesiyle var.",
  },
  {
    head: "Herkes gerçek.",
    desc: "Profiller doğrulanır. Karşındakinin gerçekten kim olduğunu bilerek tanışırsın.",
  },
  {
    head: "Az ama doğru.",
    desc: "Kalabalık peşinde değiliz. Küçük, nitelikli ve güvenilir kalmayı bilerek seçiyoruz.",
  },
];

export default function Principles() {
  return (
    <section className="lp-section">
      <div className="lp-kicker">Neden böyle</div>
      <div className="lp-principles">
        {principles.map((principle) => (
          <div key={principle.head} className="lp-principle fade-up">
            <h3 className="lp-principle-head">{principle.head}</h3>
            <p className="lp-principle-desc">{principle.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
