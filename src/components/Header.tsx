import React from 'react';
import { 
  Activity, 
  FileText, 
  BookOpen, 
  CheckSquare, 
  BarChart3, 
  PlusCircle, 
  RotateCcw,
  Smartphone,
  Monitor,
  Download
} from 'lucide-react';
import { PatientEmergencyRecord } from '../types/rmik';

interface HeaderProps {
  activeTab: 'triage' | 'soap' | 'icd' | 'klpcm' | 'stats';
  setActiveTab: (tab: 'triage' | 'soap' | 'icd' | 'klpcm' | 'stats') => void;
  onOpenNewPatientModal: () => void;
  onResetData: () => void;
  patients: PatientEmergencyRecord[];
  onOpenMobileDownload: () => void;
  isMobileSimulator: boolean;
  onToggleMobileSimulator: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenNewPatientModal,
  onResetData,
  patients,
  onOpenMobileDownload,
  isMobileSimulator,
  onToggleMobileSimulator,
}) => {
  const activePatientCount = patients.length;
  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-40 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                if (isMobileSimulator) onToggleMobileSimulator();
                setActiveTab('triage');
              }} 
              className="text-left group flex items-center gap-2.5 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow-xs">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors">
                MEDREC-IGD
              </span>
            </button>
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 pl-3 border-l border-slate-200">
              <span className="font-semibold text-slate-800">
                {isMobileSimulator ? 'Mode Handheld Ponsel' : 'Web Portal Sentral'}
              </span>
              <span aria-hidden="true">·</span>
              <span>Permenkes 24/2022</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums font-mono text-slate-700">{activePatientCount} Kasus</span>
            </div>
          </div>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => {
                if (isMobileSimulator) onToggleMobileSimulator();
                setActiveTab('triage');
              }}
              className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'triage' && !isMobileSimulator
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-rose-600" />
              <span>Triase & Antrian</span>
            </button>

            <button
              onClick={() => {
                if (isMobileSimulator) onToggleMobileSimulator();
                setActiveTab('soap');
              }}
              className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'soap' && !isMobileSimulator
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Rekam Medis (SOAP)</span>
            </button>

            <button
              onClick={() => {
                if (isMobileSimulator) onToggleMobileSimulator();
                setActiveTab('icd');
              }}
              className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'icd' && !isMobileSimulator
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>Kamus Koding (ICD)</span>
            </button>

            <button
              onClick={() => {
                if (isMobileSimulator) onToggleMobileSimulator();
                setActiveTab('klpcm');
              }}
              className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'klpcm' && !isMobileSimulator
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Audit Mutu KLPCM</span>
            </button>

            <button
              onClick={() => {
                if (isMobileSimulator) onToggleMobileSimulator();
                setActiveTab('stats');
              }}
              className={`px-3 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'stats' && !isMobileSimulator
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Statistik & Mutu</span>
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions + Mobile Download & View Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Direct Download App Modal Trigger */}
            <button
              onClick={onOpenMobileDownload}
              className="px-3 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shadow-xs"
              title="Pusat Download & Instalasi Aplikasi (Ponsel, PC, Offline HTML)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Aplikasi</span>
            </button>

            {/* Toggle Simulator Mode */}
            <button
              onClick={onToggleMobileSimulator}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 whitespace-nowrap ${
                isMobileSimulator
                  ? 'bg-slate-900 text-white font-bold shadow-2xs'
                  : 'text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
              title={isMobileSimulator ? 'Kembali ke Tampilan Web Portal' : 'Simulasikan Tampilan Handheld Ponsel'}
            >
              {isMobileSimulator ? (
                <>
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Web Portal</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden lg:inline">Mode Ponsel</span>
                </>
              )}
            </button>

            <button
              onClick={onResetData}
              title="Reset data ke contoh kasus awal sidang"
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenNewPatientModal}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors whitespace-nowrap flex items-center gap-1 shadow-xs"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">+ Pasien Baru</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden items-center gap-1 py-2 overflow-x-auto border-t border-slate-100 text-xs">
          <button
            onClick={() => {
              if (isMobileSimulator) onToggleMobileSimulator();
              setActiveTab('triage');
            }}
            className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'triage' && !isMobileSimulator ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Triase
          </button>
          <button
            onClick={() => {
              if (isMobileSimulator) onToggleMobileSimulator();
              setActiveTab('soap');
            }}
            className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'soap' && !isMobileSimulator ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            SOAP
          </button>
          <button
            onClick={() => {
              if (isMobileSimulator) onToggleMobileSimulator();
              setActiveTab('icd');
            }}
            className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'icd' && !isMobileSimulator ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            ICD
          </button>
          <button
            onClick={() => {
              if (isMobileSimulator) onToggleMobileSimulator();
              setActiveTab('klpcm');
            }}
            className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'klpcm' && !isMobileSimulator ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            KLPCM
          </button>
          <button
            onClick={() => {
              if (isMobileSimulator) onToggleMobileSimulator();
              setActiveTab('stats');
            }}
            className={`px-2.5 py-1.5 rounded-md whitespace-nowrap ${
              activeTab === 'stats' && !isMobileSimulator ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            Statistik
          </button>
        </div>
      </div>
    </header>
  );
};
