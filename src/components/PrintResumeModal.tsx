import React from 'react';
import { PatientEmergencyRecord } from '../types/rmik';
import { Printer, X, ShieldCheck } from 'lucide-react';

interface PrintResumeModalProps {
  patient: PatientEmergencyRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PrintResumeModal: React.FC<PrintResumeModalProps> = ({
  patient,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !patient) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-300 overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Modal Top Bar (Hidden on print) */}
        <div className="px-6 py-3.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between no-print shrink-0">
          <div className="flex items-center gap-2">
            <Printer className="w-4 h-4 text-slate-700" />
            <span className="text-xs font-bold text-slate-800">
              Pratinjau Cetak: Lembar Ringkasan Rekam Medis Gawat Darurat (RM-IGD)
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              [Permenkes No. 24/2022]
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Dokumen / Ekspor PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Hospital Document Body */}
        <div className="p-8 overflow-y-auto flex-1 bg-white text-slate-900 font-sans print-page">
          {/* Official Hospital Letterhead (KOP SURAT) */}
          <div className="border-b-2 border-slate-900 pb-3 mb-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h1 className="text-base font-extrabold tracking-tight text-slate-900 uppercase">
                  RUMAH SAKIT UMUM PENDIDIKAN SIMULASI KEMENKES RI
                </h1>
                <p className="text-xs font-bold text-slate-800">
                  INSTALASI GAWAT DARURAT & UNIT REKAM MEDIS ELEKTRONIK
                </p>
                <p className="text-[10px] text-slate-600">
                  Jl. Kesehatan Medika No. 01 · Telp: (022) 7102938 · Email: igd@rsumedika.kemkes.go.id
                </p>
              </div>

              {/* Unit Numbering Box */}
              <div className="border-2 border-slate-900 p-2 text-center rounded bg-slate-50">
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-700">
                  NOMOR REKAM MEDIS
                </div>
                <div className="text-base font-mono font-extrabold tracking-widest text-slate-950 mt-0.5">
                  {patient.mrn}
                </div>
                <div className="text-[8px] text-slate-500 font-mono">UNS (Unit Numbering System)</div>
              </div>
            </div>

            <div className="mt-2 text-center border-t border-slate-300 pt-1.5">
              <h2 className="text-xs font-black tracking-widest uppercase text-slate-900">
                RINGKASAN PELAYANAN GAWAT DARURAT (EMERGENCY DISCHARGE SUMMARY)
              </h2>
            </div>
          </div>

          {/* Section 1: Demografi & Registrasi */}
          <div className="border border-slate-300 rounded mb-4 text-xs">
            <div className="bg-slate-100 px-3 py-1 font-bold border-b border-slate-300 uppercase text-[10px] text-slate-800">
              I. IDENTITAS PASIEN & DATA PENERIMAAN
            </div>
            <div className="p-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <span className="text-slate-500 text-[10px] block">Nama Pasien:</span>
                <span className="font-bold text-slate-900">{patient.fullName}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">NIK:</span>
                <span className="font-mono text-slate-900">{patient.nik}</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Jenis Kelamin / Usia:</span>
                <span className="font-semibold text-slate-900">
                  {patient.gender === 'L' ? 'Laki-laki' : 'Perempuan'} / {patient.age} Tahun
                </span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Penjamin / No. Kartu:</span>
                <span className="font-semibold text-slate-900">
                  {patient.insuranceType} ({patient.insuranceNumber})
                </span>
              </div>

              <div>
                <span className="text-slate-500 text-[10px] block">Waktu Tiba IGD:</span>
                <span className="font-mono text-slate-900">{patient.arrivalTime} WIB</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Cara Masuk:</span>
                <span className="text-slate-900">{patient.arrivalMethod}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-slate-500 text-[10px] block">Alamat Tinggal:</span>
                <span className="text-slate-900">{patient.address}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Triase & Tanda Vital */}
          <div className="border border-slate-300 rounded mb-4 text-xs">
            <div className="bg-slate-100 px-3 py-1 font-bold border-b border-slate-300 uppercase text-[10px] text-slate-800 flex items-center justify-between">
              <span>II. PENGKAJIAN TRIASE & TANDA-TANDA VITAL AWAL</span>
              <span className="font-mono">Waktu Tanggap: {patient.triage.responseTimeMinutes} Menit</span>
            </div>
            <div className="p-3 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Kategori Triase:</span>
                  <span className="font-bold px-2 py-0.5 rounded bg-slate-900 text-white font-mono">
                    {patient.triage.category} - {
                      patient.triage.category === 'P1'
                        ? 'Resusitasi Segera'
                        : patient.triage.category === 'P2'
                        ? 'Emergensi Akut'
                        : patient.triage.category === 'P3'
                        ? 'Non-Emergensi'
                        : 'Death on Arrival'
                    }
                  </span>
                </div>
                <div className="text-[11px] text-slate-600">
                  Petugas Triase: <span className="font-semibold">{patient.triage.triageOfficer}</span>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-2 text-center font-mono text-[11px] bg-slate-50 p-2 rounded border border-slate-200">
                <div>
                  <span className="text-slate-500 text-[9px] block">TD (mmHg)</span>
                  <span className="font-bold">{patient.vitals.bloodPressureSystolic}/{patient.vitals.bloodPressureDiastolic}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[9px] block">Nadi (bpm)</span>
                  <span className="font-bold">{patient.vitals.heartRate}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[9px] block">Nafas (x/m)</span>
                  <span className="font-bold">{patient.vitals.respiratoryRate}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[9px] block">Suhu (°C)</span>
                  <span className="font-bold">{patient.vitals.temperature}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[9px] block">SpO2 (%)</span>
                  <span className="font-bold">{patient.vitals.oxygenSaturation}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[9px] block">GCS / Nyeri</span>
                  <span className="font-bold text-slate-900">{patient.vitals.gcsTotal} / {patient.vitals.painScale}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Anamnesis & Pemeriksaan (SOAP) */}
          <div className="border border-slate-300 rounded mb-4 text-xs">
            <div className="bg-slate-100 px-3 py-1 font-bold border-b border-slate-300 uppercase text-[10px] text-slate-800">
              III. RINGKASAN KLINIS (SUBJEKTIF & OBJEKTIF)
            </div>
            <div className="p-3 space-y-2">
              <div>
                <span className="font-bold text-slate-800">Keluhan Utama: </span>
                <span>{patient.soap.subjective.chiefComplaint}</span>
              </div>
              <div>
                <span className="font-bold text-slate-800">Riwayat Penyakit Sekarang (RPS): </span>
                <span className="leading-relaxed">{patient.soap.subjective.historyOfPresentIllness}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="font-bold text-slate-800">Riwayat Penyakit Dahulu: </span>
                  <span>{patient.soap.subjective.pastMedicalHistory || '-'}</span>
                </div>
                <div className="bg-rose-50 p-1.5 rounded border border-rose-200">
                  <span className="font-bold text-rose-800">Riwayat Alergi: </span>
                  <span className="text-rose-900 font-semibold">{patient.soap.subjective.allergies || 'Tidak ada'}</span>
                </div>
              </div>
              <div>
                <span className="font-bold text-slate-800">Pemeriksaan Fisik & Penunjang Cito: </span>
                <span className="font-mono text-[11px] block mt-0.5 text-slate-700">
                  {patient.soap.objective.diagnosticTests}
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Kodifikasi Diagnosis & Prosedur Medis (ICD-10 & ICD-9-CM) */}
          <div className="border border-slate-300 rounded mb-4 text-xs">
            <div className="bg-slate-100 px-3 py-1 font-bold border-b border-slate-300 uppercase text-[10px] text-slate-800">
              IV. KODIFIKASI DIAGNOSIS (ICD-10) & TINDAKAN MEDIS (ICD-9-CM)
            </div>
            <div className="p-3 space-y-3">
              <div className="border-b border-slate-200 pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold block uppercase">
                      DIAGNOSIS UTAMA (PRIMARY DIAGNOSIS)
                    </span>
                    <span className="font-bold text-slate-900 text-sm">
                      {patient.soap.assessment.primaryDiagnosisText}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-slate-500 block uppercase font-mono">Kode ICD-10</span>
                    <span className="font-mono font-extrabold text-sm px-2 py-0.5 rounded bg-slate-100 text-slate-900 border border-slate-300">
                      {patient.soap.assessment.primaryIcd10Code}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-600 mt-0.5 block italic">
                  {patient.soap.assessment.primaryIcd10Desc}
                </span>
              </div>

              {/* External cause */}
              {patient.soap.assessment.externalCauseIcd10Code && (
                <div className="border-b border-slate-200 pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 font-semibold block uppercase">
                        PENYEBAB LUAR CEDERA (EXTERNAL CAUSE / KLL)
                      </span>
                      <span className="font-medium text-slate-900">
                        {patient.soap.assessment.externalCauseDesc || 'Kecelakaan Lalu Lintas'}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-200">
                      {patient.soap.assessment.externalCauseIcd10Code}
                    </span>
                  </div>
                </div>
              )}

              {/* Procedures ICD-9 */}
              <div>
                <span className="text-[10px] text-slate-500 font-semibold block uppercase mb-1">
                  PROSEDUR & TINDAKAN MEDIS IGD (ICD-9-CM)
                </span>
                <div className="space-y-1">
                  {patient.soap.plan.procedures.map((proc, idx) => (
                    <div key={idx} className="flex items-center justify-between text-[11px]">
                      <span>{idx + 1}. {proc.icd9Desc} {proc.notes ? `(${proc.notes})` : ''}</span>
                      <span className="font-mono font-bold text-slate-800 bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200">
                        {proc.icd9Code}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Disposisi & Rencana Tindak Lanjut */}
          <div className="border border-slate-300 rounded mb-4 text-xs">
            <div className="bg-slate-100 px-3 py-1 font-bold border-b border-slate-300 uppercase text-[10px] text-slate-800">
              V. DISPOSISI & KONDISI AKHIR KELUAR IGD
            </div>
            <div className="p-3 grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-500 text-[10px] block">Keputusan Disposisi:</span>
                <span className="font-extrabold text-slate-900">
                  {patient.soap.plan.disposition.replace('_', ' ')}
                </span>
                {patient.soap.plan.dispositionNotes && (
                  <span className="text-[11px] text-slate-600 block mt-0.5">
                    Tujuan: {patient.soap.plan.dispositionNotes}
                  </span>
                )}
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">Instruksi Edukasi / Kontrol:</span>
                <span className="text-slate-700 text-[11px]">
                  {patient.soap.plan.dischargeInstructions || 'Kontrol sesuai anjuran DPJP'}
                </span>
              </div>
            </div>
          </div>

          {/* Signatures & Authentication Block */}
          <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-300 text-xs">
            {/* Left: Verifikator RMIK */}
            <div className="text-center">
              <span className="text-[10px] text-slate-500 block">Diverifikasi & Dikodekan Oleh:</span>
              <span className="font-bold text-slate-800 block text-xs">Petugas / Mahasiswa Rekam Medis</span>
              
              <div className="h-16 flex items-center justify-center">
                <div className="border border-emerald-500 bg-emerald-50 text-emerald-800 px-3 py-1 rounded text-[10px] font-mono font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>TERVERIFIKASI RMIK PERMENKES 24/2022</span>
                </div>
              </div>

              <span className="font-bold underline text-slate-900 block">
                Josua Steven Hutapea
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                NIM. 220308001 (Mahasiswa RMIK)
              </span>
            </div>

            {/* Right: DPJP Doctor */}
            <div className="text-center">
              <span className="text-[10px] text-slate-500 block">Bandung, {patient.arrivalTime.split(' ')[0]}</span>
              <span className="font-bold text-slate-800 block text-xs">Dokter Penanggung Jawab Pelayanan (DPJP)</span>

              <div className="h-16 flex items-center justify-center">
                {patient.soap.plan.isDoctorSigned ? (
                  <div className="border border-blue-500 bg-blue-50 text-blue-900 px-3 py-1 rounded text-[10px] font-mono font-bold">
                    [TANDA TANGAN DIGITAL TERSERTIFIKASI BSrE]
                  </div>
                ) : (
                  <div className="text-rose-600 text-[10px] font-bold border border-dashed border-rose-300 p-1 rounded">
                    (Belum Ada TTD Digital DPJP - KLPCM)
                  </div>
                )}
              </div>

              <span className="font-bold underline text-slate-900 block">
                {patient.soap.plan.attendingDoctor}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                SIP. 446/182/DPJP-IGD/2025
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
