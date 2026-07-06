import type { Metadata } from "next";
import LegalDoc, { type LegalSection } from "@/components/legal/LegalDoc";

export const metadata: Metadata = {
  title: "Kullanım Koşulları — Turkhub",
  description: "Turkhub platformunun kullanım koşulları ve üyelik şartları.",
};

const intro = [
  "Turkhub'a hoş geldin. Bu Kullanım Koşulları (\"Koşullar\"), Turkhub platformuna (\"Platform\") erişimini ve Platformu kullanımını düzenler.",
  "Platforma üye olarak ya da Platformu kullanarak bu Koşulları okuduğunu, anladığını ve kabul ettiğini beyan edersin. Koşulları kabul etmiyorsan Platformu kullanmamalısın.",
];

const sections: LegalSection[] = [
  {
    heading: "Taraflar ve Tanımlar",
    body: [
      "Platform, [Şirket Unvanı] (\"Turkhub\", \"biz\") tarafından işletilmektedir. Aşağıdaki tanımlar bu Koşullar boyunca geçerlidir:",
    ],
    items: [
      "Üye: Davet yoluyla Platforma kayıt olan gerçek kişi.",
      "Davet: Mevcut bir üyenin yeni bir kişiyi Platforma kazandırmak için ilettiği kişiye özel referans.",
      "İçerik: Üyenin Platformda paylaştığı profil bilgileri, metinler, görseller ve diğer her türlü veri.",
      "Hizmet: Platform üzerinden sunulan tüm tanışma, keşif ve iletişim olanakları.",
    ],
  },
  {
    heading: "Üyelik ve Davet Sistemi",
    body: [
      "Turkhub davet usulü çalışan kapalı bir topluluktur. Üyelik, mevcut bir üyenin daveti veya başvurunun tarafımızca onaylanması ile mümkündür.",
      "Davetler kişiye özeldir, devredilemez ve satılamaz. Bir daveti kötüye kullanmak, paylaşmak veya ticari amaçla dağıtmak Koşulların ihlalidir.",
      "Turkhub, herhangi bir başvuruyu gerekçe göstermeksizin değerlendirme, kabul etme veya reddetme hakkını saklı tutar.",
    ],
  },
  {
    heading: "Üyelik Şartları",
    items: [
      "18 yaşını doldurmuş olmak.",
      "Kayıt sırasında doğru, güncel ve eksiksiz bilgi vermek.",
      "Tek bir gerçek kişiye ait tek bir hesap kullanmak; başkası adına veya sahte kimlikle hesap açmamak.",
      "Hesap güvenliğinden ve hesap üzerinden gerçekleştirilen tüm işlemlerden sorumlu olmak.",
    ],
  },
  {
    heading: "Kullanıcı Yükümlülükleri ve Yasak Davranışlar",
    body: ["Platformu kullanırken aşağıdaki davranışlardan kaçınmayı kabul edersin:"],
    items: [
      "Yanıltıcı, sahte veya başkasına ait kimlik bilgisi kullanmak.",
      "Taciz, tehdit, nefret söylemi, ayrımcılık veya diğer üyelere zarar verecek davranışlarda bulunmak.",
      "İstenmeyen ticari ileti (spam), dolandırıcılık veya zincirleme pazarlama yapmak.",
      "Yasa dışı, müstehcen veya üçüncü kişilerin haklarını ihlal eden içerik paylaşmak.",
      "Diğer üyelerin kişisel verilerini izinsiz toplamak, kaydetmek veya üçüncü taraflarla paylaşmak.",
      "Platformun güvenliğini tehdit etmek, otomatik araçlarla (bot, scraper) veri çekmek veya sistemi manipüle etmek.",
    ],
  },
  {
    heading: "İçerik ve Fikri Mülkiyet",
    body: [
      "Paylaştığın İçerikten yalnızca sen sorumlusun. İçeriğin yürürlükteki mevzuata ve bu Koşullara uygun olduğunu taahhüt edersin.",
      "İçeriğini Platformda göstermemiz, saklamamız ve Hizmetin işleyişi için gerekli teknik işlemleri yapmamız amacıyla Turkhub'a münhasır olmayan, telifsiz ve sınırlı bir kullanım lisansı verirsin. İçeriğine ilişkin haklar sana ait kalır.",
      "Turkhub adı, logosu, tasarımı ve yazılımı dahil tüm fikri mülkiyet hakları Turkhub'a aittir ve izinsiz kullanılamaz.",
    ],
  },
  {
    heading: "Hesabın Askıya Alınması ve Feshi",
    body: [
      "Bu Koşulları ihlal etmen halinde hesabını uyarı yapmaksızın askıya alabilir veya kapatabiliriz.",
      "Dilediğin zaman hesabını kapatabilirsin. Hesabın kapatılması, kapatma tarihine kadar doğmuş yükümlülüklerini ortadan kaldırmaz.",
    ],
  },
  {
    heading: "Sorumluluğun Sınırlandırılması",
    body: [
      "Platform \"olduğu gibi\" ve \"mevcut haliyle\" sunulur. Hizmetin kesintisiz veya hatasız olacağına dair garanti vermiyoruz.",
      "Turkhub, üyeler arasındaki etkileşimlerin, paylaşılan bilgilerin doğruluğunun veya üyelerin gerçekleştirdiği eylemlerin sorumluluğunu taşımaz. Profil doğrulama çabalarımız bir garanti niteliği taşımaz; tanıştığın kişilerle ilişkilerinde kendi sağduyunu kullanmalısın.",
      "Yürürlükteki hukukun izin verdiği azami ölçüde, dolaylı, arızi veya sonuç niteliğindeki zararlardan sorumlu değiliz.",
    ],
  },
  {
    heading: "Koşullarda Değişiklik",
    body: [
      "Bu Koşulları zaman zaman güncelleyebiliriz. Önemli değişikliklerde seni Platform üzerinden veya e-posta ile bilgilendiririz. Değişikliklerin yürürlüğe girmesinden sonra Platformu kullanmaya devam etmen güncel Koşulları kabul ettiğin anlamına gelir.",
    ],
  },
  {
    heading: "Uygulanacak Hukuk ve Uyuşmazlıklar",
    body: [
      "Bu Koşullar Türkiye Cumhuriyeti hukukuna tabidir ve [yetkili mahkeme ve icra daireleri] yetkilidir.",
      "Avrupa Birliği'nde ikamet eden üyeler bakımından, bulundukları ülkenin emredici tüketici koruma hükümlerinden doğan hakları saklıdır.",
    ],
  },
  {
    heading: "İletişim",
    body: [
      "Bu Koşullarla ilgili sorularını [iletişim e-postası] adresine iletebilirsin.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalDoc
      kicker="Yasal"
      title="Kullanım Koşulları"
      updated="28 Haziran 2026"
      intro={intro}
      sections={sections}
      activePath="/kosullar"
    />
  );
}
