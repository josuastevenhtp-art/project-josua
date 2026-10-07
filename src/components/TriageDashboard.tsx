import React, { useState } from 'react';
import { 
  PatientEmergencyRecord, 
  TriageCategory 
} from '../types/rmik';
import { 
  Activity, 
  AlertCircle, 
  Clock, 
  Search, 
  FileText, 
  Printer, 
  CheckCircle, 
  AlertTriangle, 
  Heart, 
  Thermometer, 
  Wind,
  Shield,
  ArrowRight
} from 'lucide-react';

interface TriageDashboardProps {
  patients: PatientEmergencyRecord[];
  onSelectPatientForSOAP: (patientId: string) => void;
  onSelectPatientForPrint: (patientId: string) => void;
  onSelectPatientForKLPCM: (patientId: string) => void;
  onQuickNewPatient: () => void;
}

export const TriageDashboard: React.FC<TriageDashboardProps> = ({
  patients,
  onSelectPatientForSOAP,
  onSelectPatientForPrint,
  onSelectPatientForKLPCM,
  onQuickNewPatient,
}) => {
  const [filterCategory, setFilterCategory] = useState<'ALL' | TriageCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const countP1 = patients.filter((p) => p.triage.category === 'P1').length;
  const countP2 = patients.filter((p) => p.triage.category === 'P2').length;
  const countP3 = patients.filter((p) => p.triage.category === 'P3').length;
  const countP0 = patients.filter((p) => p.triage.category === 'P0').length;
  
  const avgResponseTime = patients.length > 0
    ? (patients.reduce((acc, p) => acc + p.triage.responseTimeMinutes, 0) / patients.length).toFixed(1)
    : '0';

  const filteredPatients = patients.filter((patient) => {
    const matchesCategory = filterCategory === 'ALL' || patient.triage.category === filterCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      patient.fullName.toLowerCase().includes(q) ||
      patient.mrn.toLowerCase().includes(q) ||
      patient.soap.assessment.primaryDiagnosisText.toLowerCase().includes(q) ||
      patient.soap.assessment.primaryIcd10Code.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Visual Clinical Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-xs">
        <div className="relative h-48 sm:h-56 w-full">
          <img
            src="/src/assets/images/rmik_emergency_banner_1791336638031.jpg"
            alt="Workstation Triase dan Rekam Medis IGD"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
          
          <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs text-rose-300 font-medium mb-1">
              <span>STANDAR PELAYANAN KEGAWATDARURATAN</span>
              <span aria-hidden="true">·</span>
              <span>AUSTRALASIAN TRIAGE SCALE (ATS) / ESI</span>
              <span aria-hidden="true">·</span>
              <span>PERMENKES NO. 24/2022</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white text-balance">
              Stasiun Triase & Dokumentasi Rekam Medis Elektronik IGD
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              Sentralisasi pemilahan kegawatdaruratan, pengkajian klinis SOAP, kodifikasi morbiditas ICD-10 & ICD-9-CM, serta pengawasan mutu KLPCM secara real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <div 
          onClick={() => setFilterCategory('P1')}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${
            filterCategory === 'P1'
              ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-500'
              : 'bg-white border-slate-200 hover:border-rose-200'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-rose-700 font-semibold">
            <span>P1 · RESUSITASI</span>
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">{countP1}</span>
            <span className="text-[11px] text-slate-500 font-mono">0 menit</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Gawat Darurat Mengancam Jiwa</p>
        </div>

        <div 
          onClick={() => setFilterCategory('P2')}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${
            filterCategory === 'P2'
              ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-500'
              : 'bg-white border-slate-200 hover:border-amber-200'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-amber-700 font-semibold">
            <span>P2 · EMERGENSI</span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">{countP2}</span>
            <span className="text-[11px] text-slate-500 font-mono">&lt; 15 menit</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Potensi Ancaman Organ/Fungsi</p>
        </div>

        <div 
          onClick={() => setFilterCategory('P3')}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${
            filterCategory === 'P3'
              ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500'
              : 'bg-white border-slate-200 hover:border-emerald-200'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-emerald-700 font-semibold">
            <span>P3 · NON-EMERGENSI</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">{countP3}</span>
            <span className="text-[11px] text-slate-500 font-mono">&lt; 60 menit</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Stabil / Tidak Darurat</p>
        </div>

        <div 
          onClick={() => setFilterCategory('P0')}
          className={`cursor-pointer p-4 rounded-xl border transition-all ${
            filterCategory === 'P0'
              ? 'bg-slate-100 border-slate-400 ring-2 ring-slate-700'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between text-xs text-slate-700 font-semibold">
            <span>P0 · DOA / MENINGGAL</span>
            <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">{countP0}</span>
            <span className="text-[11px] text-slate-500 font-mono">Forensik</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Meninggal Sebelum Tiba</p>
        </div>

        <div className="col-span-2 lg:col-span-1 p-4 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between text-xs text-indigo-700 font-semibold">
            <span>WAKTU TANGGAP</span>
            <Clock className="w-3.5 h-3.5" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-indigo-950 font-mono tabular-nums">{avgResponseTime}</span>
            <span className="text-xs text-slate-500">Menit (Target &le; 5)</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">✓ Memenuhi SPM Kemenkes</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setFilterCategory('ALL')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterCategory === 'ALL'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Semua ({patients.length})
          </button>
          <button
            onClick={() => setFilterCategory('P1')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterCategory === 'P1'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-rose-700 hover:bg-rose-50'
            }`}
          >
            P1 Merah ({countP1})
          </button>
          <button
            onClick={() => setFilterCategory('P2')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterCategory === 'P2'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-700 hover:bg-amber-50'
            }`}
          >
            P2 Kuning ({countP2})
          </button>
          <button
            onClick={() => setFilterCategory('P3')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterCategory === 'P3'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            P3 Hijau ({countP3})
          </button>
          <button
            onClick={() => setFilterCategory('P0')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              filterCategory === 'P0'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            P0 Hitam ({countP0})
          </button>
        </div>

        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Cari No. RM, Nama, atau Diagnosa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 bg-slate-50"
          />
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="space-y-3">
        {filteredPatients.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-slate-200">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">Tidak ada pasien yang sesuai filter</p>
            <p className="text-xs text-slate-500 mt-1">Coba sesuaikan kata kunci pencarian atau ubah kategori triase.</p>
          </div>
        ) : (
          filteredPatients.map((patient) => {
            const isP1 = patient.triage.category === 'P1';
            const isP2 = patient.triage.category === 'P2';
            const isP3 = patient.triage.category === 'P3';
            const isP0 = patient.triage.category === 'P0';

            const borderHighlight = isP1
              ? 'border-l-4 border-l-rose-600'
              : isP2
              ? 'border-l-4 border-l-amber-500'
              : isP3
              ? 'border-l-4 border-l-emerald-600'
              : 'border-l-4 border-l-slate-900';

            return (
              <div
                key={patient.id}
                className={`bg-white rounded-xl border border-slate-200 p-4 shadow-xs transition-shadow hover:shadow-md ${borderHighlight}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  {/* Left: Patient Demographic & Triage Indicator */}
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                        RM: {patient.mrn}
                      </span>
                      <h2 className="text-base font-bold text-slate-900">
                        {patient.fullName}
                      </h2>
                      <span className="text-xs text-slate-500">
                        ({patient.gender === 'L' ? 'Laki-laki' : 'Perempuan'}, {patient.age} th)
                      </span>
                      
                      {/* Triage Tag */}
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                        isP1
                          ? 'bg-rose-100 text-rose-800'
                          : isP2
                          ? 'bg-amber-100 text-amber-800'
                          : isP3
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-800 text-white'
                      }`}>
                        {patient.triage.category} · {
                          isP1 ? 'Resusitasi Cito' : isP2 ? 'Emergensi Akut' : isP3 ? 'Non-Emergensi' : 'Death on Arrival'
                        }
                      </span>

                      {/* Penjamin */}
                      <span className="text-[11px] text-slate-500 border border-slate-200 px-1.5 py-0.5 rounded bg-slate-50">
                        {patient.insuranceType}
                      </span>
                    </div>

                    {/* Metadata line with typographic separators */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span>Tiba: {patient.arrivalTime}</span>
                      <span aria-hidden="true">·</span>
                      <span>Cara Datang: {patient.arrivalMethod}</span>
                      <span aria-hidden="true">·</span>
                      <span>Petugas: {patient.triage.triageOfficer}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums text-slate-700">Respon: {patient.triage.responseTimeMinutes} mnt</span>
                    </div>

                    <p className="text-xs text-slate-700 font-medium">
                      <span className="text-slate-400">Alasan Triase:</span> {patient.triage.categoryRationale}
                    </p>
                  </div>

                  {/* Center: Vital Signs Strip */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-center font-mono">
                    <div className="px-1.5">
                      <div className="text-[10px] text-slate-400 flex items-center justify-center gap-0.5">
                        <Heart className="w-2.5 h-2.5 text-rose-500" /> TD
                      </div>
                      <div className="text-xs font-bold text-slate-800 tabular-nums">
                        {patient.vitals.bloodPressureSystolic}/{patient.vitals.bloodPressureDiastolic}
                      </div>
                    </div>

                    <div className="px-1.5">
                      <div className="text-[10px] text-slate-400">HR</div>
                      <div className="text-xs font-bold text-slate-800 tabular-nums">
                        {patient.vitals.heartRate} <span className="text-[9px] font-normal text-slate-400">bpm</span>
                      </div>
                    </div>

                    <div className="px-1.5">
                      <div className="text-[10px] text-slate-400 flex items-center justify-center gap-0.5">
                        <Wind className="w-2.5 h-2.5 text-blue-500" /> RR
                      </div>
                      <div className="text-xs font-bold text-slate-800 tabular-nums">
                        {patient.vitals.respiratoryRate} <span className="text-[9px] font-normal text-slate-400">x/m</span>
                      </div>
                    </div>

                    <div className="px-1.5">
                      <div className="text-[10px] text-slate-400">SpO2</div>
                      <div className={`text-xs font-bold tabular-nums ${patient.vitals.oxygenSaturation < 95 && patient.vitals.oxygenSaturation > 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                        {patient.vitals.oxygenSaturation}%
                      </div>
                    </div>

                    <div className="px-1.5">
                      <div className="text-[10px] text-slate-400 flex items-center justify-center gap-0.5">
                        <Thermometer className="w-2.5 h-2.5 text-amber-500" /> Suhu
                      </div>
                      <div className="text-xs font-bold text-slate-800 tabular-nums">
                        {patient.vitals.temperature}°C
                      </div>
                    </div>

                    <div className="px-1.5">
                      <div className="text-[10px] text-slate-400">GCS / Nyeri</div>
                      <div className="text-xs font-bold text-indigo-700 tabular-nums">
                        {patient.vitals.gcsTotal} / {patient.vitals.painScale}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end lg:self-center shrink-0">
                    <button
                      onClick={() => onSelectPatientForSOAP(patient.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-1 shadow-xs"
                      title="Buka Formulir SOAP & Pengkajian Medis"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>Rekam Medis (SOAP)</span>
                    </button>

                    <button
                      onClick={() => onSelectPatientForPrint(patient.id)}
                      className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1 shadow-xs"
                      title="Cetak Resume Medis Resmi RM-IGD"
                    >
                      <Printer className="w-3.5 h-3.5 text-slate-600" />
                      <span className="hidden sm:inline">Cetak RM-01</span>
                    </button>

                    <button
                      onClick={() => onSelectPatientForKLPCM(patient.id)}
                      className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 ${
                        patient.klpcm.isComplete
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                      }`}
                      title={patient.klpcm.isComplete ? 'Berkas Rekam Medis Lengkap' : 'Ada Ketidaklengkapan KLPCM'}
                    >
                      {patient.klpcm.isComplete ? (
                        <CheckCircle className="w-3.5 h-3.5" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5" />
                      )}
                      <span>{patient.klpcm.scorePercentage}%</span>
                    </button>
                  </div>
                </div>

                {/* Sub-bar: Diagnosis & Disposisi */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-medium">Diagnosa Utama:</span>
                    <span className="font-semibold text-slate-800">
                      {patient.soap.assessment.primaryDiagnosisText}
                    </span>
                    <span className="font-mono text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded text-[11px]">
                      ICD-10: {patient.soap.assessment.primaryIcd10Code}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-slate-400">Rencana Disposisi:</span>
                    <span className="font-semibold text-slate-800">
                      {patient.soap.plan.disposition.replace('_', ' ')}
                    </span>
                    {patient.soap.plan.dispositionNotes && (
                      <span className="text-slate-500 italic text-[11px]">
                        ({patient.soap.plan.dispositionNotes})
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* RMIK Note Box */}
      <div className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/60 flex items-start gap-3">
        <Shield className="w-5 h-5 text-indigo-700 shrink-0 mt-0.5" />
        <div className="text-xs text-indigo-950">
          <span className="font-bold">Standar Mutu Perekam Medis (RMIK):</span> Triase IGD merupakan pintu gerbang keselamatan pasien. Setiap pasien yang terdaftar di Triase wajib segera dibuatkan nomor rekam medis permanen (Unit Numbering System) untuk mencegah terjadinya duplikasi data (Master Patient Index Integrity) serta memastikan waktu tanggap pelayanan tercatat akurat.
        </div>
      </div>
    </div>
  );
};
