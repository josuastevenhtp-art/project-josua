import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { 
  Smartphone, 
  Download, 
  Copy, 
  Check, 
  Share2, 
  ExternalLink, 
  X, 
  ShieldCheck, 
  Laptop, 
  Monitor,
  FileCode,
  FileJson,
  CheckCircle2
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { PatientEmergencyRecord } from '../types/rmik';

interface MobileDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMobileSimulator: () => void;
  patients?: PatientEmergencyRecord[];
}

export const MobileDownloadModal: React.FC<MobileDownloadModalProps> = ({
  isOpen,
  onClose,
  onOpenMobileSimulator,
  patients = [],
}) => {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);
  const { isInstallable, isInstalled, install } = usePWAInstall();

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-dev-4wshlzqsuldungjyiidkm4-270156555811.asia-southeast1.run.app';

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(currentUrl, {
        width: 240,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      })
        .then((url: string) => setQrCodeDataUrl(url))
        .catch((err: any) => console.error('QR code generation error:', err));
    }
  }, [isOpen, currentUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDirectInstall = async () => {
    if (isInstallable) {
      await install();
    } else {
      alert('Untuk memasang di ponsel atau laptop:\n\n• Android: Ketuk menu titik tiga (⋮) di Chrome lalu pilih "Instal Aplikasi" / "Tambahkan ke Layar Utama".\n• iPhone/iPad: Ketuk tombol Share di Safari lalu pilih "Tambahkan ke Layar Utama".\n• Laptop/PC: Klik ikon komputer di bilah alamat URL Chrome/Edge.');
    }
  };

  const handleDownloadOfflineHtml = () => {
    const offlineHtmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MEDREC-IGD: Aplikasi Rekam Medis Standalone Offline</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; color: #0f172a; margin: 0; padding: 20px; }
    .card { max-width: 800px; margin: 20px auto; background: white; border-radius: 16px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); border: 1px solid #e2e8f0; }
    .badge { background: #fee2e2; color: #991b1b; padding: 4px 10px; border-radius: 6px; font-weight: bold; font-size: 12px; display: inline-block; }
    h1 { margin-top: 10px; font-size: 22px; }
    .btn { display: inline-block; background: #e11d48; color: white; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 15px; }
    .patient-row { padding: 12px; border-bottom: 1px solid #f1f5f9; display: flex; justify-content: space-between; align-items: center; }
    .p1 { color: #dc2626; font-weight: bold; }
    .p2 { color: #d97706; font-weight: bold; }
    .p3 { color: #16a34a; font-weight: bold; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">APLIKASI STANDALONE OFFLINE</span>
    <h1>MEDREC-IGD: Rekam Medis Elektronik Kegawatdaruratan</h1>
    <p>Aplikasi ini dapat dibuka langsung secara offline dari penyimpanan lokal Anda. Standar Permenkes No. 24 Tahun 2022.</p>
    <a href="${currentUrl}" class="btn" target="_blank">Buka Web Portal Online &raquo;</a>
    
    <h3 style="margin-top: 25px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Daftar Rekam Medis Pasien Terdaftar:</h3>
    <div>
      ${patients.map(p => `
        <div class="patient-row">
          <div>
            <strong>${p.mrn}</strong> - ${p.fullName} (${p.gender === 'L' ? 'L' : 'P'}, ${p.age} th)
            <div style="font-size: 12px; color: #64748b;">${p.soap.assessment.primaryDiagnosisText} (ICD-10: ${p.soap.assessment.primaryIcd10Code})</div>
          </div>
          <div><span class="${p.triage.category.toLowerCase()}">${p.triage.category}</span></div>
        </div>
      `).join('')}
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([offlineHtmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'MEDREC_IGD_Offline_App.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccessMessage('File Aplikasi Offline (MEDREC_IGD_Offline_App.html) Berhasil Diunduh!');
    setTimeout(() => setDownloadSuccessMessage(null), 4000);
  };

  const handleDownloadManifest = () => {
    const manifestJson = {
      name: "MEDREC-IGD: Rekam Medis Kegawatdaruratan",
      short_name: "MEDREC-IGD",
      start_url: currentUrl,
      display: "standalone",
      background_color: "#0f172a",
      theme_color: "#e11d48",
      description: "Aplikasi Sistem Rekam Medis Elektronik Kegawatdaruratan Permenkes 24/2022",
      icons: [
        { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
        { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" }
      ]
    };

    const blob = new Blob([JSON.stringify(manifestJson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'medrec_igd_manifest.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccessMessage('File Konfigurasi Web App Manifest Berhasil Diunduh!');
    setTimeout(() => setDownloadSuccessMessage(null), 4000);
  };

  const handleDownloadDatabase = () => {
    const blob = new Blob([JSON.stringify(patients, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `medrec_igd_database_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccessMessage('File Basis Data Rekam Medis Berhasil Diunduh!');
    setTimeout(() => setDownloadSuccessMessage(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto no-print">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Pusat Download & Instalasi Aplikasi MEDREC-IGD
              </h2>
              <p className="text-xs text-slate-500">
                Unduh file instalasi langsung atau pasang di HP Android, iPhone, dan Komputer
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Alert */}
        {downloadSuccessMessage && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 text-xs text-emerald-800 font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{downloadSuccessMessage}</span>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-slate-800 text-xs">
          {/* Main Grid: QR Code & Direct Mobile Download */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center bg-slate-50 p-5 rounded-2xl border border-slate-200">
            {/* Left: QR Code Scan */}
            <div className="flex flex-col items-center text-center space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Pindai dengan Kamera Ponsel Anda
              </span>
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 shadow-xs">
                {qrCodeDataUrl ? (
                  <img
                    src={qrCodeDataUrl}
                    alt="Scan QR Code untuk Membuka Aplikasi di HP"
                    className="w-44 h-44 rounded-lg"
                  />
                ) : (
                  <div className="w-44 h-44 flex items-center justify-center text-slate-400">
                    Membuat QR Code...
                  </div>
                )}
              </div>
              <p className="text-[11px] text-slate-500 max-w-[200px]">
                Arahkan kamera HP ke QR Code di atas untuk langsung membuka & mendownload aplikasi di ponsel.
              </p>
            </div>

            {/* Right: Direct Actions & Links */}
            <div className="space-y-3.5">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">
                  Instalasi Langsung ke Perangkat
                </span>
                <h3 className="text-sm font-bold text-slate-900">
                  Pasang Aplikasi di Layar Utama (PWA App)
                </h3>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Bisa dipasang langsung di HP Android, iPhone, tablet, maupun PC/laptop. Ringan, cepat, dan tetap berfungsi saat offline.
                </p>
              </div>

              {/* Copy URL Box */}
              <div className="p-2 rounded-lg bg-white border border-slate-200 flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] text-slate-600 truncate flex-1">
                  {currentUrl}
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-[11px] flex items-center gap-1 shrink-0 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Salin Link'}</span>
                </button>
              </div>

              {/* Install Button */}
              <button
                type="button"
                onClick={handleDirectInstall}
                className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Pasang / Install Aplikasi ke Perangkat Ini</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenMobileSimulator();
                }}
                className="w-full py-2 px-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <Smartphone className="w-3.5 h-3.5 text-indigo-600" />
                <span>Buka Simulasi Tampilan Mobile (Handheld Triase)</span>
              </button>
            </div>
          </div>

          {/* Direct File Downloads Section */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Download className="w-4 h-4 text-rose-600" />
              <span>Opsi Download Berkas & File Aplikasi Mandiri</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Option 1: Standalone HTML app */}
              <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50/40 flex flex-col justify-between space-y-2">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                    <FileCode className="w-4 h-4 text-rose-600" />
                    <span>Aplikasi Offline (.HTML)</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                    Download aplikasi dalam bentuk berkas HTML mandiri yang dapat dibuka langsung tanpa internet di perangkat apa pun.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadOfflineHtml}
                  className="w-full py-1.5 px-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-[11px] flex items-center justify-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .HTML</span>
                </button>
              </div>

              {/* Option 2: Manifest JSON */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-2">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                    <Smartphone className="w-4 h-4 text-blue-600" />
                    <span>Manifest PWA (.JSON)</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                    Download konfigurasi web app manifest resmi untuk integrasi Android WebAPK dan pendaftaran homescreen.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadManifest}
                  className="w-full py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-semibold text-[11px] flex items-center justify-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Manifest</span>
                </button>
              </div>

              {/* Option 3: Database JSON */}
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-2">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                    <FileJson className="w-4 h-4 text-emerald-600" />
                    <span>Basis Data Rekam Medis</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                    Download salinan lengkap seluruh rekam medis pasien ({patients.length} berkas), SOAP, ICD, dan KLPCM.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadDatabase}
                  className="w-full py-1.5 px-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] flex items-center justify-center gap-1 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download .JSON</span>
                </button>
              </div>
            </div>
          </div>

          {/* Guide for Android and iOS */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
            <span className="font-bold text-xs text-slate-900 block">
              Petunjuk Pasang di Layar Ponsel:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div className="space-y-1 border-l-2 border-emerald-500 pl-3">
                <div className="font-bold text-slate-800">Android (Google Chrome / Edge):</div>
                <p className="text-slate-600">
                  1. Buka link melalui Google Chrome.<br />
                  2. Ketuk ikon titik tiga (<strong>⋮</strong>) di kanan atas.<br />
                  3. Pilih <strong>"Instal Aplikasi"</strong> atau <strong>"Tambahkan ke Layar Utama"</strong>.
                </p>
              </div>

              <div className="space-y-1 border-l-2 border-indigo-500 pl-3">
                <div className="font-bold text-slate-800">iPhone / iPad (Safari):</div>
                <p className="text-slate-600">
                  1. Buka link melalui Safari.<br />
                  2. Ketuk tombol <strong>Share / Bagikan</strong> (ikon kotak panah ke atas).<br />
                  3. Gulir ke bawah lalu ketuk <strong>"Add to Home Screen"</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            * MEDREC-IGD berjalan 100% responsif di Web, Android, iOS, Windows, dan Mac
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-white transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

