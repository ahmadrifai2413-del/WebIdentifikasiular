/*
 * KATALOG SERPENTA
 *
 * Edit foto pada field image atau gunakan snake-images.ts.
 * Edit penjelasan pada field description.
 * Pertahankan id agar cocok dengan hasil model AI.
 * venom: null berarti belum terverifikasi, bukan tidak berbisa.
 * Perubahan file ini hanya memengaruhi tampilan React frontend.
 * Tidak otomatis memperbarui PostgreSQL atau katalog Flutter.
 */

import { snakeImages } from './snake-images';

export type Species = {
  id: string;
  name: string;
  english: string;
  scientific: string;
  family: string;

  image: string;
  credit: string;
  license: string;

  description: string;

  venom: boolean | null;
  venomLabel: string;
  length: string;
  habitat: string;
  activity: string;
  diet: string;

  regions: string[];
  traits: string[];
  similar: string[];

  source: string;
  color: string;
  taxonomyNote?: string;
  references?: {
    label: string;
    url: string;
  }[];
};

// #region Katalog
export const species: Species[] = [
  // #region Ular Bajing (Gonyosoma oxycephalum)
  {
    id: "gonyosoma-oxycephalum",
    name: "Ular Bajing",
    english: "Red-tailed Green Ratsnake",
    scientific: "Gonyosoma oxycephalum",
    family: "Colubridae",

    image: snakeImages["gonyosoma-oxycephalum"] || "/images/gonyosoma-oxycephalum.jpg",
    credit: "Thai National Parks",
    license: "https://creativecommons.org/licenses/by-sa/4.0/",

    description: "Ular penghuni pepohonan di Asia Tenggara dengan tubuh hijau dan ekor yang dapat berwarna kemerahan atau cokelat. Sisik perutnya membantu mencengkeram cabang saat memanjat. Di Indonesia, persebarannya mencakup Sumatra, Jawa, Kalimantan, dan beberapa pulau lainnya.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga 2,4 m",
    habitat: "Hutan & pepohonan",
    activity: "Terutama siang",
    diet: "Burung, telur, kadal, dan mamalia kecil",

    regions: ["Sumatra", "Jawa", "Kalimantan", "Nusa Tenggara"],
    traits: ["Tubuh hijau dengan ekor merah atau cokelat", "Garis gelap melintasi mata", "Tubuh memanjang, terampil memanjat"],
    similar: ["trimeresurus-albolabris"],

    source: "https://www.thainationalparks.com/species/gonyosoma-oxycephalum",
    color: "#c5e58b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Gonyosoma/oxycephalum" },
      { label: "Sumber profil", url: "https://www.thainationalparks.com/species/gonyosoma-oxycephalum" },
    ],
  },
  // #endregion
  // #region Kobra Sumatra (Naja sumatrana)
  {
    id: "naja-sumatrana",
    name: "Cobra Sumatra",
    english: "Equatorial Spitting Cobra",
    scientific: "Naja sumatrana",
    family: "Elapidae",

    image: snakeImages["naja-sumatrana"] || "/images/naja-sumatrana.jpg",
    credit: "Angusticeps",
    license: "https://creativecommons.org/licenses/by-sa/4.0/",

    description: "Kobra penyembur yang tersebar di Asia Tenggara, termasuk Sumatra dan Kalimantan. Dapat dijumpai di hutan maupun lingkungan yang berdekatan dengan manusia. Spesies ini dapat menyemburkan bisa sebagai pertahanan; jangan mendekat untuk mencoba melihat tudungnya.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Umumnya 0,9–1,2 m",
    habitat: "Hutan & area permukiman",
    activity: "Terutama siang",
    diet: "Mamalia kecil, katak, kadal, dan ular",

    regions: ["Sumatra", "Kalimantan"],
    traits: ["Dapat melebarkan tudung leher", "Warna tubuh bervariasi menurut populasi", "Mampu menyemburkan bisa"],
    similar: ["bungarus-fasciatus"],

    source: "https://www.thainationalparks.com/species/naja-sumatrana",
    color: "#d7bf8c",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Naja/sumatrana" },
      { label: "Sumber profil", url: "https://www.thainationalparks.com/species/naja-sumatrana" },
    ],
  },
  // #endregion
  // #region Sanca Kembang (Malayopython reticulatus)
  {
    id: "malayopython-reticulatus",
    name: "Sanca Kembang",
    english: "Reticulated Python",
    scientific: "Malayopython reticulatus",
    family: "Pythonidae",

    image: snakeImages["malayopython-reticulatus"] || "/images/malayopython-reticulatus.jpg",
    credit: "Thai National Parks",
    license: "https://creativecommons.org/licenses/by-sa/4.0/",

    description: "Sanca besar dengan pola tubuh menyerupai jaring, tersebar luas di Asia Selatan dan Asia Tenggara. Ular ini merupakan perenang yang baik dan memangsa dengan membelit. Tidak berbisa bukan berarti aman disentuh: individu besar memiliki kekuatan yang berbahaya.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Dapat melebihi 6 m",
    habitat: "Hutan & tepian sungai",
    activity: "Terutama malam",
    diet: "Mamalia dan burung",

    regions: ["Sumatra", "Jawa", "Kalimantan", "Sulawesi", "Nusa Tenggara", "Maluku"],
    traits: ["Pola geometris seperti jaring", "Tubuh besar dan berotot", "Perenang yang baik"],
    similar: [],

    source: "https://www.thainationalparks.com/species/malayopython-reticulatus",
    color: "#cabd93",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Malayopython/reticulatus" },
      { label: "Sumber profil", url: "https://www.thainationalparks.com/species/malayopython-reticulatus" },
    ],
  },
  // #endregion
  // #region Ular Welang (Bungarus fasciatus)
  {
    id: "bungarus-fasciatus",
    name: "Ular Welang",
    english: "Banded Krait",
    scientific: "Bungarus fasciatus",
    family: "Elapidae",

    image: snakeImages["bungarus-fasciatus"] || "/images/bungarus-fasciatus.jpg",
    credit: "Thai National Parks",
    license: "https://creativecommons.org/licenses/by/4.0/",

    description: "Welang dikenal dengan belang kuning dan hitam yang mengelilingi tubuhnya. Spesies ini aktif terutama pada malam hari dan dapat ditemukan di hutan, lahan pertanian, serta sekitar sumber air. Bisanya dapat menyebabkan gangguan saraf yang serius.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Umumnya sekitar 1,8 m",
    habitat: "Hutan & lahan pertanian",
    activity: "Terutama malam",
    diet: "Terutama ular lain",

    regions: ["Sumatra", "Jawa", "Kalimantan"],
    traits: ["Belang kuning dan hitam mengelilingi tubuh", "Punggung memiliki alur menonjol", "Ujung ekor relatif tumpul"],
    similar: ["boiga-melanota"],

    source: "https://www.thainationalparks.com/species/bungarus-fasciatus",
    color: "#e1cd76",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Bungarus/fasciatus" },
      { label: "Rujukan tambahan biologi", url: "https://www.thainationalparks.com/species/bungarus-fasciatus" },
    ],
  },
  // #endregion
  // #region Viper Bibir Putih (Trimeresurus albolabris)
  {
    id: "trimeresurus-albolabris",
    name: "Viper Bibir Putih",
    english: "White-lipped Pit Viper",
    scientific: "Trimeresurus albolabris",
    family: "Viperidae",

    image: snakeImages["trimeresurus-albolabris"] || "/images/trimeresurus-albolabris.jpg",
    credit: "Thai National Parks",
    license: "https://creativecommons.org/licenses/by/4.0/",

    description: "Viper pohon dengan tubuh dominan hijau dan bibir yang lebih terang. Beberapa ular hijau yang mirip telah dipisahkan menjadi spesies berbeda melalui penelitian taksonomi. Karena itu, warna saja tidak cukup untuk memastikan identitas ular ini.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Hingga sekitar 81 cm",
    habitat: "Semak & pepohonan",
    activity: "Terutama malam",
    diet: "Katak, burung, dan mamalia kecil",

    regions: ["Sumatra", "Jawa"],
    traits: ["Tubuh dominan hijau", "Bagian bibir lebih pucat", "Mirip dengan sejumlah viper hijau lainnya"],
    similar: ["gonyosoma-oxycephalum"],

    source: "https://www.thainationalparks.com/species/trimeresurus-albolabris",
    color: "#a3cf73",
    taxonomyNote: "Sejumlah populasi yang dahulu dimasukkan dalam kelompok ini telah dipisahkan, termasuk T. insularis. Sebaran pulau dari catatan lama perlu diperiksa terhadap revisi taksonomi.",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Trimeresurus/albolabris" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/white-lipped-pit-viper.htm" },
      { label: "Sumber profil", url: "https://www.thainationalparks.com/species/trimeresurus-albolabris" },
    ],
  },
  // #endregion
  // #region Ular Bakau Barat (Boiga melanota)
  {
    id: "boiga-melanota",
    name: "Ular Bakau Barat",
    english: "Western Mangrove Cat Snake",
    scientific: "Boiga melanota",
    family: "Colubridae",

    image: snakeImages["boiga-melanota"] || "/images/boiga-dendrophila.jpg",
    credit: "Thai National Parks",
    license: "https://creativecommons.org/licenses/by/4.0/",

    description: "Ular bertaring belakang yang sering dikenal lewat pola tubuh hitam dan kuning. Spesies ini tercatat di Sumatra dan Semenanjung Malaya. Nama Boiga melanota digunakan setelah pemisahan taksonomi dari kelompok Boiga dendrophila.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Dapat mencapai 2,5 m",
    habitat: "Hutan & bakau",
    activity: "Terutama malam",
    diet: "Vertebrata kecil",

    regions: ["Sumatra"],
    traits: ["Tubuh hitam dengan pita kuning", "Mata besar", "Sering berada di vegetasi"],
    similar: ["bungarus-fasciatus"],

    source: "https://www.thainationalparks.com/species/boiga-melanota",
    color: "#d9b567",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Boiga/melanota" },
      { label: "Sumber profil", url: "https://www.thainationalparks.com/species/boiga-melanota" },
    ],
  },
  // #endregion
  // #region Acanthophis laevis (Acanthophis laevis)
  {
    id: "acanthophis-laevis",
    name: "Ular Belang Maut",
    english: "Smooth-scaled Death Adder",
    scientific: "Acanthophis laevis",
    family: "Elapidae",

    image: snakeImages["acanthophis-laevis"] || "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhcBWdBFqonPf1JBG311ZBauB_HU-v-zIzXsGRJtP5VeOaBTwXP_FepWOOEcRrPBvk9-onJbxHcci8j3PJLgvEcQ8WTNU-yLYpXFqaInJtwn59TkDBd9NxO2tdYJzakGyIRFwOE-ynah60/s640/11612218394_1208c70d31_o.jpg",
    credit: "",
    license: "",

    description: "Makanan yang dilaporkan: Kadal termasuk skink; burung, mamalia kecil, dan katak juga disebut sebagai kemungkinan mangsa. Acanthophis laevis adalah spesies ular dalam keluarga Elapidae. Referensi sebarannya mencantumkan antara lain Papua, Seram, Tanimbar. Referensi mencatat reproduksi ovovivipar, yaitu telur berkembang di tubuh induk hingga anak dilahirkan. Epitet laevis berkaitan dengan kata Latin untuk permukaan yang halus.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Umumnya 50–70 cm; dapat mendekati 1 m",
    habitat: "Hutan hujan, hutan sekunder, dan tepi kebun; bersembunyi di serasah",
    activity: "Terutama malam; berburu dengan menyergap",
    diet: "Kadal termasuk skink; burung, mamalia kecil, dan katak juga disebut sebagai kemungkinan mangsa",

    regions: ["Papua", "Seram", "Tanimbar"],
    traits: ["Tubuh pendek dan gemuk", "Kepala segitiga dengan ujung ekor berduri", "Ujung ekor dapat dipakai sebagai umpan mangsa"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Acanthophis/laevis",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Acanthophis/laevis" },
      { label: "Rujukan tambahan biologi", url: "https://doi.org/10.2305/IUCN.UK.2022-1.RLTS.T42492778A217802220.en" },
    ],
  },
  // #endregion
  // #region Acrochordus granulatus (Acrochordus granulatus)
  {
    id: "acrochordus-granulatus",
    name: "Acrochordus granulatus",
    english: "Little filesnake",
    scientific: "Acrochordus granulatus",
    family: "Acrochordidae",

    image: snakeImages["acrochordus-granulatus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Perairan dangkal pesisir, muara, dan perairan payau; toleran terhadap variasi salinitas. Makanan yang dilaporkan: Terutama ikan kecil, termasuk gobi; juga krustasea kecil. Ular ini sangat bergantung pada lingkungan perairan. Sisik kasarnya dan bentuk ekor yang pipih merupakan bagian dari penyesuaian hidup di air. Acrochordus granulatus adalah spesies ular dalam keluarga Acrochordidae. Nama umum berbahasa Inggris yang tercatat adalah Little filesnake. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Bali, Borneo, Sulawesi. Referensi mencatat reproduksi ovovivipar, yaitu telur berkembang di tubuh induk hingga anak dilahirkan. Nama granulatus merujuk pada sisiknya yang berbentuk butiran kecil.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Umumnya 0,6–1 m; dapat sekitar 1,3 m",
    habitat: "Perairan dangkal pesisir, muara, dan perairan payau; toleran terhadap variasi salinitas",
    activity: "Terutama malam; sepenuhnya akuatik",
    diet: "Terutama ikan kecil, termasuk gobi; juga krustasea kecil",

    regions: ["Sumatra", "Jawa", "Bali", "Borneo", "Sulawesi"],
    traits: ["Kulit longgar dengan sisik kasar", "Lubang hidung di bagian atas kepala", "Ekor memipih untuk berenang"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Acrochordus/granulatus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Acrochordus/granulatus" },
      { label: "Thai National Parks — biologi spesies", url: "https://www.thainationalparks.com/species/acrochordus-granulatus" },
      { label: "Rujukan tambahan biologi", url: "https://animaldiversity.org/accounts/Acrochordus_granulatus/" },
    ],
  },
  // #endregion
  // #region Acrochordus javanicus (Acrochordus javanicus)
  {
    id: "acrochordus-javanicus",
    name: "Ular Karung Jawa",
    english: "Javan File Snake",
    scientific: "Acrochordus javanicus",
    family: "Acrochordidae",

    image: snakeImages["acrochordus-javanicus"] || "",
    credit: "",
    license: "",

    description: "Kulitnya tampak longgar dan bersisik kasar. Saat menangkap ikan, tubuh dan permukaan kulit membantu menahan mangsa yang licin. Acrochordus javanicus adalah spesies ular dalam keluarga Acrochordidae. Nama umum berbahasa Inggris yang tercatat adalah Javan File Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Kalimantan. Referensi mencatat reproduksi ovovivipar, yaitu telur berkembang di tubuh induk hingga anak dilahirkan. Nama spesiesnya berkaitan dengan Jawa, lokasi asal spesimen tipe yang dipakai untuk penamaan.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Dapat mencapai 2,4 m",
    habitat: "Sungai, muara, dan laguna; terutama air tawar atau payau",
    activity: "Terutama malam; sepenuhnya akuatik",
    diet: "Ikan dan amfibi",

    regions: ["Sumatra", "Jawa", "Kalimantan"],
    traits: ["Kulit tampak longgar", "Sisik kecil dan kasar", "Lubang hidung berada di bagian atas moncong"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Acrochordus/javanicus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Acrochordus/javanicus" },
      { label: "Thai National Parks — biologi spesies", url: "https://www.thainationalparks.com/species/acrochordus-javanicus" },
    ],
  },
  // #endregion
  // #region Ahaetulla mycterizans (Ahaetulla mycterizans)
  {
    id: "ahaetulla-mycterizans",
    name: "Ahaetulla mycterizans",
    english: "Malayan (Green) Whipsnake",
    scientific: "Ahaetulla mycterizans",
    family: "Colubridae",

    image: snakeImages["ahaetulla-mycterizans"] || "",
    credit: "",
    license: "",

    description: "Ular ramping penghuni pohon ini aktif pada siang hari. Bentuk tubuhnya menyerupai sulur tumbuhan dan dapat menyulitkan pengamatan di antara dedaunan. Ahaetulla mycterizans adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Malayan (Green) Whipsnake. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Lombok. Terutama hidup di pepohonan (arboreal). Referensi mencatat reproduksi ovovivipar, yaitu telur berkembang di tubuh induk hingga anak dilahirkan.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Panjang kepala–badan hingga sekitar 1 m; tidak termasuk ekor",
    habitat: "Hutan primer dan hutan sekunder matang, terutama dekat aliran air",
    activity: "Terutama siang",
    diet: "Terutama katak dan kadal",

    regions: ["Sumatra", "Jawa", "Lombok"],
    traits: ["Tubuh ramping menyerupai sulur", "Mata relatif besar"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Ahaetulla/mycterizans",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Ahaetulla/mycterizans" },
      { label: "Thai National Parks — biologi spesies", url: "https://www.thainationalparks.com/species/ahaetulla-mycterizans" },
    ],
  },
  // #endregion
  // #region Ular Pucuk (Ahaetulla prasina)
  {
    id: "ahaetulla-prasina",
    name: "Ular Pucuk",
    english: "Gunther’s whip snake",
    scientific: "Ahaetulla prasina",
    family: "Colubridae",

    image: snakeImages["ahaetulla-prasina"] || "",
    credit: "",
    license: "",

    description: "Ular Pucuk (Ahaetulla prasina) merupakan ular ramping yang banyak beraktivitas di pepohonan, semak, dan kebun. Warna hijau membantu tubuhnya menyatu dengan dedaunan, meskipun spesies ini juga memiliki variasi warna lain. Ular ini aktif pada siang hari dan memangsa hewan kecil seperti katak, kadal, cecak, serta burung kecil. Kemiripan dengan ular lain membuat warna saja tidak cukup untuk menentukan identitasnya.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Umumnya sekitar 1–1,5 m",
    habitat: "Pepohonan, semak, dan kebun di wilayah tropis",
    activity: "Aktif pada siang hari",
    diet: "Burung kecil, katak, cecak, bunglon, dan kadal lainnya",

    regions: ["Sumatra", "Bangka", "Belitung", "Jawa", "Bali"],
    traits: ["Tubuh panjang dan ramping", "Warna hijau membantu kamuflase di dedaunan"],
    similar: ["trimeresurus-albolabris", "trimeresurus-sumatranus"],
    source: "https://reptile-database.reptarium.cz/Ahaetulla/prasina",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Ahaetulla/prasina" },
      { label: "IPB University", url: "https://www.ipb.ac.id/news/index/2025/10/ular-pucuk/" },
    ],
  },
  // #endregion
  // #region Aplopeltura boa (Aplopeltura boa)
  {
    id: "aplopeltura-boa",
    name: "Aplopeltura boa",
    english: "Blunthead Slug Snake",
    scientific: "Aplopeltura boa",
    family: "Pareidae",

    image: snakeImages["aplopeltura-boa"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan hingga sekitar 1.500 m, terutama vegetasi rendah. Makanan yang dilaporkan: Siput bercangkang dan siput telanjang. Spesies ini memiliki cara makan khusus: gerakan rahangnya membantu melepaskan tutup cangkang siput sebelum memakan mangsa. Aplopeltura boa adalah spesies ular dalam keluarga Pareidae. Nama umum berbahasa Inggris yang tercatat adalah Blunthead Slug Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Jawa, Borneo, Nias. Sebagian aktivitas berlangsung di pepohonan (semiarboreal). Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 85 cm",
    habitat: "Hutan hingga sekitar 1.500 m, terutama vegetasi rendah",
    activity: "Terutama malam; arboreal",
    diet: "Siput bercangkang dan siput telanjang",

    regions: ["Sumatra", "Bangka", "Jawa", "Borneo", "Nias"],
    traits: ["Kepala tumpul dan mata besar", "Tubuh ramping memipih ke samping"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Aplopeltura/boa",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Aplopeltura/boa" },
      { label: "Thai National Parks — biologi spesies", url: "https://www.thainationalparks.com/species/aplopeltura-boa" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/blunt-headed-slug-snake.htm" },
    ],
  },
  // #endregion
  // #region Asthenodipsas laevis (Asthenodipsas laevis)
  {
    id: "asthenodipsas-laevis",
    name: "Asthenodipsas laevis",
    english: "Smooth Slug Snake",
    scientific: "Asthenodipsas laevis",
    family: "Pareidae",

    image: snakeImages["asthenodipsas-laevis"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan primer dan sekunder dataran rendah hingga pegunungan, sering dekat sungai. Makanan yang dilaporkan: Siput bercangkang dan siput telanjang. Asthenodipsas laevis adalah spesies ular dalam keluarga Pareidae. Nama umum berbahasa Inggris yang tercatat adalah Smooth Slug Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Jawa, Kalimantan, Natuna. Sebagian aktivitas berlangsung di pepohonan (semiarboreal). Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 60 cm",
    habitat: "Hutan primer dan sekunder dataran rendah hingga pegunungan, sering dekat sungai",
    activity: "Terutama malam; bergerak di tanah dan dapat memanjat vegetasi rendah",
    diet: "Siput bercangkang dan siput telanjang",

    regions: ["Sumatra", "Bangka", "Jawa", "Kalimantan", "Natuna"],
    traits: ["Tubuh cokelat dengan pita gelap tidak beraturan", "Moncong pendek dan membulat", "Sisik punggung halus"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Asthenodipsas/laevis",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Asthenodipsas/laevis" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/smooth-slug-snake.htm" },
    ],
  },
  // #endregion
  // #region Asthenodipsas tropidonotus (Asthenodipsas tropidonota)
  {
    id: "asthenodipsas-tropidonotus",
    name: "Asthenodipsas tropidonotus",
    english: "Sumatra Slug Snake",
    scientific: "Asthenodipsas tropidonota",
    family: "Pareidae",

    image: snakeImages["asthenodipsas-tropidonotus"] || "",
    credit: "",
    license: "",

    description: "Asthenodipsas tropidonota adalah spesies ular dalam keluarga Pareidae. Nama umum berbahasa Inggris yang tercatat adalah Sumatra Slug Snake. Referensi sebarannya mencantumkan antara lain Sumatra. Sebagian aktivitas berlangsung di pepohonan (semiarboreal). Berkembang biak dengan bertelur. Label model tetap asthenodipsas-tropidonotus; referensi taksonomi yang diperiksa memakai ejaan Asthenodipsas tropidonota.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Sekitar 40–55 cm",
    habitat: "Hutan pegunungan Sumatra",
    activity: "Terutama malam",
    diet: "Siput bercangkang dan siput telanjang",
    regions: ["Sumatra"],
    traits: ["Kepala tumpul dan mata relatif besar", "Tubuh ramping memipih ke samping"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Asthenodipsas/tropidonota",
    color: "#b5c98b",
    taxonomyNote: "Label model tetap asthenodipsas-tropidonotus; referensi taksonomi yang diperiksa memakai ejaan Asthenodipsas tropidonota.",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Asthenodipsas/tropidonota" },
    ],
  },
  // #endregion
  // #region Asthenodipsas vertebralis (Asthenodipsas vertebralis)
  {
    id: "asthenodipsas-vertebralis",
    name: "Asthenodipsas vertebralis",
    english: "Asian Slug Snake",
    scientific: "Asthenodipsas vertebralis",
    family: "Pareidae",

    image: snakeImages["asthenodipsas-vertebralis"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan primer perbukitan dan pegunungan Semenanjung Malaysia, sekitar 1.000–2.000 m. Makanan yang dilaporkan: Siput; rincian diet spesies masih terbatas. Asthenodipsas vertebralis adalah spesies ular dalam keluarga Pareidae. Nama umum berbahasa Inggris yang tercatat adalah Asian Slug Snake. Referensi sebarannya mencantumkan antara lain Semenanjung Malaysia. Sebagian aktivitas berlangsung di pepohonan (semiarboreal). Berkembang biak dengan bertelur. Referensi mencatat bahwa laporan dari Borneo pernah berasal dari salah identifikasi A. laevis. A. tropidonota juga telah dipisahkan kembali; lokasi foto pelatihan perlu ditinjau sebelum digunakan sebagai peta sebaran.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 77 cm",
    habitat: "Hutan primer perbukitan dan pegunungan Semenanjung Malaysia, sekitar 1.000–2.000 m",
    activity: "Terutama malam; umumnya di tanah, kadang memanjat",
    diet: "Siput; rincian diet spesies masih terbatas",

    regions: ["Semenanjung Malaysia"],
    traits: ["Punggung abu-abu hingga cokelat gelap", "Perut krem", "Kepala tumpul dan mata relatif besar"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Asthenodipsas/vertebralis",
    color: "#b5c98b",
    taxonomyNote: "Referensi mencatat bahwa laporan dari Borneo pernah berasal dari salah identifikasi A. laevis. A. tropidonota juga telah dipisahkan kembali; lokasi foto pelatihan perlu ditinjau sebelum digunakan sebagai peta sebaran.",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Asthenodipsas/vertebralis" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/mountain-slug-snake.htm" },
    ],
  },
  // #endregion
  // #region Boiga bengkuluensis (Boiga bengkuluensis)
  {
    id: "boiga-bengkuluensis",
    name: "Boiga bengkuluensis",
    english: "Bengkulu Cat snake",
    scientific: "Boiga bengkuluensis",
    family: "Colubridae",

    image: snakeImages["boiga-bengkuluensis"] || "",
    credit: "",
    license: "",

    description: "Boiga bengkuluensis adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Bengkulu Cat snake. Referensi sebarannya mencantumkan antara lain Sumatra. Terutama hidup di pepohonan (arboreal). Berkembang biak dengan bertelur. Nama spesies ini diambil dari Bengkulu, daerah asal spesimen tipe.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Belum terverifikasi dalam paket ini",
    habitat: "Terutama hidup di pepohonan (arboreal)",
    activity: "Terutama malam",
    diet: "Vertebrata kecil (diduga)",
    regions: ["Sumatra"],
    traits: ["Tubuh ramping dan pipih dari samping", "Kepala lebar dengan mata besar"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Boiga/bengkuluensis",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Boiga/bengkuluensis" },
    ],
  },
  // #endregion
  // #region Boiga cynodon (Boiga cynodon)
  {
    id: "boiga-cynodon",
    name: "Boiga cynodon",
    english: "Dog-toothed Cat Snake",
    scientific: "Boiga cynodon",
    family: "Colubridae",

    image: snakeImages["boiga-cynodon"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan dataran rendah dan tepinya, termasuk habitat sekunder yang terganggu. Tubuhnya ramping dengan pita melintang dan garis gelap di belakang mata. Spesies ini aktif pada malam hari dan banyak memanfaatkan mangsa berupa burung kecil serta telur. Boiga cynodon adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Dog-toothed Cat Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Belitung, Jawa, Bali. Terutama hidup di pepohonan (arboreal). Berkembang biak dengan bertelur.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Hingga sekitar 2,8 m",
    habitat: "Hutan dataran rendah dan tepinya, termasuk habitat sekunder yang terganggu",
    activity: "Terutama malam",
    diet: "Burung kecil dan telur burung; juga kadal dan kelelawar kecil",

    regions: ["Sumatra", "Bangka", "Belitung", "Jawa", "Bali"],
    traits: ["Tubuh ramping dan pipih dari samping", "Pita melintang kecokelatan", "Garis gelap di belakang mata"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Boiga/cynodon",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Boiga/cynodon" },
      { label: "Thai National Parks — biologi spesies", url: "https://www.thainationalparks.com/species/boiga-cynodon" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/dog-toothed_cat-snake.htm" },
    ],
  },
  // #endregion
  // #region Boiga dendrophila (Boiga dendrophila)
  {
    id: "boiga-dendrophila",
    name: "Ular Cincin Emas",
    english: "Gold-ringed Cat Snake",
    scientific: "Boiga dendrophila",
    family: "Colubridae",

    image: snakeImages["boiga-dendrophila"] || "",
    credit: "",
    license: "",

    description: "Boiga dendrophila adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Gold-ringed Cat Snake. Referensi sebarannya mencantumkan antara lain Jawa, Sulawesi. Sebagian aktivitas berlangsung di pepohonan (semiarboreal). Berkembang biak dengan bertelur. Kompleks ini pernah mencakup takson yang kini dipisahkan, termasuk Boiga melanota. Sebaran lama tidak boleh diterapkan otomatis pada batas spesies terbaru.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Dapat mencapai sekitar 2,5 m",
    habitat: "Hutan, bakau, dan tepi sungai",
    activity: "Terutama malam; siang beristirahat di vegetasi",
    diet: "Burung, telur, kadal, katak, dan mamalia kecil",
    regions: ["Jawa", "Sulawesi"],
    traits: ["Tubuh hitam mengilap dengan cincin kuning", "Kepala lebar dengan mata besar", "Sering berada di vegetasi dekat air"],
    similar: ["bungarus-fasciatus"],
    source: "https://reptile-database.reptarium.cz/Boiga/dendrophila",
    color: "#b5c98b",
    taxonomyNote: "Kompleks ini pernah mencakup takson yang kini dipisahkan, termasuk Boiga melanota. Sebaran lama tidak boleh diterapkan otomatis pada batas spesies terbaru.",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Boiga/dendrophila" },
    ],
  },
  // #endregion
  // #region Boiga drapiezii (Boiga drapiezii)
  {
    id: "boiga-drapiezii",
    name: "Boiga drapiezii",
    english: "White-spotted Cat Snake",
    scientific: "Boiga drapiezii",
    family: "Colubridae",

    image: snakeImages["boiga-drapiezii"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan hujan dataran rendah hingga sekitar 1.100 m, termasuk sekitar rawa air tawar. Makanan yang dilaporkan: Serangga besar, kadal, katak pohon, telur, dan anak burung. Ular ini memiliki variasi warna hijau maupun cokelat. Selain bergerak di cabang, ia dapat turun ke lantai hutan saat mencari mangsa atau berpindah tempat. Boiga drapiezii adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah White-spotted Cat Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Kalimantan, Natuna, Mentawai. Terutama hidup di pepohonan (arboreal). Berkembang biak dengan bertelur.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Hingga sekitar 2,1 m",
    habitat: "Hutan hujan dataran rendah hingga sekitar 1.100 m, termasuk sekitar rawa air tawar",
    activity: "Hampir seluruhnya arboreal",
    diet: "Serangga besar, kadal, katak pohon, telur, dan anak burung",

    regions: ["Sumatra", "Jawa", "Kalimantan", "Natuna", "Mentawai"],
    traits: ["Tubuh sangat ramping dan memipih ke samping", "Kepala lebar dengan mata besar", "Ada bentuk warna hijau dan cokelat"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Boiga/drapiezii",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Boiga/drapiezii" },
      { label: "Thai National Parks — biologi spesies", url: "https://www.thainationalparks.com/species/boiga-drapiezii" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/white-spotted_cat-snake.htm" },
    ],
  },
  // #endregion
  // #region Boiga irregularis (Boiga irregularis)
  {
    id: "boiga-irregularis",
    name: "Boiga irregularis",
    english: "Brown catsnake",
    scientific: "Boiga irregularis",
    family: "Colubridae",

    image: snakeImages["boiga-irregularis"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan, bakau, dan area budidaya hingga sekitar 1.400 m. Makanan yang dilaporkan: Katak, kadal, burung, dan mamalia kecil. Boiga irregularis adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Brown catsnake. Terutama hidup di pepohonan (arboreal). Berkembang biak dengan bertelur.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Hingga sekitar 2,3 m menurut sumber regional Papua",
    habitat: "Hutan, bakau, dan area budidaya hingga sekitar 1.400 m",
    activity: "Tercatat aktif malam",
    diet: "Katak, kadal, burung, dan mamalia kecil",

    regions: ["Papua"],
    traits: ["Tubuh kecokelatan dengan pita lebih gelap", "Kepala dan mata relatif besar", "Pupil berbentuk celah tegak"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Boiga/irregularis",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Boiga/irregularis" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes-png/brown-cat-snake.htm" },
    ],
  },
  // #endregion
  // #region Boiga jaspidea (Boiga jaspidea)
  {
    id: "boiga-jaspidea",
    name: "Boiga jaspidea",
    english: "Jasper Cat Snake",
    scientific: "Boiga jaspidea",
    family: "Colubridae",

    image: snakeImages["boiga-jaspidea"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan dataran rendah dan hutan rawa. Makanan yang dilaporkan: Cecak, anak burung, telur burung, dan pengerat penghuni pohon. Boiga jaspidea adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Jasper Cat Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Jawa, Kalimantan, Nias. Terutama hidup di pepohonan (arboreal). Berkembang biak dengan bertelur. Pola bintik pada tubuh menjadi dasar perbandingan nama spesies ini dengan batu jasper.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Hingga sekitar 1,5 m",
    habitat: "Hutan dataran rendah dan hutan rawa",
    activity: "Malam; arboreal",
    diet: "Cecak, anak burung, telur burung, dan pengerat penghuni pohon",

    regions: ["Sumatra", "Bangka", "Jawa", "Kalimantan", "Nias"],
    traits: ["Tubuh cokelat kemerahan dengan bintik gelap dan pucat", "Mata sangat besar", "Tenggorokan dan bagian depan perut kekuningan"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Boiga/jaspidea",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Boiga/jaspidea" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/jasper-cat-snake.htm" },
    ],
  },
  // #endregion
  // #region Boiga multomaculata (Boiga multomaculata)
  {
    id: "boiga-multomaculata",
    name: "Boiga multomaculata",
    english: "Many-spotted Cat Snake",
    scientific: "Boiga multomaculata",
    family: "Colubridae",

    image: snakeImages["boiga-multomaculata"] || "",
    credit: "",
    license: "",

    description: "Boiga multomaculata adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Many-spotted Cat Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Bali. Terutama hidup di pepohonan (arboreal).",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Hingga sekitar 77 cm",
    habitat: "Terutama hidup di pepohonan (arboreal)",
    activity: "Dapat ditemukan siang maupun malam",
    diet: "Kadal, cecak, dan katak",
    regions: ["Sumatra", "Jawa", "Bali"],
    traits: ["Tubuh cokelat keabu-abuan dengan deretan bercak", "Garis gelap melewati mata"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Boiga/multomaculata",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Boiga/multomaculata" },
      { label: "Rujukan tambahan biologi", url: "https://www.thainationalparks.com/species/boiga-multomaculata" },
    ],
  },
  // #endregion
  // #region Boiga nigriceps (Boiga nigriceps)
  {
    id: "boiga-nigriceps",
    name: "Boiga nigriceps",
    english: "Black-headed Cat Snake",
    scientific: "Boiga nigriceps",
    family: "Colubridae",

    image: snakeImages["boiga-nigriceps"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan hujan primer dan sekunder, hingga sekitar 1.000 m. Makanan yang dilaporkan: Kadal, katak, burung, dan mamalia kecil. Kepala yang gelap terutama tampak pada individu dewasa; anak dapat belum memperlihatkannya. Ular ini menggunakan pepohonan tetapi juga turun ke tanah untuk mencari mangsa. Boiga nigriceps adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Black-headed Cat Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Bali, Borneo, Nias. Terutama hidup di pepohonan (arboreal). Berkembang biak dengan bertelur. Nama nigriceps mengacu pada kepala gelap yang terlihat pada sebagian individu, bukan ciri mutlak semua individu.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Hingga sekitar 1,75 m",
    habitat: "Hutan hujan primer dan sekunder, hingga sekitar 1.000 m",
    activity: "Tercatat mencari air pada malam hari; banyak menggunakan pepohonan",
    diet: "Kadal, katak, burung, dan mamalia kecil",

    regions: ["Sumatra", "Jawa", "Bali", "Borneo", "Nias"],
    traits: ["Kepala dewasa kelabu gelap", "Anak belum selalu berkepala gelap", "Tubuh cokelat kemerahan atau kelabu zaitun"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Boiga/nigriceps",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Boiga/nigriceps" },
      { label: "Thai National Parks — biologi spesies", url: "https://www.thainationalparks.com/species/boiga-nigriceps" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/black-headed_cat-snake.htm" },
    ],
  },
  // #endregion
  // #region Bungarus candidus (Bungarus candidus)
  {
    id: "bungarus-candidus",
    name: "Ular Weling",
    english: "Blue Krait",
    scientific: "Bungarus candidus",
    family: "Elapidae",

    image: snakeImages["bungarus-candidus"] || "",
    credit: "",
    license: "",

    description: "Pola yang umum adalah pita gelap berselang bagian terang. Namun, terdapat variasi tanpa belang pada sebagian populasi, sehingga pola warna tidak boleh menjadi satu-satunya dasar identifikasi. Bungarus candidus adalah spesies ular dalam keluarga Elapidae. Nama umum berbahasa Inggris yang tercatat adalah Blue Krait. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Bali, Sulawesi. Berkembang biak dengan bertelur.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Hingga sekitar 1,08 m dalam rujukan",
    habitat: "Hutan, lahan pertanian, dan sekitar permukiman di dataran rendah",
    activity: "Terutama malam",
    diet: "Ular lain, kadal, katak, dan ikan",
    regions: ["Sumatra", "Jawa", "Bali", "Sulawesi"],
    traits: ["Pita hitam-putih pada banyak populasi", "Individu di sebagian Jawa dapat berwarna hitam dominan"],
    similar: ["bungarus-fasciatus", "lycodon-subcinctus"],
    source: "https://reptile-database.reptarium.cz/Bungarus/candidus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Bungarus/candidus" },
      { label: "Thai National Parks — biologi spesies", url: "https://www.thainationalparks.com/species/bungarus-candidus" },
    ],
  },
  // #endregion
  // #region Bungarus flaviceps (Bungarus flaviceps)
  {
    id: "bungarus-flaviceps",
    name: "Bungarus flaviceps",
    english: "Red-headed Krait",
    scientific: "Bungarus flaviceps",
    family: "Elapidae",

    image: snakeImages["bungarus-flaviceps"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan hujan dataran rendah dan perbukitan. Makanan yang dilaporkan: Terutama ular lain. Bungarus flaviceps adalah spesies ular dalam keluarga Elapidae. Nama umum berbahasa Inggris yang tercatat adalah Red-headed Krait. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Belitung, Borneo. Berkembang biak dengan bertelur.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Umumnya 1,2–1,5 m; catatan hingga 2,1 m",
    habitat: "Hutan hujan dataran rendah dan perbukitan",
    activity: "Terutama malam",
    diet: "Terutama ular lain",

    regions: ["Sumatra", "Bangka", "Belitung", "Borneo"],
    traits: ["Kepala dan ekor merah", "Tubuh gelap dengan garis terang di sisi", "Sisik tampak mengilap"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Bungarus/flaviceps",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Bungarus/flaviceps" },
      { label: "Rujukan tambahan biologi", url: "https://www.thainationalparks.com/species/bungarus-flaviceps" },
    ],
  },
  // #endregion
  // #region Calamaria bicolor (Calamaria bicolor)
  {
    id: "calamaria-bicolor",
    name: "Calamaria bicolor",
    english: "Two-colored Dwarf Snake",
    scientific: "Calamaria bicolor",
    family: "Colubridae",

    image: snakeImages["calamaria-bicolor"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Lantai hutan dan serasah, termasuk catatan hutan Kalimantan. Calamaria bicolor adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Two-colored Dwarf Snake. Referensi sebarannya mencantumkan antara lain Jawa, Borneo. Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 45 cm",
    habitat: "Lantai hutan dan serasah, termasuk catatan hutan Kalimantan",
    activity: "Umumnya dijumpai malam; menggali dan bersembunyi di serasah",
    diet: "Cacing tanah dan invertebrata kecil",
    regions: ["Jawa", "Borneo"],
    traits: ["Tubuh silindris dan ekor pendek", "Dewasa berpunggung gelap dengan perut kekuningan", "Anak dapat memiliki pita jingga-merah"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Calamaria/bicolor",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Calamaria/bicolor" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.ecologyasia.net/verts/snakes/bicoloured-reed-snake.htm" },
    ],
  },
  // #endregion
  // #region Calamaria linnaei (Calamaria linnaei)
  {
    id: "calamaria-linnaei",
    name: "Calamaria linnaei",
    english: "Linne's Dwarf Snake",
    scientific: "Calamaria linnaei",
    family: "Colubridae",

    image: snakeImages["calamaria-linnaei"] || "",
    credit: "",
    license: "",

    description: "Calamaria linnaei adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Linne's Dwarf Snake. Referensi sebarannya mencantumkan antara lain Bangka, Jawa. Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Sekitar 25–40 cm",
    habitat: "Serasah dan tanah hutan",
    activity: "Hidup tersembunyi di serasah dan menggali",
    diet: "Cacing tanah dan invertebrata kecil",
    regions: ["Bangka", "Jawa"],
    traits: ["Tubuh kecil silindris dan ekor pendek", "Kepala kecil tidak terpisah jelas dari leher"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Calamaria/linnaei",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Calamaria/linnaei" },
    ],
  },
  // #endregion
  // #region Calamaria lumbricoidea (Calamaria lumbricoidea)
  {
    id: "calamaria-lumbricoidea",
    name: "Calamaria lumbricoidea",
    english: "Variable Reed Snake",
    scientific: "Calamaria lumbricoidea",
    family: "Colubridae",

    image: snakeImages["calamaria-lumbricoidea"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan primer dan sekunder matang, dataran rendah hingga sedikitnya 1.500 m. Makanan yang dilaporkan: Terutama cacing tanah; sumber juga melaporkan katak dan kadal kecil. Calamaria lumbricoidea adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Variable Reed Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Kalimantan, Nias, Natuna. Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 65 cm",
    habitat: "Hutan primer dan sekunder matang, dataran rendah hingga sedikitnya 1.500 m",
    activity: "Dapat aktif siang maupun malam; banyak berada di bawah serasah",
    diet: "Terutama cacing tanah; sumber juga melaporkan katak dan kadal kecil",

    regions: ["Sumatra", "Jawa", "Kalimantan", "Nias", "Natuna"],
    traits: ["Punggung dewasa cokelat gelap sampai hitam", "Perut terang dapat berbelang hitam", "Anak dapat berkepala kemerahan"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Calamaria/lumbricoidea",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Calamaria/lumbricoidea" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.ecologyasia.net/verts/snakes/variable_reed-snake.htm" },
    ],
  },
  // #endregion
  // #region Calamaria schlegeli (Calamaria schlegeli)
  {
    id: "calamaria-schlegeli",
    name: "Calamaria schlegeli",
    english: "Pink-headed Reed Snake",
    scientific: "Calamaria schlegeli",
    family: "Colubridae",

    image: snakeImages["calamaria-schlegeli"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Tanah dan serasah hutan. Makanan yang dilaporkan: Invertebrata kecil, termasuk cacing dan serangga. Calamaria schlegeli adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Pink-headed Reed Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Belitung, Jawa, Bali. Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 40 cm",
    habitat: "Tanah dan serasah hutan",
    activity: "Dapat muncul ke permukaan pada malam hari",
    diet: "Invertebrata kecil, termasuk cacing dan serangga",

    regions: ["Sumatra", "Bangka", "Belitung", "Jawa", "Bali"],
    traits: ["Kepala merah muda atau merah pada populasi yang dijelaskan", "Punggung gelap dapat berkilau kebiruan", "Ekor tidak memiliki warna merah seperti kepala"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Calamaria/schlegeli",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Calamaria/schlegeli" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/pink-headed_reed-snake.htm" },
    ],
  },
  // #endregion
  // #region Calliophis bivirgatus (Calliophis bivirgatus)
  {
    id: "calliophis-bivirgatus",
    name: "Ular Cabai",
    english: "Blue Malaysian Coral Snake",
    scientific: "Calliophis bivirgatus",
    family: "Elapidae",

    image: snakeImages["calliophis-bivirgatus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Serasah hutan primer dan sekunder. Makanan yang dilaporkan: Ular lain. Calliophis bivirgatus adalah spesies ular dalam keluarga Elapidae. Nama umum berbahasa Inggris yang tercatat adalah Blue Malaysian Coral Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Borneo, Nias, Mentawai.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Hingga sekitar 1,8 m",
    habitat: "Serasah hutan primer dan sekunder",
    activity: "Sebagian hidup tersembunyi di tanah dan serasah",
    diet: "Ular lain",

    regions: ["Sumatra", "Bangka", "Borneo", "Nias", "Mentawai"],
    traits: ["Kepala, perut, dan ekor merah", "Punggung biru gelap hingga hitam", "Garis biru atau putih di sisi tubuh"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Calliophis/bivirgatus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Calliophis/bivirgatus" },
      { label: "Rujukan tambahan biologi", url: "https://www.thainationalparks.com/species/calliophis-bivirgatus" },
    ],
  },
  // #endregion
  // #region Calliophis intestinalis (Calliophis intestinalis)
  {
    id: "calliophis-intestinalis",
    name: "Calliophis intestinalis",
    english: "Banded Malaysian Coral Snake",
    scientific: "Calliophis intestinalis",
    family: "Elapidae",

    image: snakeImages["calliophis-intestinalis"] || "",
    credit: "",
    license: "",

    description: "Calliophis intestinalis adalah spesies ular dalam keluarga Elapidae. Nama umum berbahasa Inggris yang tercatat adalah Banded Malaysian Coral Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Bali, Mentawai.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Umumnya sekitar 50–70 cm",
    habitat: "Serasah hutan dataran rendah",
    activity: "Sebagian hidup tersembunyi di serasah",
    diet: "Ular kecil dan kadal",
    regions: ["Sumatra", "Jawa", "Bali", "Mentawai"],
    traits: ["Tubuh ramping dengan pola pita pada perut", "Kepala kecil dan sempit"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Calliophis/intestinalis",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Calliophis/intestinalis" },
    ],
  },
  // #endregion
  // #region Calloselasma rhodostoma (Calloselasma rhodostoma)
  {
    id: "calloselasma-rhodostoma",
    name: "Ular Tanah",
    english: "Malayan Pit Viper",
    scientific: "Calloselasma rhodostoma",
    family: "Viperidae",

    image: snakeImages["calloselasma-rhodostoma"] || "",
    credit: "",
    license: "",

    description: "Ular berbisa ini memiliki bercak segitiga gelap pada tubuh. Ia dapat ditemukan di habitat bervegetasi termasuk kebun dan memangsa tikus. Betina menjaga telur setelah diletakkan. Calloselasma rhodostoma adalah spesies ular dalam keluarga Viperidae. Nama umum berbahasa Inggris yang tercatat adalah Malayan Pit Viper. Referensi sebarannya mencantumkan antara lain Jawa. Berkembang biak dengan bertelur.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Rata-rata sekitar 76 cm; dapat sekitar 91 cm",
    habitat: "Hutan pesisir, rumpun bambu, kebun, dan lahan pertanian bervegetasi",
    activity: "Terutama malam; hidup di tanah",
    diet: "Tikus dan mamalia pengerat kecil",

    regions: ["Jawa"],
    traits: ["Bercak gelap berbentuk segitiga", "Warna dasar cokelat, kemerahan, atau keabu-abuan"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Calloselasma/rhodostoma",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Calloselasma/rhodostoma" },
      { label: "Thai National Parks — biologi spesies", url: "https://www.thainationalparks.com/species/calloselasma-rhodostoma" },
    ],
  },
  // #endregion
  // #region Candoia aspera (Candoia aspera)
  {
    id: "candoia-aspera",
    name: "Candoia aspera",
    english: "New Guinea ground boa",
    scientific: "Candoia aspera",
    family: "Boidae",

    image: snakeImages["candoia-aspera"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Permukaan tanah. Candoia aspera adalah spesies ular dalam keluarga Boidae. Nama umum berbahasa Inggris yang tercatat adalah New Guinea ground boa. Referensi sebarannya mencantumkan antara lain Papua, Biak. Referensi mencatat reproduksi ovovivipar, yaitu telur berkembang di tubuh induk hingga anak dilahirkan.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 1 m",
    habitat: "Permukaan tanah",
    activity: "Terutama malam",
    diet: "Katak, kadal, dan mamalia kecil",
    regions: ["Papua", "Biak"],
    traits: ["Tubuh pendek dan tebal", "Ekor pendek", "Sisik tubuh berlunas kuat", "Pola cokelat menyerupai jaring tidak beraturan"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Candoia/aspera",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Candoia/aspera" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes-png/new-guinea-ground-boa.htm" },
    ],
  },
  // #endregion
  // #region Candoia carinata (Candoia carinata)
  {
    id: "candoia-carinata",
    name: "Candoia carinata",
    english: "Pacific boa carinata: New Guinea Tree Boa",
    scientific: "Candoia carinata",
    family: "Boidae",

    image: snakeImages["candoia-carinata"] || "",
    credit: "",
    license: "",

    description: "Candoia carinata adalah spesies ular dalam keluarga Boidae. Nama umum berbahasa Inggris yang tercatat adalah Pacific boa carinata: New Guinea Tree Boa. Referensi sebarannya mencantumkan antara lain Sulawesi, Papua, Maluku, Tanimbar. Sebagian aktivitas berlangsung di pepohonan (semiarboreal).",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 1,2 m",
    habitat: "Sebagian aktivitas berlangsung di pepohonan (semiarboreal)",
    activity: "Terutama malam",
    diet: "Kadal, katak, dan mamalia kecil",
    regions: ["Sulawesi", "Papua", "Maluku", "Tanimbar"],
    traits: ["Tubuh kekar dengan sisik berlunas", "Ekor dapat memegang cabang"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Candoia/carinata",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Candoia/carinata" },
    ],
  },
  // #endregion
  // #region Candoia paulsoni (Candoia paulsoni)
  {
    id: "candoia-paulsoni",
    name: "Candoia paulsoni",
    english: "Solomon Island Ground boa",
    scientific: "Candoia paulsoni",
    family: "Boidae",

    image: snakeImages["candoia-paulsoni"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan dan area pertanian yang terganggu, termasuk perkebunan. Makanan yang dilaporkan: Katak, kadal, dan mamalia kecil. Candoia paulsoni adalah spesies ular dalam keluarga Boidae. Nama umum berbahasa Inggris yang tercatat adalah Solomon Island Ground boa. Referensi sebarannya mencantumkan antara lain Halmahera, Talaud. Rujukan ekologi menggunakan nama historis Candoia carinata paulsoni; ID model dipertahankan sebagai candoia-paulsoni.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 1 m menurut sumber regional Papua",
    habitat: "Hutan dan area pertanian yang terganggu, termasuk perkebunan",
    activity: "Terutama malam",
    diet: "Katak, kadal, dan mamalia kecil",

    regions: ["Halmahera", "Talaud"],
    traits: ["Tubuh kekar dengan ekor pendek", "Pola punggung berbentuk belah ketupat atau zig-zag", "Warna dasar cokelat hingga krem"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Candoia/paulsoni",
    color: "#b5c98b",
    taxonomyNote: "Rujukan ekologi menggunakan nama historis Candoia carinata paulsoni; ID model dipertahankan sebagai candoia-paulsoni.",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Candoia/paulsoni" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes-png/pacific-ground-boa.htm" },
    ],
  },
  // #endregion
  // #region Cerberus schneiderii (Cerberus schneiderii)
  {
    id: "cerberus-schneiderii",
    name: "Cerberus schneiderii",
    english: "Southeast Asian Bockadam",
    scientific: "Cerberus schneiderii",
    family: "Homalopsidae",

    image: snakeImages["cerberus-schneiderii"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Bakau dan dataran lumpur pasang surut. Makanan yang dilaporkan: Ikan dan invertebrata. Cerberus schneiderii adalah spesies ular dalam keluarga Homalopsidae. Nama umum berbahasa Inggris yang tercatat adalah Southeast Asian Bockadam. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Bali, Borneo, Sulawesi. Referensi mencatat reproduksi ovovivipar, yaitu telur berkembang di tubuh induk hingga anak dilahirkan.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Hingga sekitar 1,08 m",
    habitat: "Bakau dan dataran lumpur pasang surut",
    activity: "Malam, terutama ketika air surut",
    diet: "Ikan dan invertebrata",

    regions: ["Sumatra", "Jawa", "Bali", "Borneo", "Sulawesi"],
    traits: ["Mata di bagian atas kepala", "Garis gelap dari mata ke leher", "Warna punggung cokelat keabu-abuan"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Cerberus/schneiderii",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Cerberus/schneiderii" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/dog-faced_water-snake.htm" },
    ],
  },
  // #endregion
  // #region Chrysopelea paradisi (Chrysopelea paradisi)
  {
    id: "chrysopelea-paradisi",
    name: "Ular Terbang",
    english: "Paradise Tree Snake",
    scientific: "Chrysopelea paradisi",
    family: "Colubridae",

    image: snakeImages["chrysopelea-paradisi"] || "",
    credit: "",
    license: "",

    description: "Spesies ini dapat meluncur dari tempat tinggi dengan mengubah penampang tubuh dan membuat gerakan bergelombang. Kemampuan ini membantu perpindahan di lingkungan pepohonan. Chrysopelea paradisi adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Paradise Tree Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Belitung, Jawa, Bali. Terutama hidup di pepohonan (arboreal).",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Hingga sekitar 1,2 m",
    habitat: "Hutan lembap dan pepohonan",
    activity: "Siang",
    diet: "Terutama kadal; juga kelelawar",

    regions: ["Sumatra", "Bangka", "Belitung", "Jawa", "Bali"],
    traits: ["Dapat meluncur antarpohon", "Tubuh dipipihkan saat meluncur"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Chrysopelea/paradisi",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Chrysopelea/paradisi" },
      { label: "Thai National Parks — biologi spesies", url: "https://www.thainationalparks.com/species/chrysopelea-paradisi" },
    ],
  },
  // #endregion
  // #region Chrysopelea pelias (Chrysopelea pelias)
  {
    id: "chrysopelea-pelias",
    name: "Ular Terbang",
    english: "Twin-barred Tree Snake",
    scientific: "Chrysopelea pelias",
    family: "Colubridae",

    image: snakeImages["chrysopelea-pelias"] || "",
    credit: "",
    license: "",

    description: "Chrysopelea pelias adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Twin-barred Tree Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Jawa, Borneo, Nias. Terutama hidup di pepohonan (arboreal). Berkembang biak dengan bertelur.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Hingga sekitar 1 m",
    habitat: "Hutan dan tepi hutan; sebagian besar di pepohonan",
    activity: "Siang",
    diet: "Kadal, katak, dan mamalia kecil",
    regions: ["Sumatra", "Bangka", "Jawa", "Borneo", "Nias"],
    traits: ["Dapat meluncur antarpohon", "Tubuh ramping dan dipipihkan saat meluncur", "Pola pita pada kepala"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Chrysopelea/pelias",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Chrysopelea/pelias" },
    ],
  },
  // #endregion
  // #region Coelognathus erythrurus (Coelognathus erythrurus)
  {
    id: "coelognathus-erythrurus",
    name: "Coelognathus erythrurus",
    english: "Reddish Rat Snake",
    scientific: "Coelognathus erythrurus",
    family: "Colubridae",

    image: snakeImages["coelognathus-erythrurus"] || "",
    credit: "",
    license: "",

    description: "Coelognathus erythrurus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Reddish Rat Snake. Referensi sebarannya mencantumkan antara lain Borneo, Sulawesi.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 1,5 m",
    habitat: "Hutan dan lahan pertanian",
    activity: "Siang",
    diet: "Pengerat, burung, dan vertebrata kecil",
    regions: ["Borneo", "Sulawesi"],
    traits: ["Tubuh cokelat kemerahan", "Garis gelap di sisi kepala"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Coelognathus/erythrurus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Coelognathus/erythrurus" },
    ],
  },
  // #endregion
  // #region Coelognathus flavolineatus (Coelognathus flavolineatus)
  {
    id: "coelognathus-flavolineatus",
    name: "Coelognathus flavolineatus",
    english: "Black Copper Rat Snake",
    scientific: "Coelognathus flavolineatus",
    family: "Colubridae",

    image: snakeImages["coelognathus-flavolineatus"] || "",
    credit: "",
    license: "",

    description: "Spesies Asia Tenggara ini sebelumnya ditempatkan dalam genus Elaphe. Sebarannya di Indonesia antara lain mencakup Jawa, Kalimantan, Sumatra, dan Bali. Coelognathus flavolineatus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Black Copper Rat Snake.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Dapat mencapai sekitar 2 m",
    habitat: "Hutan dan lahan pertanian dataran rendah",
    activity: "Siang",
    diet: "Pengerat dan vertebrata kecil",
    regions: ["Jawa", "Kalimantan", "Sumatra", "Bali"],
    traits: ["Tubuh gelap dengan garis kuning samar", "Terampil memanjat dan bergerak di tanah"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Coelognathus/flavolineatus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Coelognathus/flavolineatus" },
      { label: "Thai National Parks — biologi spesies", url: "https://www.thainationalparks.com/species/coelognathus-flavolineatus" },
    ],
  },
  // #endregion
  // #region Coelognathus radiatus (Coelognathus radiatus)
  {
    id: "coelognathus-radiatus",
    name: "Coelognathus radiatus",
    english: "Radiated Ratsnakes",
    scientific: "Coelognathus radiatus",
    family: "Colubridae",

    image: snakeImages["coelognathus-radiatus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan dan lahan pertanian dataran rendah hingga perbukitan. Makanan yang dilaporkan: Pengerat dan vertebrata kecil lainnya. Spesies ini tercatat sebagai ular tidak berbisa. Meski demikian, individu yang merasa terancam dapat menunjukkan perilaku defensif. Coelognathus radiatus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Radiated Ratsnakes. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Jawa, Bali, Kalimantan.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 2,3 m",
    habitat: "Hutan dan lahan pertanian dataran rendah hingga perbukitan",
    activity: "Siang; terutama di tanah, juga dapat memanjat",
    diet: "Pengerat dan vertebrata kecil lainnya",

    regions: ["Sumatra", "Bangka", "Jawa", "Bali", "Kalimantan"],
    traits: ["Kepala berwarna tembaga dengan garis hitam memancar dari mata", "Garis gelap memanjang di tubuh", "Dapat berpura-pura mati ketika sangat terancam"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Coelognathus/radiatus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Coelognathus/radiatus" },
      { label: "Thai National Parks — biologi spesies", url: "https://www.thainationalparks.com/species/coelognathus-radiatus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/copperhead-racer.htm" },
    ],
  },
  // #endregion
  // #region Coelognathus subradiatus (Coelognathus subradiatus)
  {
    id: "coelognathus-subradiatus",
    name: "Coelognathus subradiatus",
    english: "Lesser Sunda Rat Snake",
    scientific: "Coelognathus subradiatus",
    family: "Colubridae",

    image: snakeImages["coelognathus-subradiatus"] || "",
    credit: "",
    license: "",

    description: "Coelognathus subradiatus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Lesser Sunda Rat Snake. Referensi sebarannya mencantumkan antara lain Lombok, Sumbawa, Sumba, Flores, Komodo. Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 1,5 m",
    habitat: "Hutan kering, savana, dan lahan pertanian",
    activity: "Siang",
    diet: "Pengerat dan vertebrata kecil",
    regions: ["Lombok", "Sumbawa", "Sumba", "Flores", "Komodo"],
    traits: ["Garis gelap memancar dari mata", "Garis gelap memanjang di tubuh"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Coelognathus/subradiatus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Coelognathus/subradiatus" },
    ],
  },
  // #endregion
  // #region Craspedocephalus andalasensis (Craspedocephalus andalasensis)
  {
    id: "craspedocephalus-andalasensis",
    name: "Craspedocephalus andalasensis",
    english: "Sumatran Palm Pit Viper",
    scientific: "Craspedocephalus andalasensis",
    family: "Viperidae",

    image: snakeImages["craspedocephalus-andalasensis"] || "",
    credit: "",
    license: "",

    description: "Craspedocephalus andalasensis adalah spesies ular dalam keluarga Viperidae. Nama umum berbahasa Inggris yang tercatat adalah Sumatran Palm Pit Viper. Referensi sebarannya mencantumkan antara lain Sumatra. Sebagian aktivitas berlangsung di pepohonan (semiarboreal).",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Sekitar 60–80 cm",
    habitat: "Hutan perbukitan dan pegunungan Sumatra; sebagian di pepohonan",
    activity: "Terutama malam",
    diet: "Katak, kadal, dan mamalia kecil",
    regions: ["Sumatra"],
    traits: ["Kepala segitiga", "Tubuh kekar berpola"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Craspedocephalus/andalasensis",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Craspedocephalus/andalasensis" },
    ],
  },
  // #endregion
  // #region Craspedocephalus puniceus (Craspedocephalus puniceus)
  {
    id: "craspedocephalus-puniceus",
    name: "Craspedocephalus puniceus",
    english: "Ashy Pit Viper",
    scientific: "Craspedocephalus puniceus",
    family: "Viperidae",

    image: snakeImages["craspedocephalus-puniceus"] || "",
    credit: "",
    license: "",

    description: "Craspedocephalus puniceus adalah spesies ular dalam keluarga Viperidae. Nama umum berbahasa Inggris yang tercatat adalah Ashy Pit Viper. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Natuna, Mentawai. Terutama hidup di pepohonan (arboreal). Referensi mencatat reproduksi ovovivipar, yaitu telur berkembang di tubuh induk hingga anak dilahirkan.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Hingga sekitar 60 cm",
    habitat: "Terutama hidup di pepohonan (arboreal)",
    activity: "Terutama malam",
    diet: "Kadal, katak, dan mamalia kecil",
    regions: ["Sumatra", "Jawa", "Natuna", "Mentawai"],
    traits: ["Warna kelabu hingga cokelat kemerahan dengan bintik halus", "Kepala segitiga"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Craspedocephalus/puniceus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Craspedocephalus/puniceus" },
    ],
  },
  // #endregion
  // #region Cylindrophis melanotus (Cylindrophis melanotus)
  {
    id: "cylindrophis-melanotus",
    name: "Cylindrophis melanotus",
    english: "Black Pipe Snake",
    scientific: "Cylindrophis melanotus",
    family: "Cylindrophiidae",

    image: snakeImages["cylindrophis-melanotus"] || "",
    credit: "",
    license: "",

    description: "Cylindrophis melanotus adalah spesies ular dalam keluarga Cylindrophiidae. Nama umum berbahasa Inggris yang tercatat adalah Black Pipe Snake. Referensi sebarannya mencantumkan antara lain Sulawesi, Halmahera. Referensi mencatat reproduksi ovovivipar, yaitu telur berkembang di tubuh induk hingga anak dilahirkan. Nama melanotus mengacu pada bagian punggung berwarna gelap.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 60 cm",
    habitat: "Serasah dan tanah lembap hutan; menggali",
    activity: "Terutama malam",
    diet: "Cacing, ular kecil, dan kadal kecil",
    regions: ["Sulawesi", "Halmahera"],
    traits: ["Tubuh silindris dengan ekor tumpul", "Ekor dapat ditegakkan sebagai gertakan"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Cylindrophis/melanotus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Cylindrophis/melanotus" },
    ],
  },
  // #endregion
  // #region Cylindrophis opisthorhodus (Cylindrophis opisthorhodus)
  {
    id: "cylindrophis-opisthorhodus",
    name: "Cylindrophis opisthorhodus",
    english: "Island Pipe Snake",
    scientific: "Cylindrophis opisthorhodus",
    family: "Cylindrophiidae",

    image: snakeImages["cylindrophis-opisthorhodus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Lantai hutan dengan tanah liat dan serasah lembap, tercatat sekitar 500 m. Makanan yang dilaporkan: Diduga ular lain dan kadal kecil; diet belum dipastikan melalui penelitian rinci. Cylindrophis opisthorhodus adalah spesies ular dalam keluarga Cylindrophiidae. Nama umum berbahasa Inggris yang tercatat adalah Island Pipe Snake. Referensi sebarannya mencantumkan antara lain Lombok, Sumbawa, Flores, Komodo. Referensi mencatat reproduksi ovovivipar, yaitu telur berkembang di tubuh induk hingga anak dilahirkan.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 50 cm",
    habitat: "Lantai hutan dengan tanah liat dan serasah lembap, tercatat sekitar 500 m",
    activity: "Malam; terestrial dan diduga menggali",
    diet: "Diduga ular lain dan kadal kecil; diet belum dipastikan melalui penelitian rinci",

    regions: ["Lombok", "Sumbawa", "Flores", "Komodo"],
    traits: ["Tubuh silindris dengan ekor tumpul", "Ekor dapat ditegakkan sebagai gertakan"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Cylindrophis/opisthorhodus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Cylindrophis/opisthorhodus" },
      { label: "Rujukan tambahan biologi", url: "https://doi.org/10.2305/IUCN.UK.2021-3.RLTS.T42492736A42492740.en" },
    ],
  },
  // #endregion
  // #region Cylindrophis ruffus (Cylindrophis ruffus)
  {
    id: "cylindrophis-ruffus",
    name: "Ular Pipa",
    english: "Red-tailed Pipe Snake",
    scientific: "Cylindrophis ruffus",
    family: "Cylindrophiidae",

    image: snakeImages["cylindrophis-ruffus"] || "",
    credit: "",
    license: "",

    description: "Cylindrophis ruffus adalah spesies ular dalam keluarga Cylindrophiidae. Nama umum berbahasa Inggris yang tercatat adalah Red-tailed Pipe Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Jawa, Borneo, Sulawesi. Referensi mencatat reproduksi ovovivipar, yaitu telur berkembang di tubuh induk hingga anak dilahirkan.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 1 m",
    habitat: "Tanah lembap, sawah, kebun, dan tepi hutan",
    activity: "Terutama malam; menggali",
    diet: "Ular kecil, belut, dan hewan kecil",
    regions: ["Sumatra", "Bangka", "Jawa", "Borneo", "Sulawesi"],
    traits: ["Perut dan sisi ekor berpita merah dan putih", "Ekor ditegakkan dan dipamerkan saat terancam", "Kepala kecil tidak terpisah jelas dari leher"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Cylindrophis/ruffus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Cylindrophis/ruffus" },
    ],
  },
  // #endregion
  // #region Daboia siamensis (Daboia siamensis)
  {
    id: "daboia-siamensis",
    name: "Daboia siamensis",
    english: "Eastern Russel’s Viper",
    scientific: "Daboia siamensis",
    family: "Viperidae",

    image: snakeImages["daboia-siamensis"] || "",
    credit: "",
    license: "",

    description: "Daboia siamensis adalah spesies ular dalam keluarga Viperidae. Nama umum berbahasa Inggris yang tercatat adalah Eastern Russel’s Viper. Referensi sebarannya mencantumkan antara lain Jawa, Flores, Komodo. Berkembang biak dengan melahirkan anak.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Umumnya 0,9–1,2 m; dapat lebih",
    habitat: "Padang rumput, savana, lahan pertanian, dan semak",
    activity: "Terutama malam",
    diet: "Pengerat, kadal, dan burung",
    regions: ["Jawa", "Flores", "Komodo"],
    traits: ["Bercak bulat atau oval besar berderet di punggung", "Kepala segitiga", "Mendesis keras saat terancam"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Daboia/siamensis",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Daboia/siamensis" },
    ],
  },
  // #endregion
  // #region Dendrelaphis calligaster (Dendrelaphis calligaster)
  {
    id: "dendrelaphis-calligaster",
    name: "Dendrelaphis calligaster",
    english: "Green treesnake",
    scientific: "Dendrelaphis calligaster",
    family: "Colubridae",

    image: snakeImages["dendrelaphis-calligaster"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Vegetasi rapat di hutan hujan. Makanan yang dilaporkan: Katak, burung, reptil kecil, dan mamalia kecil. Dendrelaphis calligaster adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Green treesnake. Referensi sebarannya mencantumkan antara lain Papua, Biak, Tanimbar. Terutama hidup di pepohonan (arboreal). Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 1,2 m",
    habitat: "Vegetasi rapat di hutan hujan",
    activity: "Terutama siang",
    diet: "Katak, burung, reptil kecil, dan mamalia kecil",

    regions: ["Papua", "Biak", "Tanimbar"],
    traits: ["Punggung zaitun atau cokelat", "Garis hitam melintasi mata", "Perut krem atau kuning"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Dendrelaphis/calligaster",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Dendrelaphis/calligaster" },
      { label: "Rujukan tambahan biologi", url: "https://www.jcu.edu.au/discover-nature-at-jcu/animals/reptiles-and-amphibians-by-scientific-name/dendrelaphis-calligaster" },
    ],
  },
  // #endregion
  // #region Dendrelaphis caudolineatus (Dendrelaphis caudolineatus)
  {
    id: "dendrelaphis-caudolineatus",
    name: "Dendrelaphis caudolineatus",
    english: "Gray Bronzeback",
    scientific: "Dendrelaphis caudolineatus",
    family: "Colubridae",

    image: snakeImages["dendrelaphis-caudolineatus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan tertutup, pertumbuhan sekunder, dan semak. Dendrelaphis caudolineatus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Gray Bronzeback. Referensi sebarannya mencantumkan antara lain Sumatra, Borneo, Natuna. Terutama hidup di pepohonan (arboreal). Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 1,5 m",
    habitat: "Hutan tertutup, pertumbuhan sekunder, dan semak",
    activity: "Siang; menggunakan pepohonan rendah dan semak, juga turun ke tanah",
    diet: "Kadal dan katak",
    regions: ["Sumatra", "Borneo", "Natuna"],
    traits: ["Tubuh panjang", "Sering bergerak di vegetasi rendah"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Dendrelaphis/caudolineatus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Dendrelaphis/caudolineatus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/striped-bronzeback.htm" },
    ],
  },
  // #endregion
  // #region Dendrelaphis formosus (Dendrelaphis formosus)
  {
    id: "dendrelaphis-formosus",
    name: "Dendrelaphis formosus",
    english: "Elegant Bronzeback",
    scientific: "Dendrelaphis formosus",
    family: "Colubridae",

    image: snakeImages["dendrelaphis-formosus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Pepohonan hutan hujan dataran rendah. Makanan yang dilaporkan: Cecak dan kadal yang hidup di pohon. Dendrelaphis formosus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Elegant Bronzeback. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Belitung, Jawa, Kalimantan. Terutama hidup di pepohonan (arboreal). Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 1,4 m",
    habitat: "Pepohonan hutan hujan dataran rendah",
    activity: "Siang; terutama di pepohonan",
    diet: "Cecak dan kadal yang hidup di pohon",

    regions: ["Sumatra", "Bangka", "Belitung", "Jawa", "Kalimantan"],
    traits: ["Tubuh sangat ramping", "Mata besar", "Garis hitam tebal dari moncong melewati mata"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Dendrelaphis/formosus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Dendrelaphis/formosus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/elegant_bronzeback.htm" },
    ],
  },
  // #endregion
  // #region Dendrelaphis haasi (Dendrelaphis haasi)
  {
    id: "dendrelaphis-haasi",
    name: "Dendrelaphis haasi",
    english: "Haas’s Bronzeback snake",
    scientific: "Dendrelaphis haasi",
    family: "Colubridae",

    image: snakeImages["dendrelaphis-haasi"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan hujan dataran rendah dan hutan sekunder matang; tercatat di vegetasi dekat aliran air. Dendrelaphis haasi adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Haas’s Bronzeback snake. Referensi sebarannya mencantumkan antara lain Sumatra, Belitung, Jawa, Borneo, Nias. Terutama hidup di pepohonan (arboreal). Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 94 cm",
    habitat: "Hutan hujan dataran rendah dan hutan sekunder matang; tercatat di vegetasi dekat aliran air",
    activity: "Terutama siang",
    diet: "Kadal dan katak",
    regions: ["Sumatra", "Belitung", "Jawa", "Borneo", "Nias"],
    traits: [],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Dendrelaphis/haasi",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Dendrelaphis/haasi" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/haas_bronzeback.htm" },
    ],
  },
  // #endregion
  // #region Dendrelaphis inornatus (Dendrelaphis inornatus)
  {
    id: "dendrelaphis-inornatus",
    name: "Dendrelaphis inornatus",
    english: "Lesser Sunda Bronzeback",
    scientific: "Dendrelaphis inornatus",
    family: "Colubridae",

    image: snakeImages["dendrelaphis-inornatus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan musim dan savana; di Bali tercatat hingga sekitar 700 m. Makanan yang dilaporkan: Kadal dan katak. Dendrelaphis inornatus adalah spesies ular dalam keluarga Colubridae. Referensi sebarannya mencantumkan antara lain Sumbawa, Sumba, Flores, Komodo, Timor. Terutama hidup di pepohonan (arboreal). Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Sekitar 1 m",
    habitat: "Hutan musim dan savana; di Bali tercatat hingga sekitar 700 m",
    activity: "Siang; sering di vegetasi",
    diet: "Kadal dan katak",

    regions: ["Sumbawa", "Sumba", "Flores", "Komodo", "Timor"],
    traits: ["Punggung perunggu sampai zaitun", "Tubuh ramping", "Garis gelap di sisi kepala"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Dendrelaphis/inornatus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Dendrelaphis/inornatus" },
      { label: "Rujukan tambahan biologi", url: "https://baliwildlife.com/encyclopedia/animals/reptiles/snakes/lesser-sundas-bronzeback-dendrelaphis-inornatus/" },
    ],
  },
  // #endregion
  // #region Dendrelaphis marenae (Dendrelaphis marenae)
  {
    id: "dendrelaphis-marenae",
    name: "Dendrelaphis marenae",
    english: "Maren’s Bronzeback",
    scientific: "Dendrelaphis marenae",
    family: "Colubridae",

    image: snakeImages["dendrelaphis-marenae"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Tepian hutan, lahan pertanian, dan lingkungan permukiman dalam studi setempat. Dendrelaphis marenae adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Maren’s Bronzeback. Referensi sebarannya mencantumkan antara lain Sulawesi. Terutama hidup di pepohonan (arboreal). Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 1 m",
    habitat: "Tepian hutan, lahan pertanian, dan lingkungan permukiman dalam studi setempat",
    activity: "Beraktivitas siang; dilaporkan beristirahat di semak pada malam hari",
    diet: "Kadal dan katak",
    regions: ["Sulawesi"],
    traits: ["Tubuh ramping", "Garis gelap melewati mata"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Dendrelaphis/marenae",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Dendrelaphis/marenae" },
      { label: "Rujukan tambahan biologi", url: "https://doi.org/10.1016/j.japb.2020.11.005" },
    ],
  },
  // #endregion
  // #region Dendrelaphis pictus (Dendrelaphis pictus)
  {
    id: "dendrelaphis-pictus",
    name: "Dendrelaphis pictus",
    english: "Painted Bronzeback",
    scientific: "Dendrelaphis pictus",
    family: "Colubridae",

    image: snakeImages["dendrelaphis-pictus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Tepi hutan, semak sekunder, taman, dan kebun. Makanan yang dilaporkan: Terutama kadal dan katak. Ciri yang tercatat meliputi garis terang di sisi tubuh dan garis gelap yang melewati mata. Warna punggung dapat tampak cokelat atau kehijauan. Dendrelaphis pictus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Painted Bronzeback. Terutama hidup di pepohonan (arboreal).",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 1,25 m",
    habitat: "Tepi hutan, semak sekunder, taman, dan kebun",
    activity: "Siang; beristirahat di cabang pada malam hari",
    diet: "Terutama kadal dan katak",

    regions: ["Sumatra", "Jawa", "Bali", "Kalimantan"],
    traits: ["Kepala cokelat-perunggu", "Garis gelap melewati mata", "Garis krem dan hitam di sisi tubuh", "Kulit antarsisik dapat tampak kebiruan"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Dendrelaphis/pictus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Dendrelaphis/pictus" },
      { label: "Thai National Parks — biologi spesies", url: "https://www.thainationalparks.com/species/dendrelaphis-pictus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/painted_bronzeback.htm" },
    ],
  },
  // #endregion
  // #region Dendrelaphis striatus (Dendrelaphis striatus)
  {
    id: "dendrelaphis-striatus",
    name: "Dendrelaphis striatus",
    english: "Banded Bronzeback",
    scientific: "Dendrelaphis striatus",
    family: "Colubridae",

    image: snakeImages["dendrelaphis-striatus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan dataran rendah. Dendrelaphis striatus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Banded Bronzeback. Referensi sebarannya mencantumkan antara lain Sumatra, Kalimantan, Nias. Terutama hidup di pepohonan (arboreal). Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 1,02 m",
    habitat: "Hutan dataran rendah",
    activity: "Siang; bergerak di tanah dan vegetasi",
    diet: "Kadal dan katak",
    regions: ["Sumatra", "Kalimantan", "Nias"],
    traits: ["Tubuh ramping dan ekor panjang", "Pita miring hitam pada tubuh", "Bagian depan tubuh kekuningan dan belakang kebiruan"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Dendrelaphis/striatus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Dendrelaphis/striatus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/cohns-bronzeback.htm" },
    ],
  },
  // #endregion
  // #region Dendrelaphis subocularis (Dendrelaphis subocularis)
  {
    id: "dendrelaphis-subocularis",
    name: "Dendrelaphis subocularis",
    english: "Mountain Bronzeback",
    scientific: "Dendrelaphis subocularis",
    family: "Colubridae",

    image: snakeImages["dendrelaphis-subocularis"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan dan tepi hutan perbukitan. Makanan yang dilaporkan: Katak dan kadal. Dendrelaphis subocularis adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Mountain Bronzeback. Referensi sebarannya mencantumkan antara lain Jawa. Terutama hidup di pepohonan (arboreal). Berkembang biak dengan bertelur. Sisik subokular di bawah mata menjadi salah satu karakter penting dalam pembedaannya.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Sekitar 63–88 cm dalam sumber regional",
    habitat: "Hutan dan tepi hutan perbukitan",
    activity: "Siang; terutama di pepohonan",
    diet: "Katak dan kadal",

    regions: ["Jawa"],
    traits: ["Tubuh ramping", "Moncong membulat", "Tepi sisik punggung gelap"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Dendrelaphis/subocularis",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Dendrelaphis/subocularis" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/mountain-bronzeback.htm" },
    ],
  },
  // #endregion
  // #region Dendrelaphis underwoodi (Dendrelaphis underwoodi)
  {
    id: "dendrelaphis-underwoodi",
    name: "Dendrelaphis underwoodi",
    english: "Underwood’s Bronzeback snake",
    scientific: "Dendrelaphis underwoodi",
    family: "Colubridae",

    image: snakeImages["dendrelaphis-underwoodi"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Habitat perbukitan dan pegunungan, berdasarkan sedikit spesimen yang diketahui. Dendrelaphis underwoodi adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Underwood’s Bronzeback snake. Referensi sebarannya mencantumkan antara lain Jawa. Terutama hidup di pepohonan (arboreal). Berkembang biak dengan bertelur. Nama spesies ini menghormati herpetolog Garth Underwood.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 1 m",
    habitat: "Habitat perbukitan dan pegunungan, berdasarkan sedikit spesimen yang diketahui",
    activity: "Terutama siang",
    diet: "Kadal dan katak",
    regions: ["Jawa"],
    traits: ["Tubuh ramping", "Garis gelap melewati mata"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Dendrelaphis/underwoodi",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Dendrelaphis/underwoodi" },
      { label: "Rujukan tambahan biologi", url: "https://dare.uva.nl/id/349ea44e-a741-4e51-ac7f-619b1d2f03e8" },
    ],
  },
  // #endregion
  // #region Dryophiops rubescens (Dryophiops rubescens)
  {
    id: "dryophiops-rubescens",
    name: "Dryophiops rubescens",
    english: "Brown or) Red Whip Snake",
    scientific: "Dryophiops rubescens",
    family: "Colubridae",

    image: snakeImages["dryophiops-rubescens"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan primer, hutan sekunder matang, dan tepian hutan. Makanan yang dilaporkan: Kadal dan katak. Dryophiops rubescens adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Brown or) Red Whip Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Kalimantan, Natuna, Mentawai. Terutama hidup di pepohonan (arboreal). Berkembang biak dengan bertelur. Penamaan rubescens berkaitan dengan warna tubuh cokelat kemerahan.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Hingga sekitar 1 m",
    habitat: "Hutan primer, hutan sekunder matang, dan tepian hutan",
    activity: "Siang; arboreal",
    diet: "Kadal dan katak",

    regions: ["Sumatra", "Jawa", "Kalimantan", "Natuna", "Mentawai"],
    traits: ["Tubuh ramping abu-abu hingga cokelat kemerahan", "Bercak kecil pada punggung", "Garis hitam melewati mata"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Dryophiops/rubescens",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Dryophiops/rubescens" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.ecologyasia.net/verts/snakes/keel-bellied-whip-snake.htm" },
    ],
  },
  // #endregion
  // #region Elaphe taeniura (Elaphe taeniura)
  {
    id: "elaphe-taeniura",
    name: "Elaphe taeniura",
    english: "Beauty Snake (friesei: Taiwan Beauty Snake",
    scientific: "Elaphe taeniura",
    family: "Colubridae",

    image: snakeImages["elaphe-taeniura"] || "",
    credit: "",
    license: "",

    description: "Elaphe taeniura adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Beauty Snake (friesei: Taiwan Beauty Snake. Sebagian aktivitas berlangsung di pepohonan (semiarboreal).",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Dapat mencapai sekitar 2 m",
    habitat: "Sebagian aktivitas berlangsung di pepohonan (semiarboreal)",
    activity: "Terutama siang",
    diet: "Pengerat, burung, dan telur",
    regions: [],
    traits: [],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Elaphe/taeniura",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Elaphe/taeniura" },
    ],
  },
  // #endregion
  // #region Elapoidis fusca (Elapoidis fusca)
  {
    id: "elapoidis-fusca",
    name: "Elapoidis fusca",
    english: "",
    scientific: "Elapoidis fusca",
    family: "Colubridae",

    image: snakeImages["elapoidis-fusca"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Serasah hutan subpegunungan dan pegunungan sekitar 900–1.500 m. Elapoidis fusca adalah spesies ular dalam keluarga Colubridae. Referensi sebarannya mencantumkan antara lain Jawa, Borneo. Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 60 cm",
    habitat: "Serasah hutan subpegunungan dan pegunungan sekitar 900–1.500 m",
    activity: "Sebagian menggali dan bersembunyi di serasah",
    diet: "Belum terverifikasi dalam paket ini",

    regions: ["Jawa", "Borneo"],
    traits: ["Tubuh ramping gelap dan mengilap"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Elapoidis/fusca",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Elapoidis/fusca" },
      { label: "Rujukan tambahan biologi", url: "https://sipus-old.unpak.ac.id/file/PANDUAN%20BERGAMBAR%20ULAR%20JAWA_compressed.pdf" },
    ],
  },
  // #endregion
  // #region Enhydris enhydris (Enhydris enhydris)
  {
    id: "enhydris-enhydris",
    name: "Enhydris enhydris",
    english: "Rainbow Mud Snake",
    scientific: "Enhydris enhydris",
    family: "Homalopsidae",

    image: snakeImages["enhydris-enhydris"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Rawa air tawar, kolam pedesaan, dan persawahan. Makanan yang dilaporkan: Terutama ikan; juga dilaporkan memakan amfibi dan vertebrata kecil. Ular air ini memiliki taring belakang. Klasifikasi keluarga pada profil mengikuti referensi taksonomi, yaitu Homalopsidae. Enhydris enhydris adalah spesies ular dalam keluarga Homalopsidae. Nama umum berbahasa Inggris yang tercatat adalah Rainbow Mud Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Belitung, Jawa, Kalimantan. Perairan tawar. Referensi mencatat reproduksi ovovivipar, yaitu telur berkembang di tubuh induk hingga anak dilahirkan.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Hingga sekitar 81 cm",
    habitat: "Rawa air tawar, kolam pedesaan, dan persawahan",
    activity: "Terutama malam",
    diet: "Terutama ikan; juga dilaporkan memakan amfibi dan vertebrata kecil",

    regions: ["Sumatra", "Bangka", "Belitung", "Jawa", "Kalimantan"],
    traits: ["Dua garis pucat memanjang di punggung", "Garis bertemu pada bagian atas kepala"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Enhydris/enhydris",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Enhydris/enhydris" },
      { label: "Thai National Parks — biologi spesies", url: "https://www.thainationalparks.com/species/enhydris-enhydris" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/rainbow-water-snake.htm" },
    ],
  },
  // #endregion
  // #region Fordonia leucobalia (Fordonia leucobalia)
  {
    id: "fordonia-leucobalia",
    name: "Fordonia leucobalia",
    english: "Crab-eating (Water) Snake",
    scientific: "Fordonia leucobalia",
    family: "Homalopsidae",

    image: snakeImages["fordonia-leucobalia"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Bakau dan perairan pasang surut. Makanan yang dilaporkan: Kepiting dan ikan kecil. Ular perairan ini dikenal sebagai pemakan kepiting. Letak mata di bagian atas kepala dan lubang hidung yang dapat menutup mendukung aktivitasnya di lingkungan pasang surut. Fordonia leucobalia adalah spesies ular dalam keluarga Homalopsidae. Nama umum berbahasa Inggris yang tercatat adalah Crab-eating (Water) Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Borneo, Papua, Seram. Lingkungan pesisir; sebagian aktivitas berhubungan dengan perairan laut. Referensi mencatat reproduksi ovovivipar, yaitu telur berkembang di tubuh induk hingga anak dilahirkan.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Hingga sekitar 95 cm",
    habitat: "Bakau dan perairan pasang surut",
    activity: "Terutama malam; di perairan pasang surut",
    diet: "Kepiting dan ikan kecil",

    regions: ["Sumatra", "Jawa", "Borneo", "Papua", "Seram"],
    traits: ["Mata berada di bagian atas kepala", "Perut pucat", "Warna punggung dapat cokelat, kelabu, atau kehitaman"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Fordonia/leucobalia",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Fordonia/leucobalia" },
      { label: "Thai National Parks — biologi spesies", url: "https://www.thainationalparks.com/species/fordonia-leucobalia" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/crab-eating_water-snake.htm" },
    ],
  },
  // #endregion
  // #region Fowlea melanzostus (Fowlea melanzosta)
  {
    id: "fowlea-melanzostus",
    name: "Fowlea melanzostus",
    english: "Javanese Keelback Water snake",
    scientific: "Fowlea melanzosta",
    family: "Colubridae",

    image: snakeImages["fowlea-melanzostus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Sawah, sungai kecil, kolam, dan lahan basah dataran rendah. Makanan yang dilaporkan: Terutama katak dan ikan. Fowlea melanzosta adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Javanese Keelback Water snake. Referensi sebarannya mencantumkan antara lain Jawa, Bali. Berkembang biak dengan bertelur. Label model tetap fowlea-melanzostus; referensi taksonomi yang diperiksa memakai ejaan Fowlea melanzosta.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Sekitar 80 cm pada rujukan",
    habitat: "Sawah, sungai kecil, kolam, dan lahan basah dataran rendah",
    activity: "Siang maupun malam; semiakuatik",
    diet: "Terutama katak dan ikan",

    regions: ["Jawa", "Bali"],
    traits: ["Sisik berlunas kuat", "Tubuh cokelat hingga zaitun dengan bercak gelap", "Dapat memipihkan leher ketika terganggu"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Fowlea/melanzosta",
    color: "#b5c98b",
    taxonomyNote: "Label model tetap fowlea-melanzostus; referensi taksonomi yang diperiksa memakai ejaan Fowlea melanzosta.",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Fowlea/melanzosta" },
      { label: "Rujukan tambahan biologi", url: "https://baliwildlife.com/encyclopedia/animals/reptiles/snakes/javan-keelback-fowlea-melanzosta/" },
    ],
  },
  // #endregion
  // #region Gongylosoma baliodeira (Gongylosoma baliodeira)
  {
    id: "gongylosoma-baliodeira",
    name: "Gongylosoma baliodeira",
    english: "Boie's Smooth Snake",
    scientific: "Gongylosoma baliodeira",
    family: "Colubridae",

    image: snakeImages["gongylosoma-baliodeira"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan primer dan sekunder matang, hingga sekitar 1.500 m. Makanan yang dilaporkan: Laba-laba, serangga, invertebrata lain, dan kadal kecil. Gongylosoma baliodeira adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Boie's Smooth Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Bali, Kalimantan, Nias.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 45 cm",
    habitat: "Hutan primer dan sekunder matang, hingga sekitar 1.500 m",
    activity: "Umumnya dianggap malam, tetapi ada pengamatan siang",
    diet: "Laba-laba, serangga, invertebrata lain, dan kadal kecil",

    regions: ["Sumatra", "Jawa", "Bali", "Kalimantan", "Nias"],
    traits: ["Tubuh cokelat sampai kemerahan", "Perut krem hingga jingga-cokelat", "Tanda putih di belakang leher"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Gongylosoma/baliodeira",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Gongylosoma/baliodeira" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/orange-bellied-ringneck.htm" },
    ],
  },
  // #endregion
  // #region Gonyosoma jansenii (Gonyosoma jansenii)
  {
    id: "gonyosoma-jansenii",
    name: "Gonyosoma jansenii",
    english: "Celebes Black-tailed Ratsnake",
    scientific: "Gonyosoma jansenii",
    family: "Colubridae",

    image: snakeImages["gonyosoma-jansenii"] || "",
    credit: "",
    license: "",

    description: "Gonyosoma jansenii adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Celebes Black-tailed Ratsnake. Referensi sebarannya mencantumkan antara lain Sulawesi. Sebagian aktivitas berlangsung di pepohonan (semiarboreal). Berkembang biak dengan bertelur. Nama jansenii menghormati Albert Jansen, yang pernah bekerja di wilayah Hindia Belanda.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 2 m",
    habitat: "Hutan dan tepi hutan",
    activity: "Siang",
    diet: "Burung, telur, dan mamalia kecil",
    regions: ["Sulawesi"],
    traits: ["Tubuh hijau atau gelap dengan ekor hitam", "Terampil memanjat"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Gonyosoma/jansenii",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Gonyosoma/jansenii" },
    ],
  },
  // #endregion
  // #region Hebius flavifrons (Hebius flavifrons)
  {
    id: "hebius-flavifrons",
    name: "Hebius flavifrons",
    english: "Sabah Keelback",
    scientific: "Hebius flavifrons",
    family: "Colubridae",

    image: snakeImages["hebius-flavifrons"] || "",
    credit: "",
    license: "",

    description: "Hebius flavifrons adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Sabah Keelback. Referensi sebarannya mencantumkan antara lain Borneo. Berkembang biak dengan bertelur. Penamaannya merujuk pada tanda kekuningan di bagian dahi.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Belum terverifikasi dalam paket ini",
    habitat: "Hutan perbukitan dan pegunungan Borneo, sering dekat air",
    activity: "Belum terverifikasi dalam paket ini",
    diet: "Katak dan cacing (diduga)",
    regions: ["Borneo"],
    traits: [],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Hebius/flavifrons",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Hebius/flavifrons" },
    ],
  },
  // #endregion
  // #region Homalopsis buccata (Homalopsis buccata)
  {
    id: "homalopsis-buccata",
    name: "Homalopsis buccata",
    english: "Linne’s Water Snake",
    scientific: "Homalopsis buccata",
    family: "Homalopsidae",

    image: snakeImages["homalopsis-buccata"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Rawa, kolam, dan sungai hutan berair tawar. Makanan yang dilaporkan: Terutama ikan kecil dan katak. Spesies ini mempunyai pola pita pada tubuh dan memangsa berbagai hewan perairan. Anak dilahirkan dalam keadaan hidup setelah berkembang di tubuh induknya. Homalopsis buccata adalah spesies ular dalam keluarga Homalopsidae. Nama umum berbahasa Inggris yang tercatat adalah Linne’s Water Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Belitung, Jawa, Kalimantan. Referensi mencatat reproduksi ovovivipar, yaitu telur berkembang di tubuh induk hingga anak dilahirkan.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Hingga sekitar 1,2 m",
    habitat: "Rawa, kolam, dan sungai hutan berair tawar",
    activity: "Malam",
    diet: "Terutama ikan kecil dan katak",

    regions: ["Sumatra", "Bangka", "Belitung", "Jawa", "Kalimantan"],
    traits: ["Kepala lebar dengan pola khas", "Anak memiliki pita lebih tegas daripada dewasa", "Sisik tubuh berlunas"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Homalopsis/buccata",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Homalopsis/buccata" },
      { label: "Thai National Parks — biologi spesies", url: "https://www.thainationalparks.com/species/homalopsis-buccata" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/puff-faced_water-snake.htm" },
    ],
  },
  // #endregion
  // #region Hypsiscopus plumbea (Hypsiscopus plumbeus)
  {
    id: "hypsiscopus-plumbea",
    name: "Hypsiscopus plumbea",
    english: "Boie’s Mud Snake",
    scientific: "Hypsiscopus plumbeus",
    family: "Homalopsidae",

    image: snakeImages["hypsiscopus-plumbea"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Perairan dangkal yang tenang atau lambat: sawah, rawa, sungai kecil, dan parit. Hypsiscopus plumbeus adalah spesies ular dalam keluarga Homalopsidae. Nama umum berbahasa Inggris yang tercatat adalah Boie’s Mud Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Belitung, Jawa, Bali. Referensi mencatat reproduksi ovovivipar, yaitu telur berkembang di tubuh induk hingga anak dilahirkan. Label model tetap hypsiscopus-plumbea; referensi taksonomi yang diperiksa memakai ejaan Hypsiscopus plumbeus.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Hingga sekitar 48 cm",
    habitat: "Perairan dangkal yang tenang atau lambat: sawah, rawa, sungai kecil, dan parit",
    activity: "Terutama malam",
    diet: "Ikan kecil dan katak",
    regions: ["Sumatra", "Bangka", "Belitung", "Jawa", "Bali"],
    traits: ["Tubuh silindris kekar", "Ekor pendek", "Punggung kelabu dan perut kuning", "Mata di bagian atas kepala"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Hypsiscopus/plumbeus",
    color: "#b5c98b",
    taxonomyNote: "Label model tetap hypsiscopus-plumbea; referensi taksonomi yang diperiksa memakai ejaan Hypsiscopus plumbeus.",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Hypsiscopus/plumbeus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/grey-water-snake.htm" },
    ],
  },
  // #endregion
  // #region Indotyphlops braminus (Indotyphlops braminus)
  {
    id: "indotyphlops-braminus",
    name: "Ular Kawat",
    english: "Flowerpot Snake",
    scientific: "Indotyphlops braminus",
    family: "Typhlopidae",

    image: snakeImages["indotyphlops-braminus"] || "",
    credit: "",
    license: "",

    description: "Indotyphlops braminus adalah spesies ular dalam keluarga Typhlopidae. Nama umum berbahasa Inggris yang tercatat adalah Flowerpot Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Bali, Borneo, Sulawesi.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 17 cm",
    habitat: "Tanah, serasah, kebun, dan pot tanaman",
    activity: "Terutama malam; hidup di dalam tanah",
    diet: "Semut, rayap, dan larvanya",
    regions: ["Sumatra", "Jawa", "Bali", "Borneo", "Sulawesi"],
    traits: ["Tubuh kecil mirip cacing", "Sisik halus mengilap", "Mata sangat kecil"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Indotyphlops/braminus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Indotyphlops/braminus" },
    ],
  },
  // #endregion
  // #region Laticauda colubrina (Laticauda colubrina)
  {
    id: "laticauda-colubrina",
    name: "Laticauda colubrina",
    english: "Yellow-lipped sea krait",
    scientific: "Laticauda colubrina",
    family: "Elapidae",

    image: snakeImages["laticauda-colubrina"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Laut pesisir untuk berburu dan daratan pantai untuk beristirahat serta bereproduksi. Makanan yang dilaporkan: Belut dan ikan lainnya. Laticauda colubrina adalah spesies ular dalam keluarga Elapidae. Nama umum berbahasa Inggris yang tercatat adalah Yellow-lipped sea krait. Referensi sebarannya mencantumkan antara lain Borneo, Timor. Lingkungan laut. Berkembang biak dengan bertelur.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Belum terverifikasi dalam paket ini",
    habitat: "Laut pesisir untuk berburu dan daratan pantai untuk beristirahat serta bereproduksi",
    activity: "Bergerak antara laut dan darat",
    diet: "Belut dan ikan lainnya",

    regions: ["Borneo", "Timor"],
    traits: ["Moncong kekuningan", "Tubuh bercincin hitam", "Ekor pipih menyerupai dayung"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Laticauda/colubrina",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Laticauda/colubrina" },
      { label: "Rujukan tambahan biologi", url: "https://www.thainationalparks.com/species/laticauda-colubrina" },
    ],
  },
  // #endregion
  // #region Laticauda laticaudata (Laticauda laticaudata)
  {
    id: "laticauda-laticaudata",
    name: "Laticauda laticaudata",
    english: "Blue-banded Sea Krait",
    scientific: "Laticauda laticaudata",
    family: "Elapidae",

    image: snakeImages["laticauda-laticaudata"] || "",
    credit: "",
    license: "",

    description: "Laticauda laticaudata adalah spesies ular dalam keluarga Elapidae. Nama umum berbahasa Inggris yang tercatat adalah Blue-banded Sea Krait. Referensi sebarannya mencantumkan antara lain Borneo. Lingkungan laut. Berkembang biak dengan bertelur.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Jantan sekitar 91 cm dan betina 107 cm dalam rujukan",
    habitat: "Lingkungan laut",
    activity: "Terutama malam di laut; beristirahat di darat",
    diet: "Belut dan ikan",
    regions: ["Borneo"],
    traits: ["Bibir atas berwarna gelap", "Tubuh bercincin gelap", "Ekor memipih"],
    similar: ["laticauda-colubrina"],
    source: "https://reptile-database.reptarium.cz/Laticauda/laticaudata",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Laticauda/laticaudata" },
      { label: "Rujukan tambahan biologi", url: "https://www.thainationalparks.com/species/laticauda-laticaudata" },
    ],
  },
  // #endregion
  // #region Laticauda semifasciata (Laticauda semifasciata)
  {
    id: "laticauda-semifasciata",
    name: "Laticauda semifasciata",
    english: "Chinese Sea Snake Russian: Большой морской крайт",
    scientific: "Laticauda semifasciata",
    family: "Elapidae",

    image: snakeImages["laticauda-semifasciata"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Terumbu karang; pengamatan studi dilakukan di Lombok. Makanan yang dilaporkan: Ikan yang bersembunyi di celah terumbu. Laticauda semifasciata adalah spesies ular dalam keluarga Elapidae. Nama umum berbahasa Inggris yang tercatat adalah Chinese Sea Snake Russian: Большой морской крайт. Referensi sebarannya mencantumkan antara lain Maluku. Lingkungan laut.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Hingga sekitar 1,5 m",
    habitat: "Terumbu karang; pengamatan studi dilakukan di Lombok",
    activity: "Dapat berburu bersama individu lain dalam pengamatan lapangan",
    diet: "Ikan yang bersembunyi di celah terumbu",

    regions: ["Maluku"],
    traits: ["Tubuh bercincin gelap", "Ekor memipih seperti dayung"],
    similar: ["laticauda-colubrina"],
    source: "https://reptile-database.reptarium.cz/Laticauda/semifasciata",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Laticauda/semifasciata" },
      { label: "Rujukan tambahan biologi", url: "https://www.nature.com/articles/s41598-023-48684-3" },
    ],
  },
  // #endregion
  // #region Leiopython albertisii (Leiopython albertisii)
  {
    id: "leiopython-albertisii",
    name: "Leiopython albertisii",
    english: "D’Albertis python",
    scientific: "Leiopython albertisii",
    family: "Pythonidae",

    image: snakeImages["leiopython-albertisii"] || "",
    credit: "",
    license: "",

    description: "Leiopython albertisii adalah spesies ular dalam keluarga Pythonidae. Nama umum berbahasa Inggris yang tercatat adalah D’Albertis python. Referensi sebarannya mencantumkan antara lain Papua, Biak.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Umumnya 2–2,5 m; dapat lebih",
    habitat: "Hutan hujan dataran rendah",
    activity: "Terutama malam",
    diet: "Mamalia kecil dan burung",
    regions: ["Papua", "Biak"],
    traits: ["Tubuh kekar berwarna gelap", "Bibir pucat"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Leiopython/albertisii",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Leiopython/albertisii" },
    ],
  },
  // #endregion
  // #region Liasis mackloti (Liasis mackloti)
  {
    id: "liasis-mackloti",
    name: "Sanca Timor",
    english: "Freckled Python",
    scientific: "Liasis mackloti",
    family: "Pythonidae",

    image: snakeImages["liasis-mackloti"] || "",
    credit: "",
    license: "",

    description: "Liasis mackloti adalah spesies ular dalam keluarga Pythonidae. Nama umum berbahasa Inggris yang tercatat adalah Freckled Python. Referensi sebarannya mencantumkan antara lain Papua, Timor. Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Umumnya 1,5–2 m",
    habitat: "Hutan, savana, dan sekitar perairan",
    activity: "Terutama malam",
    diet: "Mamalia kecil, burung, dan kadal",
    regions: ["Papua", "Timor"],
    traits: ["Sisik mengilap", "Bintik halus di punggung"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Liasis/mackloti",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Liasis/mackloti" },
    ],
  },
  // #endregion
  // #region Liopeltis tricolor (Liopeltis tricolor)
  {
    id: "liopeltis-tricolor",
    name: "Liopeltis tricolor",
    english: "Malayan Ringneck",
    scientific: "Liopeltis tricolor",
    family: "Colubridae",

    image: snakeImages["liopeltis-tricolor"] || "",
    credit: "",
    license: "",

    description: "Liopeltis tricolor adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Malayan Ringneck. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Jawa, Borneo, Nias. Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 50 cm",
    habitat: "Hutan dan tepi hutan",
    activity: "Siang",
    diet: "Kadal kecil dan katak",
    regions: ["Sumatra", "Bangka", "Jawa", "Borneo", "Nias"],
    traits: [],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Liopeltis/tricolor",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Liopeltis/tricolor" },
    ],
  },
  // #endregion
  // #region Lycodon albofuscus (Lycodon albofuscus)
  {
    id: "lycodon-albofuscus",
    name: "Lycodon albofuscus",
    english: "Dark Wolf Snake",
    scientific: "Lycodon albofuscus",
    family: "Colubridae",

    image: snakeImages["lycodon-albofuscus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan dataran rendah dan tepinya. Makanan yang dilaporkan: Kadal dan katak dilaporkan sebagai mangsa. Lycodon albofuscus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Dark Wolf Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Borneo, Nias. Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Dilaporkan dapat mencapai sekitar 2,7 m",
    habitat: "Hutan dataran rendah dan tepinya",
    activity: "Terutama malam; hidup di permukaan tanah",
    diet: "Kadal dan katak dilaporkan sebagai mangsa",

    regions: ["Sumatra", "Borneo", "Nias"],
    traits: ["Tubuh dan ekor ramping", "Kepala memanjang", "Moncong tumpul"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Lycodon/albofuscus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Lycodon/albofuscus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/dusky-wolf-snake.htm" },
    ],
  },
  // #endregion
  // #region Lycodon capucinus (Lycodon capucinus)
  {
    id: "lycodon-capucinus",
    name: "Lycodon capucinus",
    english: "Common Wolf Snake",
    scientific: "Lycodon capucinus",
    family: "Colubridae",

    image: snakeImages["lycodon-capucinus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan dataran rendah, celah pohon, dan bangunan dekat hutan. Makanan yang dilaporkan: Cecak rumah diduga menjadi mangsa pada habitat bangunan. Spesies ini dapat menggali, bergerak di vegetasi rendah, serta memanjat dinding bangunan. Pola warna bervariasi antarpopulasi. Lycodon capucinus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Common Wolf Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Bali, Borneo, Sulawesi. Sebagian aktivitas berlangsung di pepohonan (semiarboreal).",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 76 cm dalam sumber regional",
    habitat: "Hutan dataran rendah, celah pohon, dan bangunan dekat hutan",
    activity: "Terutama malam",
    diet: "Cecak rumah diduga menjadi mangsa pada habitat bangunan",

    regions: ["Sumatra", "Jawa", "Bali", "Borneo", "Sulawesi"],
    traits: ["Tubuh cokelat dengan tanda kekuningan", "Pita pucat di leher", "Kepala pipih lebih lebar daripada tubuh"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Lycodon/capucinus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Lycodon/capucinus" },
      { label: "Thai National Parks — biologi spesies", url: "https://www.thainationalparks.com/species/lycodon-capucinus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/common_house-snake.htm" },
    ],
  },
  // #endregion
  // #region Lycodon subannulatus (Lycodon subannulatus)
  {
    id: "lycodon-subannulatus",
    name: "Lycodon subannulatus",
    english: "Malayan Bridal Snake",
    scientific: "Lycodon subannulatus",
    family: "Colubridae",

    image: snakeImages["lycodon-subannulatus"] || "",
    credit: "",
    license: "",

    description: "Lycodon subannulatus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Malayan Bridal Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Borneo, Natuna, Mentawai. Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 60 cm",
    habitat: "Hutan dan tepinya, sering di vegetasi",
    activity: "Terutama malam",
    diet: "Kadal dan cecak",
    regions: ["Sumatra", "Jawa", "Borneo", "Natuna", "Mentawai"],
    traits: ["Tubuh sangat ramping menyerupai tali"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Lycodon/subannulatus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Lycodon/subannulatus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/malayan_bridle_snake.htm" },
    ],
  },
  // #endregion
  // #region Lycodon subcinctus (Lycodon subcinctus)
  {
    id: "lycodon-subcinctus",
    name: "Lycodon subcinctus",
    english: "Malayan Banded Wolf Snake",
    scientific: "Lycodon subcinctus",
    family: "Colubridae",

    image: snakeImages["lycodon-subcinctus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan dataran rendah sampai pegunungan, tercatat hingga sedikitnya 1.500 m. Lycodon subcinctus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Malayan Banded Wolf Snake. Referensi sebarannya mencantumkan antara lain Malaysia. Nama dan keluarga dikonfirmasi melalui MyBIS; rincian sebaran Indonesia belum diverifikasi dalam paket ini.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 1,02 m",
    habitat: "Hutan dataran rendah sampai pegunungan, tercatat hingga sedikitnya 1.500 m",
    activity: "Umumnya malam; di tanah dan dapat memanjat",
    diet: "Kadal dan katak",
    regions: ["Malaysia"],
    traits: ["Pita melintang gelap dan terang", "Kepala pipih"],
    similar: ["bungarus-candidus", "bungarus-fasciatus"],
    source: "https://www.mybis.gov.my/sp/21279",
    color: "#b5c98b",
    taxonomyNote: "Nama dan keluarga dikonfirmasi melalui MyBIS; rincian sebaran Indonesia belum diverifikasi dalam paket ini.",
    references: [
      { label: "MyBIS", url: "https://www.mybis.gov.my/sp/21279" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/malayan-banded-wolf-snake.htm" },
    ],
  },
  // #endregion
  // #region Lycodon tristrigatus (Lycodon tristrigatus)
  {
    id: "lycodon-tristrigatus",
    name: "Lycodon tristrigatus",
    english: "Three-banded Bridled Snake",
    scientific: "Lycodon tristrigatus",
    family: "Colubridae",

    image: snakeImages["lycodon-tristrigatus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan dataran rendah; mampu memanjat batang pohon dan batu. Makanan yang dilaporkan: Kadal diduga menjadi mangsa; rincian diet terbatas. Lycodon tristrigatus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Three-banded Bridled Snake. Referensi sebarannya mencantumkan antara lain Borneo, Natuna. Sebagian aktivitas berlangsung di pepohonan (semiarboreal). Berkembang biak dengan bertelur. Juga ditemukan dalam literatur dengan nama Dryocalamus tristrigatus. Referensi genus memiliki riwayat perubahan; ID model dipertahankan.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 65 cm",
    habitat: "Hutan dataran rendah; mampu memanjat batang pohon dan batu",
    activity: "Malam",
    diet: "Kadal diduga menjadi mangsa; rincian diet terbatas",

    regions: ["Borneo", "Natuna"],
    traits: ["Tiga garis pucat memanjang di punggung cokelat", "Kepala pipih", "Perut pucat"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/species?genus=Lycodon&species=tristrigatus",
    color: "#b5c98b",
    taxonomyNote: "Juga ditemukan dalam literatur dengan nama Dryocalamus tristrigatus. Referensi genus memiliki riwayat perubahan; ID model dipertahankan.",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/species?genus=Lycodon&species=tristrigatus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/three-striped-bridle-snake.htm" },
    ],
  },
  // #endregion
  // #region Micropechis ikaheca (Micropechis ikaheca)
  {
    id: "micropechis-ikaheca",
    name: "Micropechis ikaheca",
    english: "New Guinea small-eyed snake",
    scientific: "Micropechis ikaheca",
    family: "Elapidae",

    image: snakeImages["micropechis-ikaheca"] || "",
    credit: "",
    license: "",

    description: "Micropechis ikaheca adalah spesies ular dalam keluarga Elapidae. Nama umum berbahasa Inggris yang tercatat adalah New Guinea small-eyed snake. Referensi sebarannya mencantumkan antara lain Papua. Berkembang biak dengan bertelur.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Umumnya 1–1,5 m; dapat sekitar 2 m",
    habitat: "Hutan hujan dan lahan pertanian",
    activity: "Terutama malam; hidup di tanah",
    diet: "Kadal, ular, dan mamalia kecil",
    regions: ["Papua"],
    traits: ["Tubuh kekar cokelat dengan pita samar", "Mata kecil"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Micropechis/ikaheca",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Micropechis/ikaheca" },
    ],
  },
  // #endregion
  // #region Morelia azurea (Morelia azurea)
  {
    id: "morelia-azurea",
    name: "Sanca Hijau",
    english: "Northern green python",
    scientific: "Morelia azurea",
    family: "Pythonidae",

    image: snakeImages["morelia-azurea"] || "",
    credit: "",
    license: "",

    description: "Morelia azurea adalah spesies ular dalam keluarga Pythonidae. Nama umum berbahasa Inggris yang tercatat adalah Northern green python. Referensi sebarannya mencantumkan antara lain Biak, Numfor, Supiori. Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 2 m",
    habitat: "Hutan hujan; hidup di pepohonan",
    activity: "Terutama malam",
    diet: "Mamalia kecil, burung, dan kadal",
    regions: ["Biak", "Numfor", "Supiori"],
    traits: ["Dewasa hijau cerah", "Anak dapat kuning atau cokelat", "Melilit cabang"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Morelia/azurea",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Morelia/azurea" },
    ],
  },
  // #endregion
  // #region Naja sputatrix (Naja sputatrix)
  {
    id: "naja-sputatrix",
    name: "Kobra Jawa",
    english: "Indonesian Cobra",
    scientific: "Naja sputatrix",
    family: "Elapidae",

    image: snakeImages["naja-sputatrix"] || "",
    credit: "",
    license: "",

    description: "Naja sputatrix adalah spesies ular dalam keluarga Elapidae. Nama umum berbahasa Inggris yang tercatat adalah Indonesian Cobra. Referensi sebarannya mencantumkan antara lain Jawa, Bali, Sulawesi, Lombok, Sumbawa. Sebagian aktivitas berlangsung di pepohonan (semiarboreal). Berkembang biak dengan bertelur. Nama sputatrix berkaitan dengan kemampuan menyemburkan bisa.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Umumnya 1–1,5 m; dapat sekitar 1,8 m",
    habitat: "Sebagian aktivitas berlangsung di pepohonan (semiarboreal)",
    activity: "Siang dan senja",
    diet: "Tikus, katak, kadal, dan ular",
    regions: ["Jawa", "Bali", "Sulawesi", "Lombok", "Sumbawa"],
    traits: ["Dapat melebarkan tudung leher", "Dapat menyemburkan bisa", "Warna hitam hingga cokelat"],
    similar: ["ptyas-mucosa"],
    source: "https://reptile-database.reptarium.cz/Naja/sputatrix",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Naja/sputatrix" },
    ],
  },
  // #endregion
  // #region Oligodon bitorquatus (Oligodon bitorquatus)
  {
    id: "oligodon-bitorquatus",
    name: "Oligodon bitorquatus",
    english: "Boie's Kukri Snake",
    scientific: "Oligodon bitorquatus",
    family: "Colubridae",

    image: snakeImages["oligodon-bitorquatus"] || "",
    credit: "",
    license: "",

    description: "Oligodon bitorquatus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Boie's Kukri Snake. Referensi sebarannya mencantumkan antara lain Jawa, Bali, Sumbawa. Permukaan tanah dan tempat berlindung di dalam tanah (semifosorial). Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 60 cm",
    habitat: "Permukaan tanah dan tempat berlindung di dalam tanah (semifosorial)",
    activity: "Terutama malam",
    diet: "Telur reptil, kadal, dan katak",
    regions: ["Jawa", "Bali", "Sumbawa"],
    traits: ["Pola pita pada leher", "Kepala kecil"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Oligodon/bitorquatus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Oligodon/bitorquatus" },
    ],
  },
  // #endregion
  // #region Oligodon octolineatus (Oligodon octolineatus)
  {
    id: "oligodon-octolineatus",
    name: "Oligodon octolineatus",
    english: "Eight-) Striped Kukri Snake",
    scientific: "Oligodon octolineatus",
    family: "Colubridae",

    image: snakeImages["oligodon-octolineatus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan, lahan pertanian, taman, dan kebun. Oligodon octolineatus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Eight-) Striped Kukri Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Belitung, Jawa, Bali. Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 68 cm",
    habitat: "Hutan, lahan pertanian, taman, dan kebun",
    activity: "Dapat aktif siang maupun malam",
    diet: "Telur reptil, kadal kecil, dan katak",
    regions: ["Sumatra", "Bangka", "Belitung", "Jawa", "Bali"],
    traits: ["Garis merah atau jingga memanjang di punggung", "Garis lateral pada warna dasar gelap"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Oligodon/octolineatus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Oligodon/octolineatus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/eight-striped_kukri_snake.htm" },
    ],
  },
  // #endregion
  // #region Oligodon purpurascens (Oligodon purpurascens)
  {
    id: "oligodon-purpurascens",
    name: "Oligodon purpurascens",
    english: "Brown Kukri Snake",
    scientific: "Oligodon purpurascens",
    family: "Colubridae",

    image: snakeImages["oligodon-purpurascens"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan dataran rendah dan pegunungan bawah, termasuk hutan sekunder hingga sekitar 1.200 m. Makanan yang dilaporkan: Katak, kadal, telur reptil, dan telur burung. Oligodon purpurascens adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Brown Kukri Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Kalimantan, Nias, Natuna. Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 95 cm",
    habitat: "Hutan dataran rendah dan pegunungan bawah, termasuk hutan sekunder hingga sekitar 1.200 m",
    activity: "Terutama malam, tetapi ada catatan aktif siang; hidup di tanah",
    diet: "Katak, kadal, telur reptil, dan telur burung",

    regions: ["Sumatra", "Jawa", "Kalimantan", "Nias", "Natuna"],
    traits: ["Tubuh cokelat dapat tampak keunguan", "Pita gelap melintang bertepi hitam", "Kepala pendek tidak jauh lebih lebar dari tubuh"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Oligodon/purpurascens",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Oligodon/purpurascens" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/brown-kukri-snake.htm" },
    ],
  },
  // #endregion
  // #region Ophiophagus hannah (Ophiophagus hannah)
  {
    id: "ophiophagus-hannah",
    name: "Kobra Raja",
    english: "Hamadryad",
    scientific: "Ophiophagus hannah",
    family: "Elapidae",

    image: snakeImages["ophiophagus-hannah"] || "",
    credit: "",
    license: "",

    description: "Ophiophagus hannah adalah spesies ular dalam keluarga Elapidae. Nama umum berbahasa Inggris yang tercatat adalah Hamadryad. Berkembang biak dengan bertelur. Label model memakai nama Ophiophagus hannah. Revisi kompleks king cobra tahun 2024 memisahkan Ophiophagus bungarus untuk populasi Sunda, termasuk sebagian Indonesia. Tanpa audit foto pelatihan, label ini tidak otomatis diganti menjadi spesies baru.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Umumnya 3–4 m; dapat lebih dari 5 m",
    habitat: "Hutan hujan, bakau, dan tepi hutan dekat air",
    activity: "Terutama siang",
    diet: "Terutama ular lain",
    regions: ["Sumatra", "Jawa", "Kalimantan"],
    traits: ["Tubuh sangat besar", "Tudung leher sempit saat mengancam", "Dapat menegakkan bagian depan tubuh"],
    similar: ["ptyas-carinata", "naja-sumatrana"],
    source: "https://reptile-database.reptarium.cz/Ophiophagus/hannah",
    color: "#b5c98b",
    taxonomyNote: "Label model memakai nama Ophiophagus hannah. Revisi kompleks king cobra tahun 2024 memisahkan Ophiophagus bungarus untuk populasi Sunda, termasuk sebagian Indonesia. Tanpa audit foto pelatihan, label ini tidak otomatis diganti menjadi spesies baru.",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Ophiophagus/hannah" },
      { label: "Revisi king cobra Sunda", url: "https://reptile-database.reptarium.cz/Ophiophagus/bungarus" },
    ],
  },
  // #endregion
  // #region Pareas carinatus (Pareas carinatus)
  {
    id: "pareas-carinatus",
    name: "Pareas carinatus",
    english: "Keeled Slug Snake",
    scientific: "Pareas carinatus",
    family: "Pareidae",

    image: snakeImages["pareas-carinatus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan dataran rendah hingga pegunungan bawah sekitar 1.300 m dalam akun regional. Makanan yang dilaporkan: Siput bercangkang. Pareas carinatus adalah spesies ular dalam keluarga Pareidae. Nama umum berbahasa Inggris yang tercatat adalah Keeled Slug Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Bali, Borneo, Lombok. Sebagian aktivitas berlangsung di pepohonan (semiarboreal). Berkembang biak dengan bertelur. Sebagian rujukan ekologi memakai cakupan spesies sebelum pemisahan taksonomi; jangan menggunakan sebaran lama untuk menetapkan identitas populasi tanpa pemeriksaan.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 60 cm menurut akun sebelum revisi kompleks",
    habitat: "Hutan dataran rendah hingga pegunungan bawah sekitar 1.300 m dalam akun regional",
    activity: "Malam; terutama di pepohonan",
    diet: "Siput bercangkang",

    regions: ["Sumatra", "Jawa", "Bali", "Borneo", "Lombok"],
    traits: ["Moncong sangat tumpul", "Mata relatif besar", "Tubuh cokelat dengan bintik dan pita gelap", "Perut kekuningan"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Pareas/carinatus",
    color: "#b5c98b",
    taxonomyNote: "Sebagian rujukan ekologi memakai cakupan spesies sebelum pemisahan taksonomi; jangan menggunakan sebaran lama untuk menetapkan identitas populasi tanpa pemeriksaan.",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Pareas/carinatus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/keeled-slug-snake.htm" },
    ],
  },
  // #endregion
  // #region Phytolopsis punctata (Phytolopsis punctata)
  {
    id: "phytolopsis-punctata",
    name: "Phytolopsis punctata",
    english: "Blackwater Mud Snake",
    scientific: "Phytolopsis punctata",
    family: "Homalopsidae",

    image: snakeImages["phytolopsis-punctata"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Aliran berlumpur dan kolam dangkal pada hutan rawa air tawar atau rawa gambut. Makanan yang dilaporkan: Ikan; isi perut satu spesimen mencatat lele hutan. Phytolopsis punctata adalah spesies ular dalam keluarga Homalopsidae. Nama umum berbahasa Inggris yang tercatat adalah Blackwater Mud Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Belitung, Kalimantan. Referensi mencatat reproduksi ovovivipar, yaitu telur berkembang di tubuh induk hingga anak dilahirkan.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Hingga sekitar 73 cm",
    habitat: "Aliran berlumpur dan kolam dangkal pada hutan rawa air tawar atau rawa gambut",
    activity: "Terutama malam",
    diet: "Ikan; isi perut satu spesimen mencatat lele hutan",

    regions: ["Sumatra", "Bangka", "Belitung", "Kalimantan"],
    traits: ["Tubuh gelap dengan bintik atau pita kuning", "Perut kuning", "Mata dan lubang hidung di atas kepala"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Phytolopsis/punctata",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Phytolopsis/punctata" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/blackwater-mud-snake.htm" },
    ],
  },
  // #endregion
  // #region Psammodynastes pictus (Psammodynastes pictus)
  {
    id: "psammodynastes-pictus",
    name: "Psammodynastes pictus",
    english: "Painted Mock Viper",
    scientific: "Psammodynastes pictus",
    family: "Psammodynastidae",

    image: snakeImages["psammodynastes-pictus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Sungai dangkal, terutama di hutan rawa. Makanan yang dilaporkan: Dilaporkan memakan ikan kecil, katak, dan udang air tawar. Psammodynastes pictus adalah spesies ular dalam keluarga Psammodynastidae. Nama umum berbahasa Inggris yang tercatat adalah Painted Mock Viper. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Belitung, Jawa, Kalimantan. Berkembang biak dengan melahirkan anak.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Sekitar 50–55 cm dalam sumber",
    habitat: "Sungai dangkal, terutama di hutan rawa",
    activity: "Belum terverifikasi dalam paket ini",
    diet: "Dilaporkan memakan ikan kecil, katak, dan udang air tawar",

    regions: ["Sumatra", "Bangka", "Belitung", "Jawa", "Kalimantan"],
    traits: ["Tubuh kecil dan ramping", "Garis gelap memanjang di punggung", "Mata besar dengan pupil tegak"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Psammodynastes/pictus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Psammodynastes/pictus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/painted-mock-viper.htm" },
    ],
  },
  // #endregion
  // #region Psammodynastes pulverulentus (Psammodynastes pulverulentus)
  {
    id: "psammodynastes-pulverulentus",
    name: "Psammodynastes pulverulentus",
    english: "Common Mock Viper",
    scientific: "Psammodynastes pulverulentus",
    family: "Psammodynastidae",

    image: snakeImages["psammodynastes-pulverulentus"] || "",
    credit: "",
    license: "",

    description: "Psammodynastes pulverulentus adalah spesies ular dalam keluarga Psammodynastidae. Nama umum berbahasa Inggris yang tercatat adalah Common Mock Viper.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Hingga sekitar 60–70 cm",
    habitat: "Hutan, semak, dan lahan pertanian",
    activity: "Siang dan malam",
    diet: "Kadal, katak, dan mamalia kecil",
    regions: ["Sumatra", "Jawa", "Kalimantan", "Sulawesi"],
    traits: ["Kepala menyerupai viper", "Tubuh ramping dengan pola bervariasi"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Psammodynastes/pulverulentus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Psammodynastes/pulverulentus" },
    ],
  },
  // #endregion
  // #region Pseudorabdion longiceps (Pseudorabdion longiceps)
  {
    id: "pseudorabdion-longiceps",
    name: "Pseudorabdion longiceps",
    english: "Dwarf Reed Snake",
    scientific: "Pseudorabdion longiceps",
    family: "Colubridae",

    image: snakeImages["pseudorabdion-longiceps"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Serasah, bawah kayu, dan batu di hutan. Pseudorabdion longiceps adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Dwarf Reed Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Kalimantan, Nias, Riau. Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 23 cm",
    habitat: "Serasah, bawah kayu, dan batu di hutan",
    activity: "Banyak bersembunyi di lantai hutan",
    diet: "Cacing tanah dan invertebrata kecil",
    regions: ["Sumatra", "Kalimantan", "Nias", "Riau"],
    traits: ["Tubuh kecil hitam atau cokelat berkilau", "Dapat memiliki kalung leher pucat", "Dapat melenting atau berguling ketika terancam"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Pseudorabdion/longiceps",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Pseudorabdion/longiceps" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/dwarf_reed-snake.htm" },
    ],
  },
  // #endregion
  // #region Pseudoxenodon inornatus (Pseudoxenodon inornatus)
  {
    id: "pseudoxenodon-inornatus",
    name: "Pseudoxenodon inornatus",
    english: "Dull Bamboo Snake",
    scientific: "Pseudoxenodon inornatus",
    family: "Colubridae",

    image: snakeImages["pseudoxenodon-inornatus"] || "",
    credit: "",
    license: "",

    description: "Pseudoxenodon inornatus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Dull Bamboo Snake. Referensi sebarannya mencantumkan antara lain Jawa, Kalimantan. Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 1 m",
    habitat: "Hutan pegunungan dan perbukitan",
    activity: "Siang",
    diet: "Katak",
    regions: ["Jawa", "Kalimantan"],
    traits: ["Dapat memipihkan leher seperti kobra", "Tubuh cokelat dengan pola gelap samar"],
    similar: ["naja-sumatrana"],
    source: "https://reptile-database.reptarium.cz/Pseudoxenodon/inornatus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Pseudoxenodon/inornatus" },
    ],
  },
  // #endregion
  // #region Ptyas carinata (Ptyas carinata)
  {
    id: "ptyas-carinata",
    name: "Ptyas carinata",
    english: "Keeled Rat Snake",
    scientific: "Ptyas carinata",
    family: "Colubridae",

    image: snakeImages["ptyas-carinata"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan sekunder, tepi hutan, dan lahan pertanian dengan pohon jarang. Ptyas carinata adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Keeled Rat Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Borneo. Sebagian aktivitas berlangsung di pepohonan (semiarboreal). Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Dilaporkan dapat mencapai sekitar 4 m",
    habitat: "Hutan sekunder, tepi hutan, dan lahan pertanian dengan pohon jarang",
    activity: "Siang",
    diet: "Pengerat, katak, kadal, dan ular kecil",
    regions: ["Sumatra", "Jawa", "Borneo"],
    traits: ["Mata besar", "Tubuh dewasa berpola campuran hitam dan krem", "Dapat tampak mirip king cobra dari kejauhan"],
    similar: ["ophiophagus-hannah"],
    source: "https://reptile-database.reptarium.cz/Ptyas/carinata",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Ptyas/carinata" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.ecologyasia.net/verts/snakes/keeled-rat-snake.htm" },
    ],
  },
  // #endregion
  // #region Ptyas fusca (Ptyas fusca)
  {
    id: "ptyas-fusca",
    name: "Ptyas fusca",
    english: "White-bellied Rat Snake",
    scientific: "Ptyas fusca",
    family: "Colubridae",

    image: snakeImages["ptyas-fusca"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan dataran rendah hingga sekitar 1.300 m; sering dekat sungai. Makanan yang dilaporkan: Katak, kadal, dan vertebrata kecil lain. Ptyas fusca adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah White-bellied Rat Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Belitung, Kalimantan, Nias. Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 3 m",
    habitat: "Hutan dataran rendah hingga sekitar 1.300 m; sering dekat sungai",
    activity: "Siang",
    diet: "Katak, kadal, dan vertebrata kecil lain",

    regions: ["Sumatra", "Bangka", "Belitung", "Kalimantan", "Nias"],
    traits: ["Tubuh memanjang dan ramping", "Ekor sangat panjang", "Kepala sempit dengan mata besar"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Ptyas/fusca",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Ptyas/fusca" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/white-bellied_rat_snake.htm" },
    ],
  },
  // #endregion
  // #region Ptyas korros (Ptyas korros)
  {
    id: "ptyas-korros",
    name: "Ptyas korros",
    english: "Chinese Ratsnake",
    scientific: "Ptyas korros",
    family: "Colubridae",

    image: snakeImages["ptyas-korros"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Padang rumput, area pertanian, dan perkebunan sawit. Makanan yang dilaporkan: Tikus, katak, dan vertebrata kecil lain. Ptyas korros adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Chinese Ratsnake. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Bali, Borneo. Sebagian aktivitas berlangsung di pepohonan (semiarboreal). Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 2,6 m",
    habitat: "Padang rumput, area pertanian, dan perkebunan sawit",
    activity: "Siang; terutama di tanah",
    diet: "Tikus, katak, dan vertebrata kecil lain",

    regions: ["Sumatra", "Jawa", "Bali", "Borneo"],
    traits: ["Tubuh cokelat sampai cokelat-jingga", "Perut kekuningan", "Sisik ekor bertepi gelap"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Ptyas/korros",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Ptyas/korros" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/indo-chinese_rat_snake.htm" },
    ],
  },
  // #endregion
  // #region Ptyas mucosa (Ptyas mucosa)
  {
    id: "ptyas-mucosa",
    name: "Ptyas mucosa",
    english: "Dhaman",
    scientific: "Ptyas mucosa",
    family: "Colubridae",

    image: snakeImages["ptyas-mucosa"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan serta habitat pertanian yang terganggu. Makanan yang dilaporkan: Pengerat, katak, dan vertebrata kecil. Ptyas mucosa adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Dhaman. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Bali. Sebagian aktivitas berlangsung di pepohonan (semiarboreal).",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 3,7 m",
    habitat: "Hutan serta habitat pertanian yang terganggu",
    activity: "Siang",
    diet: "Pengerat, katak, dan vertebrata kecil",

    regions: ["Sumatra", "Jawa", "Bali"],
    traits: ["Tubuh panjang dan ramping", "Pita gelap lebih jelas di bagian belakang tubuh", "Sisik di bawah mata bertepi hitam"],
    similar: ["naja-sputatrix"],
    source: "https://reptile-database.reptarium.cz/Ptyas/mucosa",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Ptyas/mucosa" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/oriental-rat-snake.htm" },
    ],
  },
  // #endregion
  // #region Python bivittatus (Python bivittatus)
  {
    id: "python-bivittatus",
    name: "Sanca Bodo",
    english: "Burmese Python",
    scientific: "Python bivittatus",
    family: "Pythonidae",

    image: snakeImages["python-bivittatus"] || "",
    credit: "",
    license: "",

    description: "Python bivittatus adalah spesies ular dalam keluarga Pythonidae. Nama umum berbahasa Inggris yang tercatat adalah Burmese Python. Referensi sebarannya mencantumkan antara lain Jawa, Bali, Sulawesi.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Umumnya 3–4 m; dapat lebih dari 5 m",
    habitat: "Hutan, rawa, dan lahan pertanian dekat air",
    activity: "Terutama malam",
    diet: "Mamalia dan burung",
    regions: ["Jawa", "Bali", "Sulawesi"],
    traits: ["Bercak besar cokelat berbatas gelap", "Tubuh besar dan berotot", "Perenang yang baik"],
    similar: ["malayopython-reticulatus"],
    source: "https://reptile-database.reptarium.cz/Python/bivittatus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Python/bivittatus" },
    ],
  },
  // #endregion
  // #region Python breitensteini (Python breitensteini)
  {
    id: "python-breitensteini",
    name: "Sanca Darah Borneo",
    english: "Borneo Python",
    scientific: "Python breitensteini",
    family: "Pythonidae",

    image: snakeImages["python-breitensteini"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan lembap, daerah dekat lahan pertanian, dan perkebunan di Borneo hingga sekitar 1.000 m. Python breitensteini adalah spesies ular dalam keluarga Pythonidae. Nama umum berbahasa Inggris yang tercatat adalah Borneo Python. Referensi sebarannya mencantumkan antara lain Kalimantan. Berkembang biak dengan bertelur. Nama spesies ini menghormati Heinrich Breitenstein, seorang dokter dan pengumpul spesimen di Borneo.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Umumnya 1,5–2 m",
    habitat: "Hutan lembap, daerah dekat lahan pertanian, dan perkebunan di Borneo hingga sekitar 1.000 m",
    activity: "Dapat dijumpai siang atau malam; terutama di tanah dan dapat berenang",
    diet: "Mamalia kecil dan burung",
    regions: ["Kalimantan"],
    traits: ["Tubuh gemuk dengan ekor pendek", "Pola cokelat dengan bercak gelap"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Python/breitensteini",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Python/breitensteini" },
      { label: "Rujukan tambahan biologi", url: "https://doi.org/10.2305/IUCN.UK.2012-1.RLTS.T192013A2028005.en" },
    ],
  },
  // #endregion
  // #region Python brongersmai (Python brongersmai)
  {
    id: "python-brongersmai",
    name: "Sanca Darah Sumatra",
    english: "Blood Python",
    scientific: "Python brongersmai",
    family: "Pythonidae",

    image: snakeImages["python-brongersmai"] || "",
    credit: "",
    license: "",

    description: "Python brongersmai adalah spesies ular dalam keluarga Pythonidae. Nama umum berbahasa Inggris yang tercatat adalah Blood Python. Referensi sebarannya mencantumkan antara lain Sumatra. Berkembang biak dengan bertelur. Nama spesies ini menghormati herpetolog Leo Brongersma.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Dapat mencapai sekitar 2,6 m",
    habitat: "Hutan, rawa, dan sekitar lahan pertanian",
    activity: "Terutama malam; hidup di tanah",
    diet: "Mamalia kecil dan burung",
    regions: ["Sumatra"],
    traits: ["Sebagian individu memiliki warna merah atau jingga", "Tubuh besar dengan ekor relatif pendek"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Python/brongersmai",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Python/brongersmai" },
      { label: "Rujukan tambahan biologi", url: "https://researchers.mq.edu.au/en/publications/heavily-exploited-but-poorly-known-systematics-and-biogeography-o/" },
    ],
  },
  // #endregion
  // #region Rhabdophis chrysargoides (Rhabdophis chrysargoides)
  {
    id: "rhabdophis-chrysargoides",
    name: "Rhabdophis chrysargoides",
    english: "Günther's Keelback",
    scientific: "Rhabdophis chrysargoides",
    family: "Colubridae",

    image: snakeImages["rhabdophis-chrysargoides"] || "",
    credit: "",
    license: "",

    description: "Rhabdophis chrysargoides adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Günther's Keelback. Referensi sebarannya mencantumkan antara lain Jawa, Sulawesi. Berkembang biak dengan bertelur.",

    venom: null,
    venomLabel: "Belum terverifikasi",
    length: "Belum terverifikasi dalam paket ini",
    habitat: "Hutan dan tepi hutan dekat air",
    activity: "Belum terverifikasi dalam paket ini",
    diet: "Katak (diduga)",
    regions: ["Jawa", "Sulawesi"],
    traits: [],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Rhabdophis/chrysargoides",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Rhabdophis/chrysargoides" },
    ],
  },
  // #endregion
  // #region Rhabdophis chrysargos (Rhabdophis chrysargos)
  {
    id: "rhabdophis-chrysargos",
    name: "Rhabdophis chrysargos",
    english: "Specklebelly Keelback",
    scientific: "Rhabdophis chrysargos",
    family: "Colubridae",

    image: snakeImages["rhabdophis-chrysargos"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan dataran rendah hingga pegunungan bawah, sekitar 1.700 m; sering dekat aliran air. Rhabdophis chrysargos adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Specklebelly Keelback. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Bali, Kalimantan, Flores.",

    venom: true,
    venomLabel: "Berbisa · Ringan",
    length: "Hingga sekitar 98 cm",
    habitat: "Hutan dataran rendah hingga pegunungan bawah, sekitar 1.700 m; sering dekat aliran air",
    activity: "Belum terverifikasi dalam paket ini",
    diet: "Belum terverifikasi dalam paket ini",

    regions: ["Sumatra", "Jawa", "Bali", "Kalimantan", "Flores"],
    traits: ["Tanda mirip huruf V pucat pada tengkuk", "Tubuh cokelat hingga zaitun dengan pita sempit", "Mata besar"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Rhabdophis/chrysargos",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Rhabdophis/chrysargos" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/speckle-bellied-keelback.htm" },
    ],
  },
  // #endregion
  // #region Rhabdophis conspicillatus (Rhabdophis conspicillatus)
  {
    id: "rhabdophis-conspicillatus",
    name: "Rhabdophis conspicillatus",
    english: "Red-bellied Keelback",
    scientific: "Rhabdophis conspicillatus",
    family: "Colubridae",

    image: snakeImages["rhabdophis-conspicillatus"] || "",
    credit: "",
    license: "",

    description: "Rhabdophis conspicillatus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Red-bellied Keelback. Referensi sebarannya mencantumkan antara lain Sumatra, Kalimantan, Natuna. Berkembang biak dengan bertelur.",

    venom: null,
    venomLabel: "Belum terverifikasi",
    length: "Belum terverifikasi dalam paket ini",
    habitat: "Hutan dataran rendah dekat air",
    activity: "Belum terverifikasi dalam paket ini",
    diet: "Katak dan kadal",
    regions: ["Sumatra", "Kalimantan", "Natuna"],
    traits: [],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Rhabdophis/conspicillatus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Rhabdophis/conspicillatus" },
    ],
  },
  // #endregion
  // #region Rhabdophis flaviceps (Rhabdophis flaviceps)
  {
    id: "rhabdophis-flaviceps",
    name: "Rhabdophis flaviceps",
    english: "Orangeneck Keelback",
    scientific: "Rhabdophis flaviceps",
    family: "Colubridae",

    image: snakeImages["rhabdophis-flaviceps"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Sungai dan rawa di sekitar hutan primer atau sekunder, hingga sekitar 1.300 m. Makanan yang dilaporkan: Terutama amfibi dan kadal. Rhabdophis flaviceps adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Orangeneck Keelback. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Kalimantan, Nias. Berkembang biak dengan bertelur.",

    venom: null,
    venomLabel: "Belum terverifikasi",
    length: "Hingga sekitar 85 cm",
    habitat: "Sungai dan rawa di sekitar hutan primer atau sekunder, hingga sekitar 1.300 m",
    activity: "Belum terverifikasi dalam paket ini",
    diet: "Terutama amfibi dan kadal",

    regions: ["Sumatra", "Bangka", "Kalimantan", "Nias"],
    traits: ["Pita leher jingga-merah", "Bibir dan sisi kepala kemerahan", "Tubuh relatif kekar dengan sisik berlunas"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Rhabdophis/flaviceps",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Rhabdophis/flaviceps" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/orange-necked_keelback.htm" },
    ],
  },
  // #endregion
  // #region Rhabdophis rhodomelas (Rhabdophis rhodomelas)
  {
    id: "rhabdophis-rhodomelas",
    name: "Rhabdophis rhodomelas",
    english: "Blueneck Keelback",
    scientific: "Rhabdophis rhodomelas",
    family: "Colubridae",

    image: snakeImages["rhabdophis-rhodomelas"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan hujan primer dan sekunder matang dekat sungai, rawa, atau rumput tergenang. Makanan yang dilaporkan: Terutama katak. Rhabdophis rhodomelas adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Blueneck Keelback. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Jawa, Borneo, Natuna. Berkembang biak dengan bertelur.",

    venom: null,
    venomLabel: "Belum terverifikasi",
    length: "Hingga sekitar 75 cm",
    habitat: "Hutan hujan primer dan sekunder matang dekat sungai, rawa, atau rumput tergenang",
    activity: "Belum terverifikasi dalam paket ini",
    diet: "Terutama katak",

    regions: ["Sumatra", "Bangka", "Jawa", "Borneo", "Natuna"],
    traits: ["Leher abu-abu kebiruan", "Tanda V gelap di tengkuk", "Sisik punggung berlunas kuat"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Rhabdophis/rhodomelas",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Rhabdophis/rhodomelas" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/blue-necked-keelback.htm" },
    ],
  },
  // #endregion
  // #region Rhabdophis subminiatus (Rhabdophis subminiatus)
  {
    id: "rhabdophis-subminiatus",
    name: "Rhabdophis subminiatus",
    english: "Red-necked Keelback",
    scientific: "Rhabdophis subminiatus",
    family: "Colubridae",

    image: snakeImages["rhabdophis-subminiatus"] || "",
    credit: "",
    license: "",

    description: "Rhabdophis subminiatus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Red-necked Keelback. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa. Berkembang biak dengan bertelur.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Hingga sekitar 1 m",
    habitat: "Dataran rendah dekat air: sawah, kebun, dan hutan",
    activity: "Siang",
    diet: "Katak dan kadal",
    regions: ["Sumatra", "Jawa"],
    traits: ["Leher merah", "Sisik berlunas", "Punggung zaitun"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Rhabdophis/subminiatus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Rhabdophis/subminiatus" },
    ],
  },
  // #endregion
  // #region Sibynophis geminatus (Sibynophis geminatus)
  {
    id: "sibynophis-geminatus",
    name: "Sibynophis geminatus",
    english: "Boie's Many-tooth Snake",
    scientific: "Sibynophis geminatus",
    family: "Colubridae",

    image: snakeImages["sibynophis-geminatus"] || "",
    credit: "",
    license: "",

    description: "Sibynophis geminatus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Boie's Many-tooth Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Belitung, Jawa, Bali. Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 60 cm",
    habitat: "Hutan dan serasah",
    activity: "Siang",
    diet: "Kadal kecil dan ular kecil",
    regions: ["Sumatra", "Bangka", "Belitung", "Jawa", "Bali"],
    traits: [],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Sibynophis/geminatus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Sibynophis/geminatus" },
    ],
  },
  // #endregion
  // #region Sibynophis melanocephalus (Sibynophis melanocephalus)
  {
    id: "sibynophis-melanocephalus",
    name: "Sibynophis melanocephalus",
    english: "Black-headed Collared Snake",
    scientific: "Sibynophis melanocephalus",
    family: "Colubridae",

    image: snakeImages["sibynophis-melanocephalus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan dataran rendah, termasuk hutan rawa air tawar. Sibynophis melanocephalus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Black-headed Collared Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Belitung, Jawa, Nias. Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 60 cm",
    habitat: "Hutan dataran rendah, termasuk hutan rawa air tawar",
    activity: "Siang; hidup di permukaan tanah",
    diet: "Skink dan kadal kecil",
    regions: ["Sumatra", "Bangka", "Belitung", "Jawa", "Nias"],
    traits: [],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Sibynophis/melanocephalus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Sibynophis/melanocephalus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/black-headed-collared-snake.htm" },
    ],
  },
  // #endregion
  // #region Simalia amethistina (Simalia amethistina)
  {
    id: "simalia-amethistina",
    name: "Simalia amethistina",
    english: "Amethystine or scrub python",
    scientific: "Simalia amethistina",
    family: "Pythonidae",

    image: snakeImages["simalia-amethistina"] || "",
    credit: "",
    license: "",

    description: "Simalia amethistina adalah spesies ular dalam keluarga Pythonidae. Nama umum berbahasa Inggris yang tercatat adalah Amethystine or scrub python. Referensi sebarannya mencantumkan antara lain Papua, Halmahera, Seram. Sebagian aktivitas berlangsung di pepohonan (semiarboreal). Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Dapat mencapai sekitar 6 m",
    habitat: "Sebagian aktivitas berlangsung di pepohonan (semiarboreal)",
    activity: "Terutama malam",
    diet: "Mamalia dan burung",
    regions: ["Papua", "Halmahera", "Seram"],
    traits: ["Tubuh sangat besar", "Pola samar dengan kilau iridesen"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Simalia/amethistina",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Simalia/amethistina" },
    ],
  },
  // #endregion
  // #region Simalia tracyae (Simalia tracyae)
  {
    id: "simalia-tracyae",
    name: "Simalia tracyae",
    english: "Halmahera Python",
    scientific: "Simalia tracyae",
    family: "Pythonidae",

    image: snakeImages["simalia-tracyae"] || "",
    credit: "",
    license: "",

    description: "Simalia tracyae adalah spesies ular dalam keluarga Pythonidae. Nama umum berbahasa Inggris yang tercatat adalah Halmahera Python. Referensi sebarannya mencantumkan antara lain Halmahera. Sebagian aktivitas berlangsung di pepohonan (semiarboreal). Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Dapat melebihi 3 m",
    habitat: "Sebagian aktivitas berlangsung di pepohonan (semiarboreal)",
    activity: "Terutama malam",
    diet: "Mamalia dan burung",
    regions: ["Halmahera"],
    traits: ["Tubuh besar dengan kilau iridesen"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Simalia/tracyae",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Simalia/tracyae" },
    ],
  },
  // #endregion
  // #region Stegonotus batjanensis (Stegonotus batjanensis)
  {
    id: "stegonotus-batjanensis",
    name: "Stegonotus batjanensis",
    english: "Bacan Island groundsnake",
    scientific: "Stegonotus batjanensis",
    family: "Colubridae",

    image: snakeImages["stegonotus-batjanensis"] || "",
    credit: "",
    license: "",

    description: "Stegonotus batjanensis adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Bacan Island groundsnake. Referensi sebarannya mencantumkan antara lain Halmahera, Maluku. Berkembang biak dengan bertelur. Nama batjanensis berasal dari Bacan, yang dahulu dieja Batjan.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 1,5 m",
    habitat: "Hutan hujan dan lahan pertanian; di tanah",
    activity: "Terutama malam",
    diet: "Kadal, telur reptil, katak, dan mamalia kecil",
    regions: ["Halmahera", "Maluku"],
    traits: ["Tubuh kekar cokelat gelap", "Kepala tidak terpisah jelas dari leher"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Stegonotus/batjanensis",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Stegonotus/batjanensis" },
    ],
  },
  // #endregion
  // #region Trimeresurus hageni (Trimeresurus hageni)
  {
    id: "trimeresurus-hageni",
    name: "Trimeresurus hageni",
    english: "Indonesian Pit Viper",
    scientific: "Trimeresurus hageni",
    family: "Viperidae",

    image: snakeImages["trimeresurus-hageni"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan primer dataran rendah dan perbukitan hingga sekitar 600 m. Makanan yang dilaporkan: Mamalia kecil dan burung. Trimeresurus hageni adalah spesies ular dalam keluarga Viperidae. Nama umum berbahasa Inggris yang tercatat adalah Indonesian Pit Viper. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka. Terutama hidup di pepohonan (arboreal). Berkembang biak dengan bertelur.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Hingga sekitar 1,16 m",
    habitat: "Hutan primer dataran rendah dan perbukitan hingga sekitar 600 m",
    activity: "Malam; biasanya di vegetasi rendah",
    diet: "Mamalia kecil dan burung",

    regions: ["Sumatra", "Bangka"],
    traits: ["Tubuh hijau kekar", "Garis pucat dari belakang mata ke sisi tubuh", "Ekor kemerahan atau cokelat muda"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Trimeresurus/hageni",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Trimeresurus/hageni" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/hagen's-pit-viper.htm" },
    ],
  },
  // #endregion
  // #region Trimeresurus insularis (Trimeresurus insularis)
  {
    id: "trimeresurus-insularis",
    name: "Trimeresurus insularis",
    english: "White-lipped island pitviper Indonesian: Ular viper timur",
    scientific: "Trimeresurus insularis",
    family: "Viperidae",

    image: snakeImages["trimeresurus-insularis"] || "",
    credit: "",
    license: "",

    description: "Trimeresurus insularis adalah spesies ular dalam keluarga Viperidae. Nama umum berbahasa Inggris yang tercatat adalah White-lipped island pitviper Indonesian: Ular viper timur. Referensi sebarannya mencantumkan antara lain Jawa, Bali, Lombok, Sumbawa, Sumba. Terutama hidup di pepohonan (arboreal). Referensi mencatat reproduksi ovovivipar, yaitu telur berkembang di tubuh induk hingga anak dilahirkan. Nama insularis berkaitan dengan pulau, sesuai asal penamaannya.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Umumnya 60–80 cm",
    habitat: "Hutan, semak, dan kebun",
    activity: "Terutama malam",
    diet: "Katak, kadal, burung, dan mamalia kecil",
    regions: ["Jawa", "Bali", "Lombok", "Sumbawa", "Sumba"],
    traits: ["Tubuh hijau dengan bibir pucat", "Kepala segitiga"],
    similar: ["trimeresurus-albolabris", "gonyosoma-oxycephalum"],
    source: "https://reptile-database.reptarium.cz/Trimeresurus/insularis",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Trimeresurus/insularis" },
    ],
  },
  // #endregion
  // #region Trimeresurus purpureomaculatus (Trimeresurus purpureomaculatus)
  {
    id: "trimeresurus-purpureomaculatus",
    name: "Trimeresurus purpureomaculatus",
    english: "Shore Pit Viper",
    scientific: "Trimeresurus purpureomaculatus",
    family: "Viperidae",

    image: snakeImages["trimeresurus-purpureomaculatus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Bakau dan hutan pesisir. Trimeresurus purpureomaculatus adalah spesies ular dalam keluarga Viperidae. Nama umum berbahasa Inggris yang tercatat adalah Shore Pit Viper. Referensi sebarannya mencantumkan antara lain Sumatra. Sebagian aktivitas berlangsung di pepohonan (semiarboreal). Referensi mencatat reproduksi ovovivipar, yaitu telur berkembang di tubuh induk hingga anak dilahirkan.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Hingga sekitar 1 m",
    habitat: "Bakau dan hutan pesisir",
    activity: "Siang dapat beristirahat pada cabang rendah",
    diet: "Belum terverifikasi dalam paket ini",

    regions: ["Sumatra"],
    traits: ["Warna kelabu gelap, cokelat keunguan, atau variasi lebih terang", "Sisik berlunas kuat"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Trimeresurus/purpureomaculatus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Trimeresurus/purpureomaculatus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/shore_pit_viper.htm" },
    ],
  },
  // #endregion
  // #region Trimeresurus sabahi (Trimeresurus sabahi)
  {
    id: "trimeresurus-sabahi",
    name: "Trimeresurus sabahi",
    english: "Sabah Bamboo pitviper",
    scientific: "Trimeresurus sabahi",
    family: "Viperidae",

    image: snakeImages["trimeresurus-sabahi"] || "",
    credit: "",
    license: "",

    description: "Trimeresurus sabahi adalah spesies ular dalam keluarga Viperidae. Nama umum berbahasa Inggris yang tercatat adalah Sabah Bamboo pitviper. Referensi sebarannya mencantumkan antara lain Sabah, Sarawak. Terutama hidup di pepohonan (arboreal). Keberadaan di Kalimantan masih dipertanyakan dalam referensi. Nama ini juga memiliki riwayat perubahan cakupan taksonomi; masuk dalam dataset bukan bukti bahwa seluruh fotonya berasal dari Indonesia.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Hingga sekitar 90 cm",
    habitat: "Terutama hidup di pepohonan (arboreal)",
    activity: "Terutama malam",
    diet: "Katak, kadal, dan mamalia kecil",
    regions: ["Sabah", "Sarawak"],
    traits: ["Tubuh hijau", "Kepala segitiga"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Trimeresurus/sabahi",
    color: "#b5c98b",
    taxonomyNote: "Keberadaan di Kalimantan masih dipertanyakan dalam referensi. Nama ini juga memiliki riwayat perubahan cakupan taksonomi; masuk dalam dataset bukan bukti bahwa seluruh fotonya berasal dari Indonesia.",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Trimeresurus/sabahi" },
    ],
  },
  // #endregion
  // #region Trimeresurus sumatranus (Trimeresurus sumatranus)
  {
    id: "trimeresurus-sumatranus",
    name: "Trimeresurus sumatranus",
    english: "Sumatra Pit Viper",
    scientific: "Trimeresurus sumatranus",
    family: "Viperidae",

    image: snakeImages["trimeresurus-sumatranus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan hujan hingga sekitar 1.000 m, juga bakau, rawa, dan beberapa perkebunan. Makanan yang dilaporkan: Katak, kadal, dan mamalia kecil. Trimeresurus sumatranus adalah spesies ular dalam keluarga Viperidae. Nama umum berbahasa Inggris yang tercatat adalah Sumatra Pit Viper. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Belitung, Borneo, Nias. Terutama hidup di pepohonan (arboreal). Referensi mencatat reproduksi ovovivipar, yaitu telur berkembang di tubuh induk hingga anak dilahirkan. Penamaan spesies ini mengacu pada Sumatra.",

    venom: true,
    venomLabel: "Berbisa · Mematikan",
    length: "Betina hingga sekitar 1,35 m; jantan sekitar 90 cm",
    habitat: "Hutan hujan hingga sekitar 1.000 m, juga bakau, rawa, dan beberapa perkebunan",
    activity: "Tercatat siang maupun malam; sering di vegetasi rendah",
    diet: "Katak, kadal, dan mamalia kecil",

    regions: ["Sumatra", "Bangka", "Belitung", "Borneo", "Nias"],
    traits: ["Punggung hijau dan perut kuning", "Banyak sisik bertepi hitam", "Dewasa dapat memiliki pita hitam tidak beraturan", "Ujung ekor kemerahan"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Trimeresurus/sumatranus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Trimeresurus/sumatranus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/sumatran-pit-viper.htm" },
    ],
  },
  // #endregion
  // #region Tropidolaemus subannulatus (Tropidolaemus subannulatus)
  {
    id: "tropidolaemus-subannulatus",
    name: "Tropidolaemus subannulatus",
    english: "North Philippine temple pitviper",
    scientific: "Tropidolaemus subannulatus",
    family: "Viperidae",

    image: snakeImages["tropidolaemus-subannulatus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan primer dan sekunder matang, hutan sungai, serta hutan pesisir. Makanan yang dilaporkan: Burung dan pengerat arboreal. Tropidolaemus subannulatus adalah spesies ular dalam keluarga Viperidae. Nama umum berbahasa Inggris yang tercatat adalah North Philippine temple pitviper. Referensi sebarannya mencantumkan antara lain Belitung, Kalimantan, Sulawesi. Terutama hidup di pepohonan (arboreal). Referensi mencatat reproduksi ovovivipar, yaitu telur berkembang di tubuh induk hingga anak dilahirkan.",

    venom: true,
    venomLabel: "Berbisa · Menengah",
    length: "Betina hingga sekitar 96 cm; jantan sekitar 46 cm",
    habitat: "Hutan primer dan sekunder matang, hutan sungai, serta hutan pesisir",
    activity: "Belum terverifikasi dalam paket ini",
    diet: "Burung dan pengerat arboreal",

    regions: ["Belitung", "Kalimantan", "Sulawesi"],
    traits: ["Jantan dan anak umumnya hijau dengan pita tipis", "Betina dapat krem dengan pola hijau-kebiruan", "Memiliki lubang pendeteksi panas di kepala"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Tropidolaemus/subannulatus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Tropidolaemus/subannulatus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/bornean-keeled-pit-viper.htm" },
    ],
  },
  // #endregion
  // #region Tropidolaemus wagleri (Tropidolaemus wagleri)
  {
    id: "tropidolaemus-wagleri",
    name: "Tropidolaemus wagleri",
    english: "Wagler's Palm Viper",
    scientific: "Tropidolaemus wagleri",
    family: "Viperidae",

    image: snakeImages["tropidolaemus-wagleri"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan dataran rendah primer atau sekunder; juga bakau di sebagian daerah. Makanan yang dilaporkan: Pengerat penghuni pohon dan burung. Tropidolaemus wagleri adalah spesies ular dalam keluarga Viperidae. Nama umum berbahasa Inggris yang tercatat adalah Wagler's Palm Viper. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Nias, Natuna, Riau. Referensi mencatat reproduksi ovovivipar, yaitu telur berkembang di tubuh induk hingga anak dilahirkan. Nama spesies ini menghormati zoolog Johann Georg Wagler.",

    venom: true,
    venomLabel: "Berbisa · Menengah",
    length: "Betina hingga sekitar 92 cm; jantan sekitar 52 cm",
    habitat: "Hutan dataran rendah primer atau sekunder; juga bakau di sebagian daerah",
    activity: "Berburu malam; dapat diam pada cabang yang sama selama beberapa hari",
    diet: "Pengerat penghuni pohon dan burung",

    regions: ["Sumatra", "Bangka", "Nias", "Natuna", "Riau"],
    traits: ["Kepala segitiga yang jelas", "Memiliki lubang pendeteksi panas di antara mata dan lubang hidung"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Tropidolaemus/wagleri",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Tropidolaemus/wagleri" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/waglers_pit_viper.htm" },
    ],
  },
  // #endregion
  // #region Xenelaphis hexagonotus (Xenelaphis hexagonotus)
  {
    id: "xenelaphis-hexagonotus",
    name: "Xenelaphis hexagonotus",
    english: "Malaysian Brown Snake",
    scientific: "Xenelaphis hexagonotus",
    family: "Colubridae",

    image: snakeImages["xenelaphis-hexagonotus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan, perkebunan, rawa air tawar, dan rawa bakau. Makanan yang dilaporkan: Pengerat, ikan rawa, dan katak. Xenelaphis hexagonotus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Malaysian Brown Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Belitung, Jawa, Kalimantan. Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 2 m",
    habitat: "Hutan, perkebunan, rawa air tawar, dan rawa bakau",
    activity: "Siang",
    diet: "Pengerat, ikan rawa, dan katak",

    regions: ["Sumatra", "Bangka", "Belitung", "Jawa", "Kalimantan"],
    traits: ["Tubuh cokelat", "Perut pucat", "Bagian depan tubuh dapat memiliki pita gelap"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Xenelaphis/hexagonotus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Xenelaphis/hexagonotus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/malayan_brown_snake.htm" },
    ],
  },
  // #endregion
  // #region Xenochrophis maculatus (Xenochrophis maculatus)
  {
    id: "xenochrophis-maculatus",
    name: "Xenochrophis maculatus",
    english: "Spotted Keelback",
    scientific: "Xenochrophis maculatus",
    family: "Colubridae",

    image: snakeImages["xenochrophis-maculatus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan dataran rendah dekat sungai dangkal dan rawa. Makanan yang dilaporkan: Terutama katak. Xenochrophis maculatus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Spotted Keelback. Referensi sebarannya mencantumkan antara lain Sumatra, Belitung, Borneo, Natuna, Riau. Berkembang biak dengan bertelur.",

    venom: null,
    venomLabel: "Belum terverifikasi",
    length: "Hingga sekitar 1 m",
    habitat: "Hutan dataran rendah dekat sungai dangkal dan rawa",
    activity: "Siang",
    diet: "Terutama katak",

    regions: ["Sumatra", "Belitung", "Borneo", "Natuna", "Riau"],
    traits: ["Pola pita miring di sisi tubuh", "Kepala kelabu gelap", "Tubuh kemerahan atau jingga dengan sisik berlunas"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Xenochrophis/maculatus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Xenochrophis/maculatus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/spotted_keelback.htm" },
    ],
  },
  // #endregion
  // #region Xenochrophis trianguligerus (Xenochrophis trianguligerus)
  {
    id: "xenochrophis-trianguligerus",
    name: "Xenochrophis trianguligerus",
    english: "Triangle Keelback",
    scientific: "Xenochrophis trianguligerus",
    family: "Colubridae",

    image: snakeImages["xenochrophis-trianguligerus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan hujan dataran rendah yang lembap dekat kolam, rawa, dan sungai. Makanan yang dilaporkan: Katak dan telurnya, ikan, serta kadal. Spesies ini tercatat di berbagai bagian Asia Tenggara, termasuk Nias, Mentawai, dan Sumatra. Jawa disebut sebagai lokasi tipe dalam referensi penamaannya. Xenochrophis trianguligerus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Triangle Keelback.",

    venom: null,
    venomLabel: "Belum terverifikasi",
    length: "Hingga sekitar 1,35 m",
    habitat: "Hutan hujan dataran rendah yang lembap dekat kolam, rawa, dan sungai",
    activity: "Siang; banyak beraktivitas di air",
    diet: "Katak dan telurnya, ikan, serta kadal",

    regions: ["Nias", "Mentawai", "Sumatra"],
    traits: ["Tanda segitiga hitam pada sisi tubuh", "Sisi tubuh jingga atau kemerahan", "Sisik punggung berlunas"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Xenochrophis/trianguligerus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Xenochrophis/trianguligerus" },
      { label: "Thai National Parks — biologi spesies", url: "https://www.thainationalparks.com/species/xenochrophis-trianguligerus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/triangle_keelback.htm" },
    ],
  },
  // #endregion
  // #region Xenochrophis vittatus (Xenochrophis vittatus)
  {
    id: "xenochrophis-vittatus",
    name: "Xenochrophis vittatus",
    english: "Banded Keelback",
    scientific: "Xenochrophis vittatus",
    family: "Colubridae",

    image: snakeImages["xenochrophis-vittatus"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Lahan pertanian lembap, kebun, dan lingkungan bervegetasi di dataran rendah. Makanan yang dilaporkan: Terutama katak dan ikan. Xenochrophis vittatus adalah spesies ular dalam keluarga Colubridae. Nama umum berbahasa Inggris yang tercatat adalah Banded Keelback. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Jawa. Berkembang biak dengan bertelur.",

    venom: null,
    venomLabel: "Belum terverifikasi",
    length: "Hingga sekitar 70 cm",
    habitat: "Lahan pertanian lembap, kebun, dan lingkungan bervegetasi di dataran rendah",
    activity: "Siang, sering pagi hari",
    diet: "Terutama katak dan ikan",

    regions: ["Sumatra", "Bangka", "Jawa"],
    traits: ["Empat garis pucat di atas warna dasar hitam", "Bagian bawah tubuh bercorak hitam-putih"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Xenochrophis/vittatus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Xenochrophis/vittatus" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/striped_keelback.htm" },
    ],
  },
  // #endregion
  // #region Xenodermus javanicus (Xenodermus javanicus)
  {
    id: "xenodermus-javanicus",
    name: "Xenodermus javanicus",
    english: "Xenodermine Snake",
    scientific: "Xenodermus javanicus",
    family: "Xenodermidae",

    image: snakeImages["xenodermus-javanicus"] || "",
    credit: "",
    license: "",

    description: "Xenodermus javanicus adalah spesies ular dalam keluarga Xenodermidae. Nama umum berbahasa Inggris yang tercatat adalah Xenodermine Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Jawa, Borneo, Natuna. Berkembang biak dengan bertelur.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 90 cm",
    habitat: "Hutan dan tanah lembap, sering dekat sungai",
    activity: "Terutama malam; di tanah",
    diet: "Katak",
    regions: ["Sumatra", "Jawa", "Borneo", "Natuna"],
    traits: ["Tiga baris sisik berlunas di punggung", "Kulit tampak kasar dan berbintil"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Xenodermus/javanicus",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Xenodermus/javanicus" },
    ],
  },
  // #endregion
  // #region Xenopeltis unicolor (Xenopeltis unicolor)
  {
    id: "xenopeltis-unicolor",
    name: "Ular Pelangi",
    english: "Sunbeam Snake",
    scientific: "Xenopeltis unicolor",
    family: "Xenopeltidae",

    image: snakeImages["xenopeltis-unicolor"] || "",
    credit: "",
    license: "",

    description: "Habitat yang dicatat: Hutan, semak, dan habitat terganggu dengan tanah lembap hingga berawa. Makanan yang dilaporkan: Katak, kadal, dan ular lain. Sisiknya menghasilkan kilau pelangi ketika terkena cahaya. Ular ini banyak beraktivitas di dalam tanah dan menundukkan mangsa dengan lilitan. Xenopeltis unicolor adalah spesies ular dalam keluarga Xenopeltidae. Nama umum berbahasa Inggris yang tercatat adalah Sunbeam Snake. Referensi sebarannya mencantumkan antara lain Sumatra, Bangka, Belitung, Jawa, Kalimantan.",

    venom: false,
    venomLabel: "Tidak berbisa",
    length: "Hingga sekitar 1,2 m",
    habitat: "Hutan, semak, dan habitat terganggu dengan tanah lembap hingga berawa",
    activity: "Terestrial dan sebagian menggali tanah",
    diet: "Katak, kadal, dan ular lain",

    regions: ["Sumatra", "Bangka", "Belitung", "Jawa", "Kalimantan"],
    traits: ["Sisik halus berkilau pelangi saat terkena cahaya", "Kepala pipih dengan mata kecil", "Tubuh kokoh dan ekor pendek"],
    similar: [],

    source: "https://reptile-database.reptarium.cz/Xenopeltis/unicolor",
    color: "#b5c98b",
    references: [
      { label: "The Reptile Database", url: "https://reptile-database.reptarium.cz/Xenopeltis/unicolor" },
      { label: "Thai National Parks — biologi spesies", url: "https://www.thainationalparks.com/species/xenopeltis-unicolor" },
      { label: "Rujukan tambahan biologi", url: "https://www.ecologyasia.com/verts/snakes/sunbeam_snake.htm" },
    ],
  },
  // #endregion
];
// #endregion

export const getSpecies = (id: string) =>
  species.find(item => item.id === id);

export const safetySource =
  'https://www.who.int/teams/control-of-neglected-tropical-diseases/snakebite-envenoming/treatment';
