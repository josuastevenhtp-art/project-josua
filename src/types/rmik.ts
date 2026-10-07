/**
 * Definisi Tipe Data Rekam Medis Elektronik Kegawatdaruratan (RME-IGD)
 * Standar Kurikulum Manajemen Informasi Kesehatan / Rekam Medis (RMIK)
 * Mengacu pada Permenkes No. 24 Tahun 2022 & SNARS/KARS
 */

export type TriageCategory = 'P1' | 'P2' | 'P3' | 'P0';

export interface VitalSigns {
  gcsEye: number; // 1-4
  gcsVerbal: number; // 1-5
  gcsMotor: number; // 1-6
  gcsTotal: number; // 3-15
  bloodPressureSystolic: number; // mmHg
  bloodPressureDiastolic: number; // mmHg
  heartRate: number; // x/menit
  respiratoryRate: number; // x/menit
  temperature: number; // C
  oxygenSaturation: number; // %
  painScale: number; // 0-10 (VAS / Wong-Baker)
}

export interface TriageAssessment {
  airway: 'Paten' | 'Sumbatan Parsial (Gargling/Stridor)' | 'Sumbatan Total';
  breathing: 'Normal' | 'Takipnea (>28x/m)' | 'Bradipnea (<12x/m)' | 'Apnea / Gasping' | 'Wheezing Berat';
  circulation: 'Nadi Kuat & Teratur' | 'Nadi Cepat & Lemah' | 'Nadi Tidak Teraba' | 'Akral Dingin & Pucat / Sianosis';
  disability: 'Alert (Sadar Penuh)' | 'Voice (Respon Suara)' | 'Pain (Respon Nyeri)' | 'Unresponsive (Koma)';
  category: TriageCategory;
  categoryRationale: string;
  triageOfficer: string;
  triageTimestamp: string;
  responseTimeMinutes: number; // Waktu tanggap pelayanan sejak tiba
}

export interface ICD10Item {
  code: string;
  descriptionId: string;
  category: string;
  isChronic?: boolean;
}

export interface ICD9CMItem {
  code: string;
  descriptionId: string;
  category: string;
}

export interface SOAPRecord {
  // S - Subjektif
  subjective: {
    chiefComplaint: string; // Keluhan Utama
    historyOfPresentIllness: string; // Riwayat Penyakit Sekarang (RPS)
    pastMedicalHistory: string; // Riwayat Penyakit Dahulu (RPD)
    allergies: string; // Alergi obat / makanan
    currentMedications: string; // Obat rutin yang dikonsumsi
  };
  // O - Objektif
  objective: {
    generalCondition: 'Tampak Sakit Berat' | 'Tampak Sakit Sedang' | 'Tampak Sakit Ringan' | 'Koma / Tidak Sadar';
    physicalExamHeadNeck: string;
    physicalExamThorax: string;
    physicalExamAbdomen: string;
    physicalExamExtremities: string;
    diagnosticTests: string; // Lab Cito, EKG 12-lead, Thorax Foto, dll
  };
  // A - Asesmen / Diagnosis
  assessment: {
    primaryDiagnosisText: string;
    primaryIcd10Code: string;
    primaryIcd10Desc: string;
    secondaryDiagnoses: Array<{
      text: string;
      icd10Code: string;
      icd10Desc: string;
    }>;
    externalCauseIcd10Code?: string; // V01-Y98 untuk Trauma/KLL
    externalCauseDesc?: string;
  };
  // P - Plan / Tata Laksana
  plan: {
    procedures: Array<{
      icd9Code: string;
      icd9Desc: string;
      notes?: string;
    }>;
    emergencyTherapy: string; // Infus, Injeksi, Obat Oral
    disposition: 'RAWAT_INAP' | 'RAWAT_JALAN' | 'RUJUK_KELUAR' | 'APS_MENOLAK' | 'MENINGGAL_IGD';
    dispositionNotes: string; // Ruang ICU/HCU, RS rujukan, atau kontrol poliklinik
    dischargeInstructions: string;
    attendingDoctor: string; // DPJP
    nurseInCharge: string;
    recordTimestamp: string;
    isDoctorSigned: boolean;
  };
}

export interface KlpcmAudit {
  isComplete: boolean;
  scorePercentage: number;
  identificationComplete: boolean; // Kelengkapan Nama, No RM, TTL, JK
  essentialReportsComplete: boolean; // Kelengkapan Lembar Triase, SOAP, Resume
  authenticationComplete: boolean; // Tanda Tangan & Nama Terang DPJP + Perawat
  goodDocumentationComplete: boolean; // Ketiadaan singkatan terlarang, pencatatan waktu tepat
  defectNotes: string[];
  auditedBy: string;
  auditDate: string;
}

export interface PatientEmergencyRecord {
  id: string;
  mrn: string; // Nomor Rekam Medis (misal 04-82-19)
  nik: string; // NIK 16 digit
  fullName: string;
  gender: 'L' | 'P';
  birthDate: string;
  age: number;
  address: string;
  phoneNumber: string;
  companionName: string;
  companionPhone: string;
  companionRelation: 'Suami/Istri' | 'Orang Tua' | 'Anak' | 'Keluarga' | 'Petugas Pengantar';
  arrivalTime: string;
  arrivalMethod: 'Datang Sendiri' | 'Ambulans 118' | 'Rujukan Puskesmas' | 'Rujukan RS Lain' | 'Polisi / KLL';
  insuranceType: 'BPJS Kesehatan (PBI)' | 'BPJS Kesehatan (Non-PBI)' | 'Asuransi Swasta' | 'Umum / Tunai' | 'Jasa Raharja';
  insuranceNumber: string;
  triage: TriageAssessment;
  vitals: VitalSigns;
  soap: SOAPRecord;
  informedConsentSigned: boolean;
  klpcm: KlpcmAudit;
}
