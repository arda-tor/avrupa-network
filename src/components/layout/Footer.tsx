import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="foot">
      <div className="foot-brand">
        <div className="foot-dots">
          <span />
          <span />
          <span />
        </div>
        Turkhub
      </div>
      <nav className="foot-links">
        <Link href="/kosullar">Kullanım Koşulları</Link>
        <Link href="/gizlilik">Gizlilik &amp; KVKK</Link>
      </nav>
      <div className="foot-copy">© {year} Turkhub</div>
    </footer>
  );
}
