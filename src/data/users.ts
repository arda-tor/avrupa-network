import type { FilterOption } from "@/types";

// NOT: Kullanici verileri artik backend'den (DB) cekiliyor. Asagidaki sahte
// kullanici/sabit verileri gecici olarak yorum satirina alindi (silinmedi).
// `filters` UI yapilandirmasidir, mock veri degildir; aktif kalir.
//
// import type { User } from "@/types";
//
// export const currentUser: User = {
//   id: "me",
//   name: "Ayşe Yılmaz",
//   initial: "A",
//   role: "Ürün Tasarımcısı",
//   location: "İstanbul",
//   bio: "Dijital ürünler tasarlıyorum. Erişilebilirlik ve tipografi en büyük tutkum. Yeni insanlarla fikir alışverişine her zaman açığım.",
//   skills: ["UI Tasarım", "Figma", "Tipografi", "Prototipleme", "+8 daha"],
//   avatarVariant: "a1",
// };
//
// export const users: User[] = [
//   {
//     id: "1",
//     name: "Mehmet Demir",
//     initial: "M",
//     role: "Yazılım Mimarı",
//     location: "Berlin",
//     bio: "15 yıldır açık kaynak projelerde çalışıyor, dağıtık sistemler üzerine iki kitap yazdım. Yeni mezunlara mentorluk yapıyorum.",
//     skills: ["Go", "Sistem Tasarımı", "Mentorluk", "Kubernetes"],
//     avatarVariant: "a2",
//     spotlight: true,
//     spotlightTag: "◆ Öne Çıkan Profil",
//   },
//   {
//     id: "2",
//     name: "Zeynep Kara",
//     initial: "Z",
//     role: "İllüstratör",
//     location: "Ankara",
//     bio: "Çocuk kitapları ve editorial çizimler. Doğa ve mitoloji temalarını seviyorum.",
//     skills: ["Procreate", "Çizim", "Storyboard"],
//     avatarVariant: "a3",
//   },
//   {
//     id: "3",
//     name: "Emre Aksoy",
//     initial: "E",
//     role: "Ses Mühendisi",
//     location: "İzmir",
//     bio: "Film ve podcast için ses tasarımı. Alan kayıtları ve modüler sentez ile uğraşıyorum.",
//     skills: ["Pro Tools", "Miksaj", "Field Recording"],
//     avatarVariant: "a4",
//   },
//   {
//     id: "4",
//     name: "Defne Şahin",
//     initial: "D",
//     role: "Veri Bilimcisi",
//     location: "İstanbul",
//     bio: "İklim değişikliği üzerine modelleme yapıyorum. Her cumartesi atölye düzenliyorum.",
//     skills: ["Python", "ML", "R", "İklim"],
//     avatarVariant: "a5",
//   },
//   {
//     id: "5",
//     name: "Kaan Öztürk",
//     initial: "K",
//     role: "Fotoğrafçı",
//     location: "Antalya",
//     bio: "Belgesel fotoğraf ve analog film. Karanlık odam da var, davet ediyorum.",
//     skills: ["Analog", "Portre", "Sokak"],
//     avatarVariant: "a6",
//   },
//   {
//     id: "6",
//     name: "Selin Arslan",
//     initial: "S",
//     role: "Yazar / Editör",
//     location: "İstanbul",
//     bio: "Kültür ve teknoloji üzerine yazıyorum. İki dergide editörlük yapıyorum.",
//     skills: ["Editörlük", "Röportaj", "Çeviri"],
//     avatarVariant: "a1",
//   },
//   {
//     id: "7",
//     name: "Burak Tan",
//     initial: "B",
//     role: "3B Sanatçı",
//     location: "Eskişehir",
//     bio: "Blender ve Houdini ile animasyon. Yeni başlayanlara ücretsiz ders veriyorum.",
//     skills: ["Blender", "Houdini", "Animasyon"],
//     avatarVariant: "a2",
//   },
// ];
//
// export const savedUserIds: string[] = ["2", "4", "6"];

export const filters: FilterOption[] = [
  { id: "all", label: "Tümü" },
  { id: "design", label: "Tasarım" },
  { id: "dev", label: "Yazılım" },
  { id: "writing", label: "Yazarlık" },
  { id: "music", label: "Müzik" },
  { id: "photo", label: "Fotoğraf" },
  { id: "same-city", label: "Aynı Şehir" },
  { id: "new", label: "Yeni Katılan" },
];
