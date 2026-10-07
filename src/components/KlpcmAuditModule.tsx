import React from 'react';
import { PatientEmergencyRecord } from '../types/rmik';
import { 
  CheckSquare, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  ShieldAlert, 
  FileCheck, 
  PenTool, 
  Clock 
} from 'lucide-react';

interface KlpcmAuditModuleProps {
  patients: PatientEmergencyRecord[];
  onFixPatientSignature: (patientId: string) => void;
  onOpenSOAP: (patientId: string) => void;
}

export const KlpcmAuditModule: React.FC<KlpcmAuditModuleProps> = ({
  patients,
  onFixPatientSignature,
  onOpenSOAP,
}) => {
  const totalReviewed = patients.length;
  const completeRecords = patients.filter((p) => p.klpcm.isComplete).length;
  const incompleteRecords = totalReviewed - completeRecords;
  const completenessPercentage = totalReviewed > 0 
    ? Math.round((completeRecords / totalReviewed) * 100) 
    : 100;

  // Audit 4 component counts
  const countIdent = patients.filter((p) => p.klpcm.identificationComplete).length;
  const countEssential = patients.filter((p) => p.klpcm.essentialReportsComplete).length;
  const countAuth = patients.filter((p) => p.klpcm.authenticationComplete).length;
  const countGoodDoc = patients.filter((p) => p.klpcm.goodDocumentationComplete).length;

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <CheckSquare className="w-4 h-4" />
              <span>KENDALI MUTU REKAM MEDIS & MANAJEMEN INFORMASI KESEHATAN (MRMIK)</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Audit Kuantitatif KLPCM (Ketidaklengkapan Pengisian Catatan Medis)
            </h1>
            <p className="text-xs text-slate-500 max-w-2xl">
              Evaluasi kepatuhan 4 komponen analisis kuantitatif rekam medis gawat darurat sesuai standar akreditasi KARS / JCI dan Standar Pelayanan Minimal (SPM) Kemenkes RI.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <div className="text-right">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Capaian Mutu SPM</div>
              <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
                {completenessPercentage}%
              </div>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-xs ${
              completenessPercentage >= 80 ? 'bg-emerald-600' : 'bg-rose-600'
            }`}>
              {completenessPercentage >= 80 ? 'BAIK' : 'DEFISIT'}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Komponen Analisis Kuantitatif KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>1. REVIEW IDENTIFIKASI</span>
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {Math.round((countIdent / totalReviewed) * 100)}%
            </span>
            <span className="text-xs text-slate-500">{countIdent}/{totalReviewed} Berkas</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Nama, No RM, NIK, Usia & JK</p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>2. LAPORAN PENTING</span>
            <FileCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {Math.round((countEssential / totalReviewed) * 100)}%
            </span>
            <span className="text-xs text-slate-500">{countEssential}/{totalReviewed} Berkas</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Lembar Triase & SOAP Lengkap</p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>3. REVIEW AUTENTIKASI</span>
            <PenTool className="w-4 h-4 text-amber-600" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className={`text-2xl font-bold font-mono tabular-nums ${
              countAuth < totalReviewed ? 'text-rose-600' : 'text-slate-900'
            }`}>
              {Math.round((countAuth / totalReviewed) * 100)}%
            </span>
            <span className="text-xs text-slate-500">{countAuth}/{totalReviewed} Berkas</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Tanda Tangan & PIN DPJP</p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>4. PENCATATAN BAIK</span>
            <Clock className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {Math.round((countGoodDoc / totalReviewed) * 100)}%
            </span>
            <span className="text-xs text-slate-500">{countGoodDoc}/{totalReviewed} Berkas</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Ketepatan Waktu & Keterbacaan</p>
        </div>
      </div>

      {/* Audit Detail Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Daftar Rekam Medis & Hasil Analisis Kuantitatif Mahasiswa RMIK
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Auditor RMIK: Josua Steven H. · Standar Permenkes 24/2022
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{completeRecords} Lengkap</span>
            </span>
            <span className="text-slate-300">·</span>
            <span className="flex items-center gap-1 text-rose-700 font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{incompleteRecords} Incomplete</span>
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">No. RM & Pasien</th>
                <th className="py-3 px-3 text-center">Identifikasi</th>
                <th className="py-3 px-3 text-center">Laporan Penting</th>
                <th className="py-3 px-3 text-center">Autentikasi DPJP</th>
                <th className="py-3 px-3 text-center">Pencatatan Baik</th>
                <th className="py-3 px-4">Temuan Defek / Kekurangan</th>
                <th className="py-3 px-4 text-center">Skor & Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.map((patient) => {
                const k = patient.klpcm;
                return (
                  <tr key={patient.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-slate-800">{patient.mrn}</div>
                      <div className="font-semibold text-slate-900">{patient.fullName}</div>
                      <div className="text-[11px] text-slate-500">
                        {patient.triage.category} · {patient.soap.assessment.primaryDiagnosisText}
                      </div>
                    </td>

                    <td className="py-3 px-3 text-center">
                      {k.identificationComplete ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 mx-auto" />
                      )}
                    </td>

                    <td className="py-3 px-3 text-center">
                      {k.essentialReportsComplete ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 mx-auto" />
                      )}
                    </td>

                    <td className="py-3 px-3 text-center">
                      {k.authenticationComplete ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 mx-auto" />
                      )}
                    </td>

                    <td className="py-3 px-3 text-center">
                      {k.goodDocumentationComplete ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 mx-auto" />
                      )}
                    </td>

                    <td className="py-3 px-4">
                      {k.defectNotes.length === 0 ? (
                        <span className="text-emerald-700 font-medium text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Berkas 100% Lengkap & Sah Secara Hukum</span>
                        </span>
                      ) : (
                        <div className="space-y-1">
                          {k.defectNotes.map((note, idx) => (
                            <div key={idx} className="text-rose-700 text-[11px] font-medium flex items-start gap-1">
                              <AlertTriangle className="w-3 h-3 shrink-0 mt-0.5" />
                              <span>{note}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="flex flex-col items-center gap-1.5">
                        <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                          k.isComplete
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {k.scorePercentage}%
                        </span>

                        {!k.authenticationComplete && (
                          <button
                            onClick={() => onFixPatientSignature(patient.id)}
                            className="px-2 py-1 text-[10px] font-bold text-white bg-rose-600 hover:bg-rose-700 rounded transition-colors whitespace-nowrap shadow-xs"
                            title="Simulasi verifikasi tanda tangan dokter langsung"
                          >
                            + Sahkan TTD Dokter
                          </button>
                        )}

                        <button
                          onClick={() => onOpenSOAP(patient.id)}
                          className="text-[11px] text-blue-600 hover:text-blue-800 underline"
                        >
                          Lihat Berkas
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* RMIK Theoretical Basis Card */}
      <div className="p-4 rounded-xl border border-slate-200 bg-white">
        <h3 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-indigo-600" />
          <span>Dasar Teori & Signifikansi Akademik KLPCM bagi Mahasiswa RMIK</span>
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Dalam manajemen rekam medis rumah sakit, angka KLPCM yang tinggi berpotensi menimbulkan risiko litigasi (hukum medis) serta keterlambatan klaim asuransi BPJS Kesehatan. Melalui sistem RME-IGD terstruktur ini, form tidak dapat dikunci untuk pengarsipan akhir sampai seluruh 4 komponen terpenuhi secara digital (Enforced Completeness Rule).
        </p>
      </div>
    </div>
  );
};
