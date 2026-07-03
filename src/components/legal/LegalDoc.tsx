import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export interface LegalSection {
  heading: string;
  /** Paragraflar; her madde ayrı bir <p> olarak basılır. */
  body?: string[];
  /** Maddeli liste (isteğe bağlı). */
  items?: string[];
}

interface LegalDocProps {
  kicker: string;
  title: string;
  updated: string;
  intro: string[];
  sections: LegalSection[];
  activePath?: string;
}

export default function LegalDoc({
  kicker,
  title,
  updated,
  intro,
  sections,
  activePath,
}: LegalDocProps) {
  return (
    <div className="wrap">
      <Navbar activePath={activePath} />

      <article className="legal">
        <div className="lp-kicker">{kicker}</div>
        <h1 className="legal-title">{title}</h1>
        <div className="legal-meta">Son güncelleme: {updated}</div>

        <div className="legal-note">
          Bu metin genel bir bilgilendirme şablonudur ve hukuki danışmanlık yerine geçmez.
          Yayına almadan önce şirket bilgileri (unvan, adres, veri sorumlusu, iletişim) ile
          birlikte bir avukat tarafından gözden geçirilmelidir.
        </div>

        {intro.map((paragraph, index) => (
          <p key={index} className="legal-intro">
            {paragraph}
          </p>
        ))}

        {sections.map((section, index) => (
          <section key={section.heading} className="legal-section">
            <h2 className="legal-h2">
              <span className="num">{String(index + 1).padStart(2, "0")}</span>
              {section.heading}
            </h2>
            {section.body?.map((paragraph, pIndex) => (
              <p key={pIndex}>{paragraph}</p>
            ))}
            {section.items ? (
              <ul className="legal-list">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </article>

      <Footer />
    </div>
  );
}
