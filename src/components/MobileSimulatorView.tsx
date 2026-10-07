import React, { useState } from 'react';
import { 
  PatientEmergencyRecord, 
  TriageCategory 
} from '../types/rmik';
import { 
  Activity, 
  Heart, 
  Wind, 
  Thermometer, 
  Search, 
  Plus, 
  Monitor, 
  Download, 
  AlertTriangle, 
  CheckCircle, 
  Wifi, 
  Battery, 
  Signal, 
  ChevronRight,
  Shield
} from 'lucide-react';

interface MobileSimulatorViewProps {
  patients: PatientEmergencyRecord[];
  onSelectPatientSOAP: (patientId: string) => void;
  onOpenNewPatientModal: () => void;
  onReturnToWebPortal: () => void;
  onOpenDownloadModal: () => void;
}

export const MobileSimulatorView: React.FC<MobileSimulatorViewProps> = ({
  patients,
  onSelectPatientSOAP,
  onOpenNewPatientModal,
  onReturnToWebPortal,
  onOpenDownloadModal,
}) => {
  const [activeFilter, setActiveFilter] = useState<'ALL' | TriageCategory>('ALL');
  const [search, setSearch] = useState('');

  const filteredPatients = patients.filter((p) => {
    const matchCat = activeFilter === 'ALL' || p.triage.category === activeFilter;
    const matchSearch =
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.mrn.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="py-2 flex flex-col items-center">
      {/* Top Banner explaining Mobile vs Web view */}
      <div className="w-full max-w-md mb-3 flex items-center justify-between bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-xs text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold">Mode Aplikasi Ponsel (Mobile Bedside)</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenDownloadModal}
            className="px-2 py-1 rounded bg-rose-600 hover:bg-rose-700 text-white font-semibold text-[11px] flex items-center gap-1 transition-colors"
          >
            <Download className="w-3 h-3" />
            <span>Install</span>
          </button>
          <button
            onClick={onReturnToWebPortal}
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-[11px] flex items-center gap-1 transition-colors"
          >
            <Monitor className="w-3 h-3" />
            <span>Web Portal</span>
          </button>
        </div>
      </div>

      {/* Simulated Mobile Device Frame */}
      <div className="w-full max-w-sm bg-slate-950 rounded-[40px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-700/50">
        {/* Device Screen */}
        <div className="bg-slate-50 rounded-[32px] overflow-hidden flex flex-col h-[740px] border border-slate-300">
          {/* Simulated Mobile Status Bar */}
          <div className="bg-white px-5 pt-3 pb-1.5 flex items-center justify-between text-[11px] font-semibold text-slate-800 select-none border-b border-slate-100">
            <span>19:42</span>
            <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto" />
            <div className="flex items-center gap-1.5 text-slate-700">
              <Signal className="w-3 h-3" />
              <Wifi className="w-3 h-3" />
              <Battery className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Mobile App Header */}
          <div className="bg-white p-3.5 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold shadow-2xs">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-xs font-extrabold text-slate-900 tracking-tight">
                  MEDREC-IGD Mobile
                </h1>
                <p className="text-[10px] text-slate-500 font-mono">
                  {patients.length} Pasien Terdaftar
                </p>
              </div>
            </div>

            <button
              onClick={onOpenNewPatientModal}
              className="p-1.5 rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-2xs"
              title="Tambah Pasien Triase"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Search */}
          <div className="p-3 bg-white border-b border-slate-100">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Cari No. RM atau nama..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-[11px] bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {/* Touch Triage Filter Tabs */}
            <div className="flex items-center gap-1 mt-2 overflow-x-auto pb-0.5">
              <button
                onClick={() => setActiveFilter('ALL')}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-md whitespace-nowrap transition-colors ${
                  activeFilter === 'ALL' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Semua ({patients.length})
              </button>
              <button
                onClick={() => setActiveFilter('P1')}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-md whitespace-nowrap transition-colors ${
                  activeFilter === 'P1' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700'
                }`}
              >
                P1 Merah
              </button>
              <button
                onClick={() => setActiveFilter('P2')}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-md whitespace-nowrap transition-colors ${
                  activeFilter === 'P2' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-700'
                }`}
              >
                P2 Kuning
              </button>
              <button
                onClick={() => setActiveFilter('P3')}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-md whitespace-nowrap transition-colors ${
                  activeFilter === 'P3' ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-700'
                }`}
              >
                P3 Hijau
              </button>
              <button
                onClick={() => setActiveFilter('P0')}
                className={`px-2.5 py-1 text-[10px] font-bold rounded-md whitespace-nowrap transition-colors ${
                  activeFilter === 'P0' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                P0 Hitam
              </button>
            </div>
          </div>

          {/* Scrollable Patient Cards */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
            {filteredPatients.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                Tidak ada pasien ditemukan
              </div>
            ) : (
              filteredPatients.map((patient) => {
                const isP1 = patient.triage.category === 'P1';
                const isP2 = patient.triage.category === 'P2';
                const isP3 = patient.triage.category === 'P3';
                const isP0 = patient.triage.category === 'P0';

                return (
                  <div
                    key={patient.id}
                    onClick={() => onSelectPatientSOAP(patient.id)}
                    className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs hover:border-rose-300 transition-all cursor-pointer active:scale-[0.98]"
                  >
                    <div className="flex items-start justify-between gap-1 mb-1.5">
                      <div>
                        <span className="font-mono text-[10px] font-bold text-slate-500">
                          {patient.mrn}
                        </span>
                        <h2 className="text-xs font-bold text-slate-900 leading-tight">
                          {patient.fullName}
                        </h2>
                      </div>
                      <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                        isP1 ? 'bg-rose-100 text-rose-800' :
                        isP2 ? 'bg-amber-100 text-amber-800' :
                        isP3 ? 'bg-emerald-100 text-emerald-800' :
                        'bg-slate-800 text-white'
                      }`}>
                        {patient.triage.category}
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-600 line-clamp-1 mb-2">
                      {patient.soap.assessment.primaryDiagnosisText}
                    </p>

                    {/* Vitals Bar Compact */}
                    <div className="grid grid-cols-4 gap-1 text-[10px] bg-slate-50 p-1.5 rounded-lg border border-slate-100 font-mono text-center">
                      <div>
                        <span className="text-slate-400 text-[8px] block">TD</span>
                        <span className="font-bold">{patient.vitals.bloodPressureSystolic}/{patient.vitals.bloodPressureDiastolic}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[8px] block">HR</span>
                        <span className="font-bold">{patient.vitals.heartRate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[8px] block">SpO2</span>
                        <span className="font-bold">{patient.vitals.oxygenSaturation}%</span>
                      </div>
                      <div>
                        <span className="text-slate-400 text-[8px] block">GCS</span>
                        <span className="font-bold text-indigo-700">{patient.vitals.gcsTotal}</span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-50">
                      <span>Tiba: {patient.arrivalTime.split(' ')[1]}</span>
                      <span className="flex items-center gap-0.5 text-rose-600 font-semibold">
                        <span>Buka SOAP</span>
                        <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Bar Mobile */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={onReturnToWebPortal}
              className="text-[11px] font-bold text-slate-700 hover:text-slate-900 flex items-center gap-1"
            >
              <Monitor className="w-3.5 h-3.5 text-blue-600" />
              <span>Buka Web Portal Sentral</span>
            </button>

            <button
              onClick={onOpenDownloadModal}
              className="px-2.5 py-1 text-[10px] font-bold text-white bg-rose-600 rounded-lg shadow-2xs flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              <span>Pasang App</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
