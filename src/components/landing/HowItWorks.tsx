const steps = [
  {
    title: "Davet",
    desc: "İçerideki bir üye sana kapıyı açar. Turkhub'a yalnızca davetle girilir.",
  },
  {
    title: "Kendini anlat",
    desc: "Kim olduğunu, nerede yaşadığını ve ne yaptığını yazarsın. Topluluk seni buradan tanır.",
  },
  {
    title: "Tanış",
    desc: "Aynı şehirdeki ya da aynı işi yapan Türklere ulaşır, güvenle tanışırsın.",
  },
];

export default function HowItWorks() {
  return (
    <section className="lp-section">
      <div className="lp-kicker">Nasıl işliyor</div>
      <div className="lp-flow">
        {steps.map((step, index) => (
          <div key={step.title} className="lp-flow-item fade-up">
            <span className="lp-flow-num">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3 className="lp-flow-title">{step.title}</h3>
              <p className="lp-flow-desc">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
