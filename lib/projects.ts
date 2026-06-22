export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  features?: string[];
  linkDemo?: string;
  linkGithub?: string;
}

export const projects: Project[] = [
  {
    id: "balehinggil",
    title: "Balehinggil Residence",
    description: "Website pemesanan apartemen mewah & nyaman di jantung Surabaya Timur karya Hotelify.id. Memfasilitasi reservasi unit spesifik (Studio View Pool, Mountain, Sea Garden).",
    images: [
      "/balehinggil/balehinggil_1.png",
      "/balehinggil/balehinggil_2.png",
      "/balehinggil/balehinggil_3.png"
    ],
    features: [
      "Pemesanan Unit Hotel & Apartemen Cepat (Studio View)",
      "Sistem Filter Tipe Kamar (Suite, Pool View, Mountain View)",
      "Integrasi Gateway Pembayaran Reservasi",
      "Testimoni Interaktif dan Dashboard Tamu"
    ],
    tags: ["Laravel", "PHP", "Bootstrap / Tailwind CSS", "MySQL"],
    linkDemo: "https://balehinggil.hotelify.id/",
  },
  {
    id: "segara",
    title: "SEGARA",
    description: "Sistem Elektronik Gedung Negara (SEGARA). Aplikasi pengelolaan data gedung terintegrasi dari Dinas Pekerjaan Umum dan Penataan Ruang untuk mendukung tata kelola aset pemerintah Kota Kediri yang transparan dan akuntabel.",
    images: [
      "/segara/segara_1.png",
      "/segara/segara_2.png"
    ],
    features: [
      "Pengelolaan Data Aset Gedung Negara Terintegrasi",
      "Dasbor Akuntabilitas dan Transparansi Tata Kelola Aset Kota Kediri",
      "Sistem Manajemen Kewenangan & Autentikasi Internal",
      "Monitoring dan Pendataan Elektronik Real-time"
    ],
    tags: ["Laravel / CodeIgniter", "PHP", "Bootstrap", "MySQL"],
    linkDemo: "http://156.67.221.118/gedung_negara/public/",
  },
  {
    id: "simpbg",
    title: "SIMPBG Banyuwangi",
    description: "Sistem Informasi Persetujuan Bangunan Gedung untuk Kabupaten Banyuwangi. Melayani pengelolaan proses perizinan gedung dan arsitektur wilayah melalui portal satu pintu.",
    images: [
      "/simpbg/simpbg_1.png",
      "/simpbg/simpbg_2.png"
    ],
    features: [
      "Portal Satu Pintu Persetujuan Bangunan Gedung (PBG)",
      "Sistem Login, Registrasi, dan Autentikasi Pemohon",
      "Workflow Verifikasi Dokumen oleh Dinas Kabupaten",
      "Penyimpanan dan Pelacakan Status Berkas Secara Online"
    ],
    tags: ["CodeIgniter / Laravel", "PHP", "MySQL", "Web API"],
    linkDemo: "https://simpbg.espacialartwork.co.id/home",
  },
  {
    id: "sitaru",
    title: "Sitaru",
    description: "Sistem Informasi Tata Ruang (SITARU). Website pengelolaan informasi spasial dan peta digital untuk penyusunan izin dan rekomendasi keruangan.",
    images: [
      "/sitaru/sitaru_1.png",
      "/sitaru/sitaru_2.png",
      "/sitaru/sitaru_3.png"
    ],
    features: [
      "Peta Tata Ruang (Zonasi) Digital Real-time (WebGIS)",
      "Akses Data Pertanahan Publik yang Cepat & Akurat",
      "Filter Spesifik Berdasarkan Penggunaan Lahan / Area",
      "Pengajuan & Pelaporan Tata Ruang Administratif"
    ],
    tags: ["Laravel", "PHP", "Leaflet/Mapbox", "MySQL"],
    linkDemo: "http://sitaru.espacialartwork.com",
  },
  {
    id: "modul-kkn",
    title: "Modul KKN",
    description: "Sistem informasi pengelolaan Kuliah Kerja Nyata (KKN) mahasiswa untuk memfasilitasi administrasi pendaftaran, penyerahan logbook harian, serta proses penilaian dari Dosen Pembimbing Lapangan secara online dan terintegrasi.",
    images: [
      "/modul-kkn/modul-kkn_1.png",
      "/modul-kkn/modul-kkn_2.png"
    ],
    features: [
      "Pendaftaran Kelompok & Pemilihan Lokasi KKN secara Online",
      "Sistem Pengisian Logbook / Laporan Kegiatan Harian Mahasiswa",
      "Manajemen dan Input Nilai oleh Dosen Pembimbing Lapangan (DPL)",
      "Penyimpanan Dokumen Laporan Akhir & Verifikasi Administratif"
    ],
    tags: ["Tailwind CSS", "Vercel"],
    linkDemo: "https://kkn-modul-web.vercel.app/",
  },
  {
    id: "tygo",
    title: "$TYGO",
    description: "Website landing page art untuk memecoin $TYGO — Wild Degen of Solana. Karakter harimau liar degen ini menjembatani memes, animasi, dan budaya Solana.",
    images: [
      "/tygo/tygo_1.png",
      "/tygo/tygo_2.png",
      "/tygo/tygo_3.png",
      "/tygo/tygo_4.png"
    ],
    features: [
      "Daily Art Drops, Lore, dan Animated Shorts",
      "Integrasi Asli ke Jaringan Solana",
      "Original IP untuk Media Expansion & Merchandise",
      "Pump.fun Platform Ready"
    ],
    tags: ["Next.js", "Tailwind CSS", "React", "Solana", "Vercel CDN"],
    linkDemo: "https://tygo.vercel.app",
  },
  {
    id: "yeti",
    title: "$YETI",
    description: "Website landing page art untuk memecoin $YETI - The Fastest Growing Degen Blogger on Solana. Mascot kera yeti ini ditujukan untuk kampanye viral dan web3.",
    images: [
      "/yeti/yeti_1.png",
      "/yeti/yeti_2.png",
      "/yeti/yeti_3.png"
    ],
    features: [
      "Aset Memecoin dengan Ekspansi Komunitas (The Viral Mascot)",
      "Peta Jalan Kecepatan Tinggi (MarketCap Milestones)",
      "Kompatibilitas Solana Tokenomics Penuh",
      "UI Fast-rendering dengan Next.js App Router"
    ],
    tags: ["Next.js", "Tailwind CSS", "React", "Solana", "Vercel CDN"],
    linkDemo: "https://yetidegen.vercel.app",
  }
];
