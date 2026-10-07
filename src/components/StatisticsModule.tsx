import React from 'react';
import { PatientEmergencyRecord } from '../types/rmik';
import { 
  BarChart3, 
  Clock, 
  Users, 
  HeartCrack, 
  ShieldCheck, 
  PieChart, 
  ArrowUpRight 
} from 'lucide-react';

interface StatisticsModuleProps {
  patients: PatientEmergencyRecord[];
}

export const StatisticsModule: React.FC<StatisticsModuleProps> = ({ patients }) => {
  const total = patients.length;

  const countP1 = patients.filter((p) => p.triage.category === 'P1').length;
  const countP2 = patients.filter((p) => p.triage.category === 'P2').length;
  const countP3 = patients.filter((p) => p.triage.category === 'P3').length;
  const countP0 = patients.filter((p) => p.triage.category === 'P0').length;

  const avgResponseTime = total > 0
    ? (patients.reduce((acc, p) => acc + p.triage.responseTimeMinutes, 0) / total).toFixed(1)
    : '0';

  // Disposition stats
  const countRawatInap = patients.filter((p) => p.soap.plan.disposition === 'RAWAT_INAP').length;
  const countRawatJalan = patients.filter((p) => p.soap.plan.disposition === 'RAWAT_JALAN').length;
  const countMeninggal = patients.filter((p) => p.soap.plan.disposition === 'MENINGGAL_IGD').length;
  const countRujuk = patients.filter((p) => p.soap.plan.disposition === 'RUJUK_KELUAR').length;
  const countAPS = patients.filter((p) => p.soap.plan.disposition === 'APS_MENOLAK').length;

  // Insurance stats
  const countBpjsPbi = patients.filter((p) => p.insuranceType === 'BPJS Kesehatan (PBI)').length;
  const countBpjsNonPbi = patients.filter((p) => p.insuranceType === 'BPJS Kesehatan (Non-PBI)').length;
  const countUmum = patients.filter((p) => p.insuranceType === 'Umum / Tunai').length;
  const countJasaRaharja = patients.filter((p) => p.insuranceType === 'Jasa Raharja').length;
  const countAsuransiSwasta = patients.filter((p) => p.insuranceType === 'Asuransi Swasta').length;

  // Morbidity ICD-10 grouping
  const icdCountMap: { [code: string]: { desc: string; count: number } } = {};
  patients.forEach((p) => {
    const code = p.soap.assessment.primaryIcd10Code;
    const desc = p.soap.assessment.primaryDiagnosisText;
    if (!icdCountMap[code]) {
      icdCountMap[code] = { desc, count: 0 };
    }
    icdCountMap[code].count += 1;
  });

  const sortedIcdList = Object.entries(icdCountMap).sort((a, b) => b[1].count - a[1].count);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-700">
              <BarChart3 className="w-4 h-4" />
              <span>SISTEM INFORMASI MANAJEMEN RUMAH SAKIT (SIMRS) & EPIDEMIOLOGI RMIK</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Indikator Pelayanan & Statistik Morbiditas Instalasi Gawat Darurat
            </h1>
            <p className="text-xs text-slate-500 max-w-2xl">
              Rekapitulasi berkala mutu pelayanan klinis gawat darurat sesuai RL 5 Sistem Informasi Rumah Sakit (SIRS Online) Kemenkes RI.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-indigo-50 p-3 rounded-xl border border-indigo-200">
            <div className="text-right">
              <div className="text-[10px] text-indigo-800 font-bold uppercase tracking-wider">Total Kunjungan</div>
              <div className="text-xl font-bold font-mono text-indigo-950 tabular-nums">{total} Pasien</div>
            </div>
            <Users className="w-6 h-6 text-indigo-700" />
          </div>
        </div>
      </div>

      {/* KPI Indicators Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>WAKTU TANGGAP IGD (SPM)</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {avgResponseTime} <span className="text-sm font-normal text-slate-500">menit</span>
            </span>
            <span className="text-xs text-emerald-700 font-semibold font-mono">Target &le; 5</span>
          </div>
          <p className="text-[11px] text-emerald-600 mt-1">✓ Memenuhi Standar Pelayanan Minimal</p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>TINGKAT RAWAT INAP (ADMISSION)</span>
            <ArrowUpRight className="w-4 h-4 text-blue-600" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {total > 0 ? Math.round((countRawatInap / total) * 100) : 0}%
            </span>
            <span className="text-xs text-slate-500">{countRawatInap} Pasien</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Transfer ke ICU / HCU / Ruang Rawat</p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>ANGKA KEMATIAN IGD (GDR/DOA)</span>
            <HeartCrack className="w-4 h-4 text-rose-600" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-rose-700 tabular-nums">
              {countMeninggal + countP0} <span className="text-sm font-normal text-slate-500">Kasus</span>
            </span>
            <span className="text-xs text-slate-500 font-mono">
              {total > 0 ? (((countMeninggal + countP0) / total) * 100).toFixed(1) : 0}%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Termasuk Kasus Death on Arrival (DOA)</p>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>CAKUPAN PENJAMIN BPJS</span>
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-mono text-slate-900 tabular-nums">
              {total > 0 ? Math.round(((countBpjsPbi + countBpjsNonPbi) / total) * 100) : 0}%
            </span>
            <span className="text-xs text-slate-500">{countBpjsPbi + countBpjsNonPbi} Pasien</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Integrasi Klaim Cito INA-CBGs</p>
        </div>
      </div>

      {/* Two Column Section: Triase Distribution & Disposisi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Triase Category Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Distribusi Beban Pasien per Kategori Triase</span>
            <PieChart className="w-4 h-4 text-slate-400" />
          </h2>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-rose-700">P1 · Resusitasi (Merah)</span>
                <span className="font-mono tabular-nums text-slate-700">
                  {countP1} ({total > 0 ? Math.round((countP1 / total) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-rose-600 h-2.5 rounded-full"
                  style={{ width: `${total > 0 ? (countP1 / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-amber-700">P2 · Emergensi (Kuning)</span>
                <span className="font-mono tabular-nums text-slate-700">
                  {countP2} ({total > 0 ? Math.round((countP2 / total) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-amber-500 h-2.5 rounded-full"
                  style={{ width: `${total > 0 ? (countP2 / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-emerald-700">P3 · Non-Emergensi (Hijau)</span>
                <span className="font-mono tabular-nums text-slate-700">
                  {countP3} ({total > 0 ? Math.round((countP3 / total) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-emerald-600 h-2.5 rounded-full"
                  style={{ width: `${total > 0 ? (countP3 / total) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-slate-800">P0 · DOA (Hitam)</span>
                <span className="font-mono tabular-nums text-slate-700">
                  {countP0} ({total > 0 ? Math.round((countP0 / total) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-slate-900 h-2.5 rounded-full"
                  style={{ width: `${total > 0 ? (countP0 / total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Disposisi IGD */}
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center justify-between">
            <span>Hasil Akhir Pelayanan IGD (Disposisi Alur Pasien)</span>
            <BarChart3 className="w-4 h-4 text-slate-400" />
          </h2>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span className="font-medium text-slate-700">Rawat Inap (ICU / HCU / Bangsal)</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{countRawatInap}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span className="font-medium text-slate-700">Rawat Jalan / Boleh Pulang</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{countRawatJalan}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span className="font-medium text-slate-700">Meninggal Dunia di IGD / Kamar Jenazah</span>
              <span className="font-mono font-bold text-rose-700 tabular-nums">{countMeninggal + countP0}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span className="font-medium text-slate-700">Rujuk ke Rumah Sakit Lain</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{countRujuk}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <span className="font-medium text-slate-700">Menolak Rawat Inap / Pulang Paksa (APS)</span>
              <span className="font-mono font-bold text-slate-900 tabular-nums">{countAPS}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Morbidity ICD-10 Ranking */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
          Distribusi Morbiditas Diagnosa Utama IGD Terbanyak (Buku Register Koding RMIK)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px]">
              <tr>
                <th className="py-2.5 px-4 w-12 text-center">No</th>
                <th className="py-2.5 px-4 w-28">Kode ICD-10</th>
                <th className="py-2.5 px-4">Diagnosis Klinis</th>
                <th className="py-2.5 px-4 w-32 text-center">Jumlah Kasus</th>
                <th className="py-2.5 px-4 w-32 text-center">Persentase</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedIcdList.map(([code, data], idx) => (
                <tr key={code} className="hover:bg-slate-50/70">
                  <td className="py-2.5 px-4 text-center font-mono text-slate-500">{idx + 1}</td>
                  <td className="py-2.5 px-4 font-mono font-bold text-amber-700">{code}</td>
                  <td className="py-2.5 px-4 font-semibold text-slate-800">{data.desc}</td>
                  <td className="py-2.5 px-4 text-center font-mono font-bold text-slate-900">{data.count}</td>
                  <td className="py-2.5 px-4 text-center font-mono text-slate-600">
                    {total > 0 ? ((data.count / total) * 100).toFixed(1) : 0}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
