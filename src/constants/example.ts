import { InstrukturKLS, KategoriKLS, ListKelas, SiswaUAS } from "@/src/types";

export const DataListKelas: ListKelas[] = [
  {
    id: 1,
    title: "Pengembangan Roti Tawar",
    status: "diulas",
    sections: [
      {
        id_section: 1,
        title_section: "Bab 1 : Roti",
        modules: [
          {
            id_module: 1,
            title_module: "Apa itu natural ?",
          },
          {
            id_module: 2,
            title_module: "Kenapa bisa natural ?",
          },
        ],
      },
      {
        id_section: 1,
        title_section: "Bab 2 : Tawar",
        modules: [
          {
            id_module: 3,
            title_module: "Penyebab Buatan",
          },
          {
            id_module: 4,
            title_module: "Terjadi lagi Buatan",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Bangunan Jalanan Nasional",
    status: "draf",
    sections: [
      {
        id_section: 1,
        title_section: "Bab 1 : Jalan",
        modules: [
          {
            id_module: 1,
            title_module: "Apa itu bangunan ?",
          },
          {
            id_module: 2,
            title_module: "Kenapa bisa jalan ?",
          },
        ],
      },
      {
        id_section: 1,
        title_section: "Bab 2 : Nasional",
        modules: [
          {
            id_module: 3,
            title_module: "Penyebab nasi",
          },
          {
            id_module: 4,
            title_module: "Terjadi lagi orisinal",
          },
        ],
      },
    ],
  },
];

export const DataNamaSiswaUAS: SiswaUAS[] = [
  {
    id: 1,
    nama: 'Syalala Yeyeye',
    date: '40 april 1203'
  },
  {
    id: 2,
    nama: 'Lalala Yuyuyu',
    date: '1 april 1203'
  },
  {
    id: 3,
    nama: 'Hore Yayaya',
    date: '54 april 1203'
  },
  {
    id: 4,
    nama: 'Weeehh Weh',
    date: '34 april 1203'
  },
  {
    id: 5,
    nama: 'Hore Yayaya',
    date: '54 april 1203'
  },
  {
    id: 6,
    nama: 'Weeehh Weh',
    date: '34 april 1203'
  },
  
]

export const DataKategoriKelas: KategoriKLS[] = [
  {
    id: 1,
    kategori: "Sejarah"
  },
  {
    id: 2,
    kategori: "Sosial"
  },
  {
    id: 3,
    kategori: "Fisika"
  },
  {
    id: 4,
    kategori: "Fiqih"
  },
  {
    id: 5,
    kategori: "Sesajen"
  },
  {
    id: 6,
    kategori: "Fish"
  },
  {
    id: 7,
    kategori: "Sosis"
  },
];

export const DataInstrukturKelas: InstrukturKLS[] = [
  {
    id: 1,
    guru: "Devi Permatasari, S.E"
  },
  {
    id: 2,
    guru: "Lala Atasari, S.E"
  },
  {
    id: 3,
    guru: "Santi Perasari, S.E"
  },
  {
    id: 4,
    guru: "Yanya Matasari, S.E"
  },
  {
    id: 5,
    guru: "Belro Tasari, S.E"
  },
]

