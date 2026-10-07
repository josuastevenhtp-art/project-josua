import { ICD10Item, ICD9CMItem } from '../types/rmik';

export const ICD10_EMERGENCY_LIST: ICD10Item[] = [
  {
    code: 'I21.9',
    descriptionId: 'Infark miokard akut, tidak spesifik (STEMI/NSTEMI)',
    category: 'Sirkulasi / Kardiovaskular',
  },
  {
    code: 'I20.0',
    descriptionId: 'Angina pektoris tidak stabil (UAP)',
    category: 'Sirkulasi / Kardiovaskular',
  },
  {
    code: 'I50.9',
    descriptionId: 'Gagal jantung, tidak spesifik (Acute Decompensated Heart Failure)',
    category: 'Sirkulasi / Kardiovaskular',
  },
  {
    code: 'S06.0',
    descriptionId: 'Gegar otak / Cedera kepala ringan (CKR)',
    category: 'Trauma & Cedera (S00-T98)',
  },
  {
    code: 'S06.2',
    descriptionId: 'Cedera otak difus / Cedera kepala berat (CKB)',
    category: 'Trauma & Cedera (S00-T98)',
  },
  {
    code: 'S72.0',
    descriptionId: 'Fraktur leher femur (Patah tulang paha)',
    category: 'Trauma & Cedera (S00-T98)',
  },
  {
    code: 'S82.2',
    descriptionId: 'Fraktur korpus tibia (Patah tulang kering)',
    category: 'Trauma & Cedera (S00-T98)',
  },
  {
    code: 'T14.1',
    descriptionId: 'Luka terbuka pada bagian tubuh tidak terspesifikasi (Vulnus laceratum)',
    category: 'Trauma & Cedera (S00-T98)',
  },
  {
    code: 'J45.9',
    descriptionId: 'Asma bronkial, tidak spesifik (Eksaserbasi akut)',
    category: 'Respirasi / Paru',
  },
  {
    code: 'J18.9',
    descriptionId: 'Pneumonia, organisme tidak terspesifikasi',
    category: 'Respirasi / Paru',
  },
  {
    code: 'J96.0',
    descriptionId: 'Gagal nafas akut (Acute respiratory failure)',
    category: 'Respirasi / Paru',
  },
  {
    code: 'A09',
    descriptionId: 'Gastroenteritis dan kolitis infeksius (Diare akut dengan dehidrasi)',
    category: 'Saluran Cerna & Infeksi',
  },
  {
    code: 'K35.8',
    descriptionId: 'Apendisitis akut, lainnya dan tidak spesifik',
    category: 'Saluran Cerna & Bedah Akut',
  },
  {
    code: 'K29.7',
    descriptionId: 'Gastritis, tidak spesifik',
    category: 'Saluran Cerna & Infeksi',
  },
  {
    code: 'R56.0',
    descriptionId: 'Kejang demam (Febrile convulsions pada anak)',
    category: 'Gejala & Tanda Klinis (R00-R99)',
  },
  {
    code: 'R57.0',
    descriptionId: 'Syok kardiogenik',
    category: 'Gejala & Tanda Klinis (R00-R99)',
  },
  {
    code: 'R57.1',
    descriptionId: 'Syok hipovolemik (Dehidrasi berat / Perdarahan masif)',
    category: 'Gejala & Tanda Klinis (R00-R99)',
  },
  {
    code: 'R57.2',
    descriptionId: 'Syok septik',
    category: 'Gejala & Tanda Klinis (R00-R99)',
  },
  {
    code: 'T78.2',
    descriptionId: 'Syok anafilaktik, tidak spesifik (Reaksi alergi berat)',
    category: 'Trauma & Cedera (S00-T98)',
  },
  {
    code: 'E11.0',
    descriptionId: 'Diabetes melitus tipe 2 dengan koma / hiperosmolar (KAD/HHS)',
    category: 'Endokrin & Metabolik',
  },
  {
    code: 'I64',
    descriptionId: 'Stroke, tidak terspesifikasi sebagai perdarahan atau infark',
    category: 'Neurologi / Saraf',
  },
  {
    code: 'R99',
    descriptionId: 'Penyebab kematian lain yang tidak jelas / Meninggal sebelum tiba (DOA)',
    category: 'Gejala & Tanda Klinis (R00-R99)',
  },
];

export const ICD10_EXTERNAL_CAUSES: ICD10Item[] = [
  {
    code: 'V23.4',
    descriptionId: 'Pengendara sepeda motor cedera akibat tabrakan dengan mobil/truk (KLL)',
    category: 'Penyebab Luar Cedera (V01-Y98)',
  },
  {
    code: 'V03.1',
    descriptionId: 'Pejalan kaki tertabrak mobil/truk di jalan raya (KLL)',
    category: 'Penyebab Luar Cedera (V01-Y98)',
  },
  {
    code: 'W19',
    descriptionId: 'Jatuh yang tidak terspesifikasi',
    category: 'Penyebab Luar Cedera (V01-Y98)',
  },
  {
    code: 'X99',
    descriptionId: 'Penganiayaan dengan benda tajam',
    category: 'Penyebab Luar Cedera (V01-Y98)',
  },
];

export const ICD9CM_EMERGENCY_LIST: ICD9CMItem[] = [
  {
    code: '89.52',
    descriptionId: 'Elektrokardiogram 12 sandapan (EKG)',
    category: 'Diagnostik Non-Operatif',
  },
  {
    code: '93.96',
    descriptionId: 'Pemberian oksigen / Terapi inhalasi oksigen',
    category: 'Respirasi & Terapi Medis',
  },
  {
    code: '96.04',
    descriptionId: 'Pemasangan pipa endotrakeal (Intubasi ETT)',
    category: 'Tindakan Gawat Nafas',
  },
  {
    code: '99.60',
    descriptionId: 'Resusitasi jantung paru (RJP / CPR)',
    category: 'Resusitasi Kardiopulmoner',
  },
  {
    code: '99.62',
    descriptionId: 'Defibrilasi / Kardioversi listrik darurat',
    category: 'Resusitasi Kardiopulmoner',
  },
  {
    code: '86.59',
    descriptionId: 'Penjahitan luka kulit dan jaringan subkutan (Hecting)',
    category: 'Bedah Minor & Perawatan Luka',
  },
  {
    code: '93.54',
    descriptionId: 'Pemasangan bidai / spalk imobilisasi fraktur',
    category: 'Ortopedi & Fiksasi',
  },
  {
    code: '99.18',
    descriptionId: 'Injeksi / infus cairan elektrolit intravena cito',
    category: 'Terapi Cairan & Farmakologi',
  },
  {
    code: '99.29',
    descriptionId: 'Injeksi obat terapeutik lainnya (Analgetik/Antibiotik/Inotropik)',
    category: 'Terapi Cairan & Farmakologi',
  },
  {
    code: '88.76',
    descriptionId: 'Ultrasonografi diagnostik abdomen (FAST Exam trauma)',
    category: 'Radiologi & Imejing',
  },
  {
    code: '87.44',
    descriptionId: 'Foto rontgen toraks rutin (Chest X-Ray AP/PA)',
    category: 'Radiologi & Imejing',
  },
  {
    code: '57.94',
    descriptionId: 'Pemasangan kateter urin menetap (Foley Catheter)',
    category: 'Urologi & Monitoring Urin',
  },
  {
    code: '96.07',
    descriptionId: 'Pemasangan pipa nasogastrik (NGT dekompresi)',
    category: 'Gastrointestinal',
  },
];
