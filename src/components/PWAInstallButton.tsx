import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { 
  Download, 
  Smartphone, 
  Laptop, 
  Globe, 
  FileDown, 
  CheckCircle, 
  X, 
  Share2 
} from 'lucide-react';
import { PatientEmergencyRecord } from '../types/rmik';

interface PWAInstallButtonProps {
  patients: PatientEmergencyRecord[];
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ patients }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showModal, setShowModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleTriggerInstall = async () => {
    if (isInstallable) {
      const outcome = await install();
      if (outcome) {
        setShowModal(false);
      }
    } else {
      setShowModal(true);
    }
  };

  const handleExportDataJSON = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(patients, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `medrec_igd_backup_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch {
      alert('Gagal mengunduh file data rekam medis');
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-2xs"
        title="Opsi Unduh & Pasang Aplikasi PWA"
      >
        <Download className="w-3.5 h-3.5 text-rose-600" />
        <span>Unduh / Pasang App</span>
      </button>

      {/* Modal Pusat Unduhan & Instalasi */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto no-print">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center shadow-xs">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Pusat Unduhan & Instalasi Aplikasi (PWA & Web)
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    MEDREC-IGD dapat dipasang langsung ke perangkat atau diakses via web
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5 text-xs text-slate-700">
              {/* Option 1: PWA Installation */}
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider block">
                      Aplikasi Progresif (PWA)
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">
                      Pasang Aplikasi di Laptop, PC, atau Smartphone
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Aplikasi akan berjalan dalam mode mandiri (*standalone app*) tanpa bilah peramban, lebih cepat, dan dapat dibuka saat *offline*.
                    </p>
                  </div>
                </div>

                {isInstalled ? (
                  <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-800 font-semibold flex items-center gap-2 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>Aplikasi sudah terpasang di perangkat ini!</span>
                  </div>
                ) : isInstallable ? (
                  <button
                    onClick={handleTriggerInstall}
                    className="w-full py-2.5 px-4 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Download className="w-4 h-4" />
                    <span>Pasang Aplikasi Sekarang (Klik untuk Install)</span>
                  </button>
                ) : (
                  <div className="space-y-2 pt-1 border-t border-rose-100">
                    <span className="font-bold text-slate-800 text-[11px] block">
                      Panduan Pasang Sesuai Perangkat Anda:
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                      {/* Chrome / Edge on PC */}
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-1">
                        <div className="font-bold text-slate-900 flex items-center gap-1">
                          <Laptop className="w-3.5 h-3.5 text-blue-600" />
                          <span>Laptop / PC</span>
                        </div>
                        <p className="text-slate-500 text-[10px]">
                          Klik ikon <strong>Komputer / Install</strong> di bilah alamat URL Chrome atau Edge di kanan atas.
                        </p>
                      </div>

                      {/* Android */}
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-1">
                        <div className="font-bold text-slate-900 flex items-center gap-1">
                          <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Android</span>
                        </div>
                        <p className="text-slate-500 text-[10px]">
                          Tekan menu titik tiga (⋮) di Chrome lalu pilih <strong>"Instal Aplikasi"</strong> atau <strong>"Tambahkan ke Layar Utama"</strong>.
                        </p>
                      </div>

                      {/* iOS Safari */}
                      <div className="p-2.5 rounded-lg bg-white border border-slate-200 space-y-1">
                        <div className="font-bold text-slate-900 flex items-center gap-1">
                          <Share2 className="w-3.5 h-3.5 text-indigo-600" />
                          <span>iPhone / iPad</span>
                        </div>
                        <p className="text-slate-500 text-[10px]">
                          Buka di Safari, ketuk tombol <strong>Share</strong> (kotak panah ke atas) lalu pilih <strong>"Add to Home Screen"</strong>.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Option 2: Web Version */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-indigo-600" />
                  <h4 className="text-xs font-bold text-slate-900">
                    Akses Versi Web (Online Selalu Tersedia)
                  </h4>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Aplikasi ini sepenuhnya berbasis web responsif modern. Anda dapat langsung membuka tautan web aplikasi ini kapan saja melalui browser apa pun (Google Chrome, Safari, Mozilla Firefox, Microsoft Edge) tanpa perlu mengunduh apa pun.
                </p>
              </div>

              {/* Option 3: Download / Export Raw Clinical Database */}
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileDown className="w-4 h-4 text-emerald-600" />
                    <h4 className="text-xs font-bold text-slate-900">
                      Unduh Salinan Berkas Rekam Medis (Backup JSON)
                    </h4>
                  </div>
                  {downloadSuccess && (
                    <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Berhasil Diunduh!</span>
                    </span>
                  )}
                </div>
                <p className="text-slate-600 text-[11px]">
                  Unduh seluruh data registrasi pasien, pengkajian triase, lembar SOAP, kodifikasi ICD-10 & ICD-9, serta audit KLPCM dalam format file cadangan JSON ({patients.length} rekam medis).
                </p>
                <button
                  type="button"
                  onClick={handleExportDataJSON}
                  className="px-3.5 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <FileDown className="w-3.5 h-3.5 text-slate-600" />
                  <span>Unduh File Data (.JSON)</span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-white transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
