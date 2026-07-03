import type { Metadata } from "next";
import LegalDoc, { type LegalSection } from "@/components/legal/LegalDoc";

export const metadata: Metadata = {
  title: "Gizlilik Politikası & KVKK/GDPR Aydınlatma Metni — Turkhub",
  description:
    "Turkhub'da kişisel verilerinin nasıl işlendiğini açıklayan KVKK ve GDPR uyumlu gizlilik politikası.",
};

const intro = [
  "Turkhub olarak kişisel verilerinin gizliliğine ve güvenliğine önem veriyoruz. Bu metin, veri sorumlusu sıfatıyla kişisel verilerini hangi amaçlarla ve hangi hukuki sebeplerle işlediğimizi açıklar.",
  "Metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (\"KVKK\") ve Avrupa Birliği Genel Veri Koruma Tüzüğü (\"GDPR\", EU 2016/679) kapsamında hazırlanmıştır. Avrupa'da yaşayan üyelerimiz için her iki düzenleme birlikte gözetilir.",
];

const sections: LegalSection[] = [
  {
    heading: "Veri Sorumlusu",
    body: [
      "Kişisel verilerin, veri sorumlusu sıfatıyla [Şirket Unvanı] (\"Turkhub\") tarafından işlenmektedir.",
      "Adres: [şirket adresi] · E-posta: [iletişim e-postası]. GDPR kapsamında gerekmesi halinde AB temsilcimiz: [AB temsilcisi bilgileri].",
    ],
  },
  {
    heading: "İşlediğimiz Kişisel Veriler",
    body: ["Platformu kullanımına bağlı olarak aşağıdaki veri kategorilerini işleriz:"],
    items: [
      "Kimlik bilgileri: ad, soyad.",
      "İletişim bilgileri: e-posta adresi.",
      "Profil bilgileri: şehir/konum, meslek veya rol, biyografi, yetenekler, profil görseli.",
      "Hesap ve güvenlik verileri: şifrelenmiş parola, oturum ve giriş kayıtları.",
      "Davet/referans bilgileri: seni davet eden üye ve davet ettiğin kişilere dair bağlantı verisi.",
      "Kullanım verileri: cihaz, tarayıcı, IP adresi ve Platform içi etkileşim kayıtları.",
      "Çerez verileri: oturum ve tercih çerezleri aracılığıyla toplanan veriler.",
    ],
  },
  {
    heading: "Kişisel Verilerin İşlenme Amaçları",
    items: [
      "Üyelik kaydının oluşturulması ve yönetilmesi.",
      "Kimlik doğrulama ve hesap güvenliğinin sağlanması.",
      "Platform hizmetlerinin sunulması; üyelerin birbirini keşfetmesi ve iletişim kurması.",
      "Davet/referans sisteminin işletilmesi.",
      "Kötüye kullanımın, dolandırıcılığın ve güvenlik ihlallerinin önlenmesi.",
      "Yasal yükümlülüklerin yerine getirilmesi ve hukuki taleplere yanıt verilmesi.",
      "Seninle iletişim kurulması ve bildirimlerin gönderilmesi.",
    ],
  },
  {
    heading: "İşlemenin Hukuki Sebepleri",
    body: [
      "Kişisel verilerini KVKK m.5/m.6 ve GDPR m.6 kapsamındaki şu hukuki sebeplere dayanarak işleriz:",
    ],
    items: [
      "Bir sözleşmenin kurulması veya ifası için gerekli olması (üyelik ilişkisi).",
      "Açık rızanın bulunması (örneğin isteğe bağlı profil alanları ve pazarlama iletileri).",
      "Hukuki yükümlülüğümüzü yerine getirmemiz için zorunlu olması.",
      "Temel hak ve özgürlüklerine zarar vermemek kaydıyla meşru menfaatlerimiz (güvenlik, kötüye kullanım önleme, hizmet geliştirme).",
    ],
  },
  {
    heading: "Kişisel Verilerin Aktarılması",
    body: [
      "Verilerin, hizmetin sunulması için çalıştığımız tedarikçilerle (barındırma/hosting, e-posta gönderimi, altyapı sağlayıcıları) ve yasal olarak yetkili kamu kurumlarıyla, yalnızca gerekli ölçüde paylaşılabilir.",
      "Avrupa ve Türkiye arasında yurt dışı aktarım söz konusu olduğunda, aktarım KVKK ve GDPR'ın öngördüğü uygun güvenceler (örneğin standart sözleşme hükümleri veya yeterlilik kararları) çerçevesinde gerçekleştirilir. Verilerini bu metinde belirtilen amaçlar dışında üçüncü taraflara satmayız.",
    ],
  },
  {
    heading: "Saklama Süreleri",
    body: [
      "Kişisel verileri, üyeliğin sürdüğü süre boyunca ve sonrasında yürürlükteki mevzuatın gerektirdiği yasal saklama süreleri kadar muhafaza ederiz.",
      "Hesabını sildiğinde, verileri yasal yükümlülüklerimiz elverdiği ölçüde makul bir süre içinde sileriz veya geri döndürülemez biçimde anonim hale getiririz.",
    ],
  },
  {
    heading: "Veri Güvenliği",
    body: [
      "Kişisel verilerini yetkisiz erişime, kayba ve ifşaya karşı korumak için şifreleme, erişim kontrolü ve düzenli güvenlik gözden geçirmeleri dahil olmak üzere uygun teknik ve idari tedbirleri alırız.",
    ],
  },
  {
    heading: "Haklarınız",
    body: [
      "KVKK m.11 ve GDPR kapsamında kişisel verilerine ilişkin aşağıdaki haklara sahipsin:",
    ],
    items: [
      "Verilerinin işlenip işlenmediğini öğrenme ve bunlara erişim talep etme.",
      "Eksik veya yanlış verilerin düzeltilmesini isteme.",
      "Verilerinin silinmesini veya yok edilmesini (unutulma hakkı) talep etme.",
      "İşlemenin kısıtlanmasını isteme ve işlemeye itiraz etme.",
      "Verilerini yapılandırılmış bir formatta alma ve taşıma (veri taşınabilirliği).",
      "Verdiğin açık rızayı dilediğin zaman geri çekme.",
      "KVKK Kurumu'na veya yetkili AB veri koruma otoritesine şikâyette bulunma.",
    ],
  },
  {
    heading: "Çerezler",
    body: [
      "Platformun çalışması için zorunlu çerezlerin yanı sıra, tercihlerini hatırlamak ve hizmeti iyileştirmek için işlevsel ve analitik çerezler kullanabiliriz. Çerez tercihlerini tarayıcı ayarlarından yönetebilirsin; ancak zorunlu çerezlerin devre dışı bırakılması Platformun bazı işlevlerini etkileyebilir.",
    ],
  },
  {
    heading: "Başvuru ve İletişim",
    body: [
      "Haklarını kullanmak veya bu metinle ilgili sorularını iletmek için [iletişim e-postası] adresine yazabilirsin. Başvurularını, yürürlükteki mevzuatın öngördüğü süre içinde (KVKK kapsamında en geç 30 gün) yanıtlarız.",
    ],
  },
  {
    heading: "Metinde Değişiklik",
    body: [
      "Bu Gizlilik Politikası'nı zaman zaman güncelleyebiliriz. Güncel sürüm her zaman bu sayfada yayımlanır; önemli değişikliklerde seni ayrıca bilgilendiririz.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalDoc
      kicker="Yasal"
      title="Gizlilik Politikası & KVKK/GDPR"
      updated="28 Haziran 2026"
      intro={intro}
      sections={sections}
      activePath="/gizlilik"
    />
  );
}
