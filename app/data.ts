export interface StoryItem {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  tag: string;
  image: string;
  description: string;
  fullHistory: string; // Detail sejarah tambahan untuk anti-AI slop
}

export const LANDING_PAGE_DATA = {
  title: "Dua Mata Dunia: Romawi vs Persia",
  subtitle: "Sebuah perjalanan interaktif menelusuri 700 tahun persaingan, tragedi, dan kehancuran bersama di jantung Timur Tengah.",
  buttonText: "Mulai Jelajahi Kisah",
  backgroundImage: "/images/landing-bg.jpg" 
};

export const STORY_DATA: StoryItem[] = [
  {
    id: 1,
    title: "Kisah Dua Raksasa Kuno",
    subtitle: "Dunia terlalu kecil untuk mereka berdua.",
    year: "247 SM - 651 M",
    tag: "Prolog",
    image: "/images/slide1.jpg",
    description: "Selama lebih dari 700 tahun, Romawi dan Persia saling berhadapan memperebutkan dominasi Timur Tengah. Mereka saling memandang sebagai satu-satunya entitas yang beradab di dunia, menyebut satu sama lain sebagai 'Dua Mata Dunia'.",
    fullHistory: "Konsep 'Dua Mata Dunia' (The Two Eyes of the World) adalah istilah diplomatik nyata yang tercatat dalam korespondensi resmi antara Kaisar Romawi dan Raja Persia. Wilayah di luar kedua kekaisaran ini dianggap sebagai tanah barbar tak beradab oleh keduanya. Ketegangan geopolitik mereka berpusat di Armenia, Mesopotamia, dan rute perdagangan gurun. Perang ini bukan sekadar perebutan wilayah, melainkan perang harga diri antara peradaban berbasis hukum dan administrasi ala Mediterania (Roma) melawan kekaisaran berbasis monarki absolut yang kaya akan tradisi berkuda (Persia)."
  },
  {
    id: 2,
    title: "Mengenal Sang Rival",
    subtitle: "Parthia yang gesit, Sassanid yang mematikan.",
    year: "Era Berbeda",
    tag: "Faksi",
    image: "/images/map-rival.jpg", 
    description: "Romawi berganti kaisar, Persia berganti dinasti. Legiun Romawi sangat kewalahan menghadapi taktik pemanah berkuda Dinasti Parthia, dan semakin menderita saat Dinasti Sassanid yang agresif mengambil alih Persia.",
    fullHistory: "Dinasti Parthia (247 SM – 224 M) menggunakan sistem pemerintahan feodal klan-klan besar, mengandalkan kavaleri ringan pemanah berkuda yang sangat lincah. Kebangkitan Dinasti Sassanid pada 224 M mengubah segalanya di bawah Ardashir I. Sassanid mensentralisasi kekuasaan, menghidupkan kembali doktrin agama Zoroaster, dan membangun pasukan elit kavaleri berat berlapis baja penuh bernama Savaran (Cataphract). Berbeda dengan Parthia yang defensif, Sassanid secara aktif berambisi merebut kembali seluruh wilayah bekas Kekaisaran Akhemeniyah (Persia Kuno), yang mencakup Suriah dan Mesir milik Romawi."
  },
  {
    id: 3,
    title: "Tragedi Emas Cair Carrhae",
    subtitle: "Blunder terbesar akibat ketamakan.",
    year: "53 SM",
    tag: "Kehancuran",
    image: "/images/carrhae.jpg",
    description: "Orang terkaya Romawi, Marcus Crassus, menginvasi Persia demi gengsi. Pasukannya dihancurkan total di gurun Carrhae. Menurut legenda, Crassus dieksekusi dengan cara dituangkan emas cair ke tenggorokannya.",
    fullHistory: "Di Gurun Carrhae (Turki Tenggara modern), 40.000 prajurit legiun Romawi terjebak di bawah terik matahari. Jenderal Parthia, Surena, menggunakan taktik jenius: 1.000 kavaleri berat sebagai umpan dan 9.000 pemanah berkuda yang terus-menerus menghujani legiun Romawi dengan anak panah tanpa henti karena didukung logistik ribuan unta pembawa amunisi. Formasi kura-kura (Testudo) Romawi tidak berkutik. Setelah Crassus terbunuh dalam negosiasi yang gagal, kepalanya dipenggal. Sejarawan kuno Plutarch mencatat bahwa musuh menuangkan emas cair ke mulut jasad Crassus sebagai sindiran kejam atas sifat serakah sang triumvir terkaya Roma tersebut."
  },
  {
    id: 4,
    title: "Puncak Penghinaan Romawi",
    subtitle: "Ketika harga diri Roma diinjak-injak.",
    year: "260 M",
    tag: "Krisis",
    image: "/images/valerian.jpg",
    description: "Dalam Pertempuran Edessa, Raja Sassanid Shapur I berhasil menangkap Kaisar Romawi Valerian hidup-hidup. Sang Kaisar yang agung itu kabarnya dijadikan pijakan kaki oleh Shapur setiap kali ia ingin naik ke kudanya.",
    fullHistory: "Pertempuran Edessa terjadi di tengah 'Krisis Abad Ketiga' Romawi, di mana wabah penyakit dan perang saudara sedang melanda Roma. Kaisar Valerian mencoba menegosiasikan perdamaian dengan Shapur I, namun ia dijebak dan ditawan bersama ribuan perwiranya. Kejadian ini dicatat dalam sejarah sebagai satu-satunya momen di mana seorang Kaisar Romawi menjadi tawanan perang asing. Monumen batu di Naqsh-e Rostam (Iran) menggambarkan Valerian berlutut di hadapan Shapur yang menunggangi kuda. Penulis Kristen Lactantius mencatat bahwa Valerian menghabiskan sisa hidupnya dalam belenggu, dijadikan pijakan kaki manusia, dan setelah meninggal, kulitnya diawetkan serta dicat merah sebagai pajangan di istana Sassanid."
  },
  {
    id: 5,
    title: "Musuh tapi 'Saudara'",
    subtitle: "Dinamika di luar medan darah.",
    year: "Masa Damai",
    tag: "Diplomasi",
    image: "/images/silkroad.jpg",
    description: "Meski sering berperang, raja-raja mereka sering saling berkirim surat dan menyapa dengan sebutan 'saudara'. Keduanya juga sangat bergantung satu sama lain untuk mengamankan perdagangan komoditas mewah di Jalur Sutra.",
    fullHistory: "Di balik konfrontasi militer, Roma dan Ctesiphon (Ibu kota Persia) mengembangkan hukum diplomatik yang sangat formal. Ketika seorang Kaisar Romawi wafat, istana Persia akan berkabung secara resmi, begitu pula sebaliknya. Bahkan, Kaisar Arcadius dari Romawi Timur menunjuk Raja Yazdegerd I dari Persia sebagai wali pelindung legal bagi putranya yang masih kecil, Theodosius II, guna mencegah perang saudara di Roma. Kedua negara sadar bahwa jika salah satu dari mereka runtuh, suku-suku nomaden barbar dari stepa Utara atau gurun Selatan akan menyerbu dan menghancurkan peradaban mereka berdua. Mereka adalah dua kutub penyeimbang dunia kuno."
  },
  {
    id: 6,
    title: "Perang Dunia Zaman Kuno",
    subtitle: "Pertarungan habis-habisan yang fatal.",
    year: "602 – 628 M",
    tag: "Klimaks",
    image: "/images/siege.jpg",
    description: "Raja Khosrow II mengamuk dan merebut Mesir hingga mengepung Konstantinopel. Namun, Kaisar Bizantium Heraklius melakukan serangan balik brilian ke jantung Persia, memaksa mereka menyerah secara dramatis.",
    fullHistory: "Perang Bizantium-Sassanid Terakhir ini adalah perang paling destruktif. Khosrow II memanfaatkan ketidakstabilan politik Roma setelah pembunuhan Kaisar Maurice. Persia merebut Yerusalem, mencuri relik salib suci (True Cross), menguasai lumbung pangan di Mesir, dan bersekutu dengan bangsa Avar untuk mengepung ibu kota Konstantinopel dari dua sisi pada 626 M. Dalam kondisi kritis, Kaisar Heraklius melakukan manuver nekat: ia meninggalkan ibu kota lewat jalur laut, berlayar ke Laut Hitam, dan menyerang jantung pertahanan Persia dari belakang lewat Armenia. Heraklius menghancurkan pasukan inti Sassanid dalam Pertempuran Nineveh (627 M), memicu kudeta internal di Persia yang berujung pada eksekusi Khosrow II oleh putranya sendiri."
  },
  {
    id: 7,
    title: "Akhir yang Plot Twist",
    subtitle: "Pemenang sejati datang dari tempat tak terduga.",
    year: "630-an M",
    tag: "Epilog",
    image: "/images/collapse.jpg",
    description: "Perang 700 tahun membuat kedua raksasa kehabisan darah. Saat terengah-engah, sebuah kekuatan baru muncul dari Semenanjung Arab di bawah bendera Islam. Sassanid runtuh sepenuhnya, dan Romawi Timur kehilangan separuh wilayahnya.",
    fullHistory: "Perjanjian damai tahun 628 M mengembalikan perbatasan ke posisi semula, membuat perang 26 tahun terakhir menjadi sia-sia. Kedua kekaisaran mengalami kebangkrutan total, kas negara kosong, populasi pria produktif hancur, dan sistem pertahanan perbatasan terbengkalai. Pada saat titik terlemah inilah Pasukan Muslim di bawah Kekhalifahan Rasyidin bergerak keluar dari Semenanjung Arab. Dipimpin oleh jenderal jenius seperti Khalid bin Walid, pasukan Muslim mengalahkan Bizantium di Pertempuran Yarmouk (636 M) dan menghancurkan Sassanid di Pertempuran Qadisiyyah (636 M). Dalam waktu kurang dari 30 tahun, Dinasti Sassanid yang berusia 400 tahun musnah sepenuhnya dari muka bumi, sementara Romawi Timur terdesak dan berubah menjadi kekaisaran defensif berskala kecil."
  }
];