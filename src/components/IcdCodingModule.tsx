import React, { useState } from 'react';
import { 
  ICD10_EMERGENCY_LIST, 
  ICD10_EXTERNAL_CAUSES, 
  ICD9CM_EMERGENCY_LIST 
} from '../data/icdData';
import { 
  BookOpen, 
  Search, 
  Award, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  FileSpreadsheet 
} from 'lucide-react';

export const IcdCodingModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'icd10' | 'icd9' | 'rules' | 'quiz'>('icd10');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Quiz state for presentation demonstration
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const filteredIcd10 = [...ICD10_EMERGENCY_LIST, ...ICD10_EXTERNAL_CAUSES].filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.descriptionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredIcd9 = ICD9CM_EMERGENCY_LIST.filter(
    (item) =>
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.descriptionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
              <Award className="w-4 h-4" />
              <span>KOMPETENSI INTI PEREKAM MEDIS & INFORMASI KESEHATAN (PMIK)</span>
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Modul Kodifikasi Morbiditas & Prosedur Medis Gawat Darurat
            </h1>
            <p className="text-xs text-slate-500 max-w-2xl">
              Klasifikasi klinis diagnosis berdasarkan ICD-10 WHO dan tindakan medis berdasarkan ICD-9-CM untuk standarisasi rekam medis elektronik, INA-CBGs, dan pelaporan SIRS Kemenkes RI.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
            <div className="text-right">
              <div className="text-[10px] text-amber-800 font-bold uppercase tracking-wider">Standar Koding</div>
              <div className="text-xs font-bold text-amber-950">ICD-10 Rev 2016 & ICD-9-CM</div>
            </div>
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-mono font-bold text-xs">
              WHO
            </div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-2 border-t border-slate-100 mt-5 pt-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('icd10')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'icd10'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kamus ICD-10 (Diagnosis)</span>
          </button>

          <button
            onClick={() => setActiveTab('icd9')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'icd9'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Kamus ICD-9-CM (Prosedur)</span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'rules'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Kaidah Koding WHO (Rules MB1-MB5)</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-rose-700 bg-rose-50 hover:bg-rose-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Simulasi Studi Kasus Sidang</span>
          </button>
        </div>
      </div>

      {/* SEARCH BAR (For ICD-10 and ICD-9) */}
      {(activeTab === 'icd10' || activeTab === 'icd9') && (
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={
              activeTab === 'icd10'
                ? 'Cari kode (misal: I21.9, S06.0) atau nama diagnosis medis...'
                : 'Cari kode prosedur (misal: 89.52, 93.96) atau tindakan klinis...'
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-white shadow-xs focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>
      )}

      {/* TAB 1: ICD-10 */}
      {activeTab === 'icd10' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-28">Kode ICD-10</th>
                  <th className="py-3 px-4">Deskripsi Klinis (Bahasa Indonesia)</th>
                  <th className="py-3 px-4 w-56">Kategori Bab ICD-10</th>
                  <th className="py-3 px-4 w-32 text-center">Tipe Kondisi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredIcd10.map((item) => (
                  <tr key={item.code} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-amber-700 tabular-nums">
                      {item.code}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {item.descriptionId}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {item.category}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                        {item.category.includes('Penyebab Luar') ? 'External Cause' : 'Emergency Morbidity'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ICD-9-CM */}
      {activeTab === 'icd9' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-28">Kode ICD-9</th>
                  <th className="py-3 px-4">Nama Prosedur / Tindakan Medis</th>
                  <th className="py-3 px-4 w-56">Kelompok Prosedur</th>
                  <th className="py-3 px-4 w-32 text-center">Sifat Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredIcd9.map((item) => (
                  <tr key={item.code} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-emerald-700 tabular-nums">
                      {item.code}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900">
                      {item.descriptionId}
                    </td>
                    <td className="py-3 px-4 text-slate-500">
                      {item.category}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-medium">
                        Cito Emergency
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: RULES MB1-MB5 */}
      {activeTab === 'rules' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold text-xs">
                  Rule MB1
                </span>
                <h3 className="text-xs font-bold text-slate-900">
                  Kondisi Minor Tercatat Sebagai Kondisi Utama
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bila suatu kondisi minor atau gejala dicatat sebagai kondisi utama, padahal ada kondisi lain yang lebih berat/signifikan yang mendapat penatalaksanaan intensif selama di IGD, maka pilihlah kondisi yang lebih signifikan tersebut sebagai Kondisi Utama.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-700">
                <span className="font-semibold text-slate-900">Contoh Kasus IGD:</span> Keluhan Utama tertulis "Sakit Kepala Ringan", namun setelah pemeriksaan didiagnosis "Perdarahan Subaraknoid / Stroke Hemoragik". Koder wajib mengkode Stroke sebagai kondisi utama.
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 font-mono font-bold text-xs">
                  Rule MB2
                </span>
                <h3 className="text-xs font-bold text-slate-900">
                  Beberapa Kondisi Dicatat Sebagai Kondisi Utama
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bila terdapat lebih dari satu kondisi yang dicatat bersamaan sebagai kondisi utama dan tidak ada satu pun yang ditandai secara khusus, pilih kondisi yang paling banyak menggunakan sumber daya klinis di IGD (pemeriksaan lab, imaging, atau tindakan cito).
              </p>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-700">
                <span className="font-semibold text-slate-900">Contoh Kasus IGD:</span> Pasien dengan Fraktur Femur dan Kontusio Musculorum. Pemilihan kode utama adalah Fraktur Femur (S72.0) karena memerlukan reduksi dan persiapan operasi.
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-bold text-xs">
                  Rule MB3
                </span>
                <h3 className="text-xs font-bold text-slate-900">
                  Kondisi yang Dicatat Merupakan Gejala dari Kondisi yang Didiagnosis
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Bila kondisi utama dicatat berupa gejala atau tanda klinis (Bab XVIII / Kode R), sedangkan diagnosis pasti yang mendasari gejala tersebut telah ditegakkan oleh dokter DPJP, maka pilihlah diagnosis pasti tersebut sebagai kondisi utama.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-700">
                <span className="font-semibold text-slate-900">Contoh Kasus IGD:</span> Nyeri dada retrosternal (R07.4) pada pasien yang terkonfirmasi STEMI Inferior (I21.9). Koder wajib menetapkan I21.9 sebagai diagnosis primer.
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-mono font-bold text-xs">
                  Kaidah Trauma
                </span>
                <h3 className="text-xs font-bold text-slate-900">
                  Dual Coding Cedera & External Cause (V01-Y98)
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Setiap kasus trauma gawat darurat (Bab XIX S00-T98) wajib disertai kode penyebab luar cedera (Bab XX V01-Y98) yang menggambarkan penyebab, tempat kejadian (place of occurrence), dan aktivitas saat cedera untuk kelengkapan administrasi asuransi Jasa Raharja dan BPJS.
              </p>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-[11px] text-slate-700">
                <span className="font-semibold text-slate-900">Standar INA-CBGs:</span> Kasus kecelakaan tanpa kode V01-Y98 akan mengalami penolakan klaim (dispute) oleh verifikator BPJS Kesehatan.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: QUIZ / SIMULASI SIDANG */}
      {activeTab === 'quiz' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5 shadow-xs">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">
              Simulasi Uji Kompetensi Sidang Tugas Akhir
            </span>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              Studi Kasus Kodifikasi Gawat Darurat: Pasien Polytrauma KLL
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              "Seorang laki-laki 28 tahun dibawa polisi ke IGD setelah sepeda motornya ditabrak mobil pickup. Pasien didiagnosis Fraktur Terbuka Tibia Sinistra Grade II, Gegar Otak Ringan (GCS 15), dan Vulnus Excoriatio Multipel. Dilakukan penjahitan luka (Hecting), pemasangan bidai spalk, serta foto rontgen toraks & cruris."
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800">
              Pertanyaan Penguji: Manakah susunan kombinasi kodifikasi ICD-10 dan ICD-9-CM yang paling tepat menurut kaidah Perekam Medis?
            </h3>

            <div className="space-y-2">
              <label 
                onClick={() => setQuizAnswer('A')}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  quizAnswer === 'A'
                    ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-400'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="quiz"
                  checked={quizAnswer === 'A'}
                  onChange={() => setQuizAnswer('A')}
                  className="mt-0.5"
                />
                <div className="text-xs text-slate-800">
                  <span className="font-bold">Opsi A:</span>{' '}
                  Diagnosis Utama: <span className="font-mono font-semibold">S82.2</span> (Fraktur Tibia) · Sekunder: <span className="font-mono font-semibold">S06.0</span> (Gegar otak) · External Cause: <span className="font-mono font-semibold">V23.4</span> (Pengendara motor vs mobil) · Prosedur: <span className="font-mono font-semibold">93.54</span> (Bidai), <span className="font-mono font-semibold">86.59</span> (Hecting), <span className="font-mono font-semibold">87.44</span> (Rontgen).
                </div>
              </label>

              <label 
                onClick={() => setQuizAnswer('B')}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  quizAnswer === 'B'
                    ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-400'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="quiz"
                  checked={quizAnswer === 'B'}
                  onChange={() => setQuizAnswer('B')}
                  className="mt-0.5"
                />
                <div className="text-xs text-slate-800">
                  <span className="font-bold">Opsi B:</span>{' '}
                  Diagnosis Utama: <span className="font-mono font-semibold">R52</span> (Nyeri tidak spesifik) · Sekunder: <span className="font-mono font-semibold">T14.1</span> · Prosedur: Hanya dicatat obat analgetik.
                </div>
              </label>

              <label 
                onClick={() => setQuizAnswer('C')}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  quizAnswer === 'C'
                    ? 'bg-rose-50 border-rose-400 ring-2 ring-rose-400'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="quiz"
                  checked={quizAnswer === 'C'}
                  onChange={() => setQuizAnswer('C')}
                  className="mt-0.5"
                />
                <div className="text-xs text-slate-800">
                  <span className="font-bold">Opsi C:</span>{' '}
                  Diagnosis Utama: <span className="font-mono font-semibold">V23.4</span> (External cause dijadikan kondisi utama tanpa kode fraktur).
                </div>
              </label>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setIsAnswerSubmitted(true)}
                disabled={!quizAnswer}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 disabled:opacity-50 transition-colors"
              >
                Verifikasi Jawaban Koder
              </button>
            </div>

            {isAnswerSubmitted && (
              <div className={`p-4 rounded-xl border mt-3 ${
                quizAnswer === 'A'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}>
                {quizAnswer === 'A' ? (
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs">Jawaban Benar! Analisis Sesuai Kaidah RMIK:</h4>
                      <p className="text-xs mt-1 leading-relaxed">
                        Kondisi utama adalah Fraktur Tibia (S82.2) karena menyerap sumber daya pengobatan terbesar di IGD. Kode cedera kepala (S06.0) sebagai diagnosis sekunder, dan kode penyebab luar kecelakaan sepeda motor (V23.4) wajib disertakan untuk klaim Jasa Raharja. Seluruh tindakan medis (93.54 bidai, 86.59 hecting, 87.44 rontgen) dikodekan lengkap sesuai ICD-9-CM.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-xs">Jawaban Kurang Tepat:</h4>
                      <p className="text-xs mt-1 leading-relaxed">
                        Jawaban yang tepat adalah Opsi A. External cause tidak boleh dijadikan diagnosis utama tanpa kondisi cedera patologis, dan gejala nyeri (R52) dilarang dikode sebagai diagnosis utama jika diagnosis definitif telah ditegakkan (Kaidah Rule MB3 WHO).
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
