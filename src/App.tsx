import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { PatientEmergencyRecord } from './types/rmik';
import { INITIAL_PATIENT_RECORDS } from './data/mockPatients';
import { Header } from './components/Header';
import { TriageDashboard } from './components/TriageDashboard';
import { TriageModal } from './components/TriageModal';
import { MedicalRecordSOAP } from './components/MedicalRecordSOAP';
import { IcdCodingModule } from './components/IcdCodingModule';
import { KlpcmAuditModule } from './components/KlpcmAuditModule';
import { StatisticsModule } from './components/StatisticsModule';
import { PrintResumeModal } from './components/PrintResumeModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { MobileDownloadModal } from './components/MobileDownloadModal';
import { MobileSimulatorView } from './components/MobileSimulatorView';

const STORAGE_KEY = 'medrec_igd_patients_v1';

export default function App() {
  const [patients, setPatients] = useState<PatientEmergencyRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_PATIENT_RECORDS;
  });

  const [activeTab, setActiveTab] = useState<
    'triage' | 'soap' | 'icd' | 'klpcm' | 'stats'
  >('triage');

  const [selectedPatientId, setSelectedPatientId] = useState<string>(
    INITIAL_PATIENT_RECORDS[0]?.id || ''
  );

  const [isNewPatientModalOpen, setIsNewPatientModalOpen] = useState(false);
  const [printPatientId, setPrintPatientId] = useState<string | null>(null);
  const [isMobileSimulator, setIsMobileSimulator] = useState(false);
  const [isMobileDownloadModalOpen, setIsMobileDownloadModalOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
    } catch {
      // ignore
    }
  }, [patients]);

  const handleSaveNewPatient = (newPatient: PatientEmergencyRecord) => {
    setPatients((prev) => [newPatient, ...prev]);
    setSelectedPatientId(newPatient.id);
  };

  const handleUpdatePatientSOAP = (updatedPatient: PatientEmergencyRecord) => {
    setPatients((prev) =>
      prev.map((p) => (p.id === updatedPatient.id ? updatedPatient : p))
    );
  };

  const handleFixPatientSignature = (patientId: string) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === patientId) {
          return {
            ...p,
            soap: {
              ...p.soap,
              plan: {
                ...p.soap.plan,
                isDoctorSigned: true,
              },
            },
            klpcm: {
              ...p.klpcm,
              isComplete: true,
              scorePercentage: 100,
              authenticationComplete: true,
              defectNotes: [],
              auditDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
            },
          };
        }
        return p;
      })
    );
    alert('Autentikasi DPJP Berhasil Disahkan! Skor KLPCM Berkas Mencapai 100% Lengkap.');
  };

  const handleResetData = () => {
    if (window.confirm('Reset data ke kondisi awal skenario presentasi sidang?')) {
      setPatients(INITIAL_PATIENT_RECORDS);
      setSelectedPatientId(INITIAL_PATIENT_RECORDS[0].id);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Navigation handlers
  const handleSelectPatientForSOAP = (patientId: string) => {
    setSelectedPatientId(patientId);
    setActiveTab('soap');
  };

  const handleSelectPatientForPrint = (patientId: string) => {
    setPrintPatientId(patientId);
  };

  const handleSelectPatientForKLPCM = (patientId: string) => {
    setSelectedPatientId(patientId);
    setActiveTab('klpcm');
  };

  const activePatientForPrint = patients.find((p) => p.id === printPatientId) || null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Header with Top Bar Contract */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenNewPatientModal={() => setIsNewPatientModalOpen(true)}
        onResetData={handleResetData}
        patients={patients}
        onOpenMobileDownload={() => setIsMobileDownloadModalOpen(true)}
        isMobileSimulator={isMobileSimulator}
        onToggleMobileSimulator={() => setIsMobileSimulator(!isMobileSimulator)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {isMobileSimulator ? (
          <MobileSimulatorView
            patients={patients}
            onSelectPatientSOAP={(id) => {
              setSelectedPatientId(id);
              setIsMobileSimulator(false);
              setActiveTab('soap');
            }}
            onOpenNewPatientModal={() => setIsNewPatientModalOpen(true)}
            onReturnToWebPortal={() => setIsMobileSimulator(false)}
            onOpenDownloadModal={() => setIsMobileDownloadModalOpen(true)}
          />
        ) : (
          <>
            {activeTab === 'triage' && (
              <TriageDashboard
                patients={patients}
                onSelectPatientForSOAP={handleSelectPatientForSOAP}
                onSelectPatientForPrint={handleSelectPatientForPrint}
                onSelectPatientForKLPCM={handleSelectPatientForKLPCM}
                onQuickNewPatient={() => setIsNewPatientModalOpen(true)}
              />
            )}

            {activeTab === 'soap' && (
              <MedicalRecordSOAP
                patients={patients}
                selectedPatientId={selectedPatientId}
                onSelectPatient={(id) => setSelectedPatientId(id)}
                onUpdatePatientSOAP={handleUpdatePatientSOAP}
                onOpenPrintModal={handleSelectPatientForPrint}
              />
            )}

            {activeTab === 'icd' && <IcdCodingModule />}

            {activeTab === 'klpcm' && (
              <KlpcmAuditModule
                patients={patients}
                onFixPatientSignature={handleFixPatientSignature}
                onOpenSOAP={handleSelectPatientForSOAP}
              />
            )}

            {activeTab === 'stats' && <StatisticsModule patients={patients} />}
          </>
        )}
      </main>

      {/* Clean Footer (No fake telemetry or engines) */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">MEDREC-IGD</span>
            <span aria-hidden="true">·</span>
            <span>Sistem Rekam Medis Elektronik Kegawatdaruratan Terstruktur</span>
          </div>

          <div className="flex items-center gap-2">
            <span>Karya Tugas Akhir Mahasiswa RMIK: Josua Steven Hutapea (NIM: 220308001)</span>
            <span aria-hidden="true">·</span>
            <span>Permenkes No. 24 Tahun 2022</span>
          </div>
        </div>
      </footer>

      {/* New Patient Registration & Triage Modal */}
      <TriageModal
        isOpen={isNewPatientModalOpen}
        onClose={() => setIsNewPatientModalOpen(false)}
        onSavePatient={handleSaveNewPatient}
        existingCount={patients.length}
      />

      {/* Print Resume Modal */}
      <PrintResumeModal
        patient={activePatientForPrint}
        isOpen={Boolean(printPatientId)}
        onClose={() => setPrintPatientId(null)}
      />

      {/* Mobile Download & QR Code Modal */}
      <MobileDownloadModal
        isOpen={isMobileDownloadModalOpen}
        onClose={() => setIsMobileDownloadModalOpen(false)}
        onOpenMobileSimulator={() => setIsMobileSimulator(true)}
        patients={patients}
      />

      {/* Mobile Quick Download Bar */}
      <div className="sm:hidden fixed bottom-3 left-3 right-3 z-30 bg-slate-900/95 text-white p-2.5 rounded-xl border border-slate-700 shadow-xl flex items-center justify-between no-print backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center shrink-0">
            <Download className="w-3.5 h-3.5" />
          </div>
          <div className="text-[11px] leading-tight">
            <span className="font-bold block">MEDREC-IGD Mobile</span>
            <span className="text-[10px] text-slate-400">Download ke Layar HP</span>
          </div>
        </div>
        <button
          onClick={() => setIsMobileDownloadModalOpen(true)}
          className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs"
        >
          Download
        </button>
      </div>

      {/* Offline Mode Indicator */}
      <OfflineIndicator />
    </div>
  );
}
