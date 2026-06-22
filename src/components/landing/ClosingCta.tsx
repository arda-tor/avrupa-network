import Link from "next/link";

export default function ClosingCta() {
  return (
    <section className="lp-cta">
      <h2 className="lp-cta-title">
        Doğru insanları tanımak için <em>doğru yerdesin.</em>
      </h2>
      <p className="lp-cta-sub">Bir davetin varsa, başlamanın tam zamanı.</p>
      <div className="lp-hero-actions">
        <Link href="/kayit" className="btn-primary">
          Başvur
        </Link>
        <Link href="/giris" className="btn-secondary">
          Giriş yap
        </Link>
      </div>
    </section>
  );
}
