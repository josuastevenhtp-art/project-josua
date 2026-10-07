import React, { useState } from 'react';
import { 
  PatientEmergencyRecord, 
  ICD10Item, 
  ICD9CMItem 
} from '../types/rmik';
import { 
  ICD10_EMERGENCY_LIST, 
  ICD10_EXTERNAL_CAUSES, 
  ICD9CM_EMERGENCY_LIST 
} from '../data/icdData';
import { 
  FileText, 
  CheckCircle, 
  AlertTriangle, 
  Search, 
  Plus, 
  Trash2, 
  ShieldCheck, 
  Printer, 
  Save, 
  Stethoscope, 
  Pill, 
  Heart, 
  Activity 
} from 'lucide-react';

interface MedicalRecordSOAPProps {
  patients: PatientEmergencyRecord[];
  selectedPatientId: string;
  onSelectPatient: (patientId: string) => void;
  onUpdatePatientSOAP: (updatedRecord: PatientEmergencyRecord) => void;
  onOpenPrintModal: (patientId: string) => void;
}

export const MedicalRecordSOAP: React.FC<MedicalRecordSOAPProps> = ({
  patients,
  selectedPatientId,
  onSelectPatient,
  onUpdatePatientSOAP,
  onOpenPrintModal,
}) => {
  const currentPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  // Local editable SOAP state initialized from patient
  const [soap, setSoap] = useState(currentPatient.soap);
  const [activeSubTab, setActiveSubTab] = useState<'S' | 'O' | 'A' | 'P'>('S');

  // ICD-10 search state
  const [icd10Search, setIcd10Search] = useState('');
  const [showIcd10Picker, setShowIcd10Picker] = useState(false);

  // ICD-9 search state
  const [icd9Search, setIcd9Search] = useState('');
  const [showIcd9Picker, setShowIcd9Picker] = useState(false);

  // When patient selection changes, sync state
  React.useEffect(() => {
    setSoap(currentPatient.soap);
  }, [currentPatient.id]);

  if (!currentPatient) {
    return <div className="p-8 text-center text-slate-500">Tidak ada pasien dipilih</div>;
  }

  const filteredIcd10 = ICD10_EMERGENCY_LIST.filter(
    (item) =>
      item.code.toLowerCase().includes(icd10Search.toLowerCase()) ||
      item.descriptionId.toLowerCase().includes(icd10Search.toLowerCase())
  );

  const filteredIcd9 = ICD9CM_EMERGENCY_LIST.filter(
    (item) =>
      item.code.toLowerCase().includes(icd9Search.toLowerCase()) ||
      item.descriptionId.toLowerCase().includes(icd9Search.toLowerCase())
  );

  const handleSelectIcd10Primary = (item: ICD10Item) => {
    setSoap({
      ...soap,
      assessment: {
        ...soap.assessment,
        primaryIcd10Code: item.code,
        primaryIcd10Desc: item.descriptionId,
      },
    });
    setShowIcd10Picker(false);
  };

  const handleAddIcd9Procedure = (item: ICD9CMItem) => {
    if (soap.plan.procedures.some((p) => p.icd9Code === item.code)) {
      return; // Already added
    }
    setSoap({
      ...soap,
      plan: {
        ...soap.plan,
        procedures: [
          ...soap.plan.procedures,
          {
            icd9Code: item.code,
            icd9Desc: item.descriptionId,
            notes: 'Tindakan cito gawat darurat',
          },
        ],
      },
    });
    setShowIcd9Picker(false);
  };

  const handleRemoveProcedure = (index: number) => {
    const updated = [...soap.plan.procedures];
    updated.splice(index, 1);
    setSoap({
      ...soap,
      plan: {
        ...soap.plan,
        procedures: updated,
      },
    });
  };

  const handleToggleDoctorSignature = () => {
    const newSignStatus = !soap.plan.isDoctorSigned;
    const updatedSoap = {
      ...soap,
      plan: {
        ...soap.plan,
        isDoctorSigned: newSignStatus,
      },
    };
    setSoap(updatedSoap);

    // Also recalculate KLPCM
    const updatedPatient: PatientEmergencyRecord = {
      ...currentPatient,
      soap: updatedSoap,
      klpcm: {
        ...currentPatient.klpcm,
        isComplete: newSignStatus,
        scorePercentage: newSignStatus ? 100 : 75,
        authenticationComplete: newSignStatus,
        defectNotes: newSignStatus ? [] : ['Autentikasi DPJP dokter belum ditandatangani'],
        auditDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
      },
    };
    onUpdatePatientSOAP(updatedPatient);
  };

  const handleSaveAll = () => {
    const updatedPatient: PatientEmergencyRecord = {
      ...currentPatient,
      soap,
      klpcm: {
        ...currentPatient.klpcm,
        isComplete: soap.plan.isDoctorSigned,
        scorePercentage: soap.plan.isDoctorSigned ? 100 : 75,
        authenticationComplete: soap.plan.isDoctorSigned,
        defectNotes: soap.plan.isDoctorSigned ? [] : ['Autentikasi DPJP dokter belum ditandatangani'],
      },
    };
    onUpdatePatientSOAP(updatedPatient);
    alert('Rekam Medis SOAP Berhasil Disimpan & Diperbarui!');
  };

  return (
    <div className="space-y-6">
      {/* Top Patient Selector Bar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
            Pilih Pasien IGD:
          </span>
          {patients.map((p) => {
            const isSelected = p.id === currentPatient.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectPatient(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-900 text-white font-semibold shadow-xs'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${
                  p.triage.category === 'P1'
                    ? 'bg-rose-500'
                    : p.triage.category === 'P2'
                    ? 'bg-amber-500'
                    : p.triage.category === 'P3'
                    ? 'bg-emerald-500'
                    : 'bg-slate-400'
                }`} />
                <span>{p.fullName}</span>
                <span className="font-mono text-[11px] opacity-75">({p.mrn})</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
          <button
            onClick={() => onOpenPrintModal(currentPatient.id)}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Cetak RM-IGD</span>
          </button>

          <button
            onClick={handleSaveAll}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Simpan Perubahan</span>
          </button>
        </div>
      </div>

      {/* Patient Clinical Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                No. RM: {currentPatient.mrn}
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                {currentPatient.fullName}
              </h2>
              <span className="text-xs text-slate-500">
                ({currentPatient.gender === 'L' ? 'Laki-laki' : 'Perempuan'}, {currentPatient.age} th)
              </span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                currentPatient.triage.category === 'P1'
                  ? 'bg-rose-100 text-rose-800'
                  : currentPatient.triage.category === 'P2'
                  ? 'bg-amber-100 text-amber-800'
                  : currentPatient.triage.category === 'P3'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-800 text-white'
              }`}>
                {currentPatient.triage.category} · {
                  currentPatient.triage.category === 'P1'
                    ? 'Resusitasi Cito'
                    : currentPatient.triage.category === 'P2'
                    ? 'Emergensi Akut'
                    : currentPatient.triage.category === 'P3'
                    ? 'Non-Emergensi'
                    : 'Death on Arrival'
                }
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span>NIK: {currentPatient.nik}</span>
              <span aria-hidden="true">·</span>
              <span>Penjamin: {currentPatient.insuranceType} ({currentPatient.insuranceNumber})</span>
              <span aria-hidden="true">·</span>
              <span>Waktu Tiba: {currentPatient.arrivalTime}</span>
              <span aria-hidden="true">·</span>
              <span>Metode: {currentPatient.arrivalMethod}</span>
            </div>
          </div>

          {/* Vitals Summary Pill-free row */}
          <div className="flex flex-wrap items-center gap-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs font-mono">
            <div>
              <span className="text-slate-400">TD:</span>{' '}
              <span className="font-bold text-slate-900 tabular-nums">
                {currentPatient.vitals.bloodPressureSystolic}/{currentPatient.vitals.bloodPressureDiastolic}
              </span>
            </div>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <div>
              <span className="text-slate-400">HR:</span>{' '}
              <span className="font-bold text-slate-900 tabular-nums">{currentPatient.vitals.heartRate} bpm</span>
            </div>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <div>
              <span className="text-slate-400">RR:</span>{' '}
              <span className="font-bold text-slate-900 tabular-nums">{currentPatient.vitals.respiratoryRate} x/m</span>
            </div>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <div>
              <span className="text-slate-400">SpO2:</span>{' '}
              <span className="font-bold text-slate-900 tabular-nums">{currentPatient.vitals.oxygenSaturation}%</span>
            </div>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <div>
              <span className="text-slate-400">GCS:</span>{' '}
              <span className="font-bold text-indigo-700 tabular-nums">{currentPatient.vitals.gcsTotal}/15</span>
            </div>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <div>
              <span className="text-slate-400">Nyeri:</span>{' '}
              <span className="font-bold text-rose-700 tabular-nums">{currentPatient.vitals.painScale}/10</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main SOAP Navigation Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => setActiveSubTab('S')}
            className={`flex-1 py-3 px-4 text-xs font-bold transition-colors text-center border-b-2 ${
              activeSubTab === 'S'
                ? 'border-rose-600 text-rose-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="block text-base font-extrabold mb-0.5">S</span>
            <span>SUBJEKTIF (ANAMNESIS)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('O')}
            className={`flex-1 py-3 px-4 text-xs font-bold transition-colors text-center border-b-2 ${
              activeSubTab === 'O'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="block text-base font-extrabold mb-0.5">O</span>
            <span>OBJEKTIF (PEMERIKSAAN)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('A')}
            className={`flex-1 py-3 px-4 text-xs font-bold transition-colors text-center border-b-2 ${
              activeSubTab === 'A'
                ? 'border-amber-600 text-amber-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="block text-base font-extrabold mb-0.5">A</span>
            <span>ASESMEN & ICD-10</span>
          </button>

          <button
            onClick={() => setActiveSubTab('P')}
            className={`flex-1 py-3 px-4 text-xs font-bold transition-colors text-center border-b-2 ${
              activeSubTab === 'P'
                ? 'border-emerald-600 text-emerald-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="block text-base font-extrabold mb-0.5">P</span>
            <span>PLAN & ICD-9-CM</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {/* TAB S: SUBJEKTIF */}
          {activeSubTab === 'S' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Keluhan Utama *
                </label>
                <input
                  type="text"
                  value={soap.subjective.chiefComplaint}
                  onChange={(e) =>
                    setSoap({
                      ...soap,
                      subjective: { ...soap.subjective, chiefComplaint: e.target.value },
                    })
                  }
                  className="w-full text-xs font-semibold border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Riwayat Penyakit Sekarang (RPS) *
                </label>
                <textarea
                  rows={4}
                  value={soap.subjective.historyOfPresentIllness}
                  onChange={(e) =>
                    setSoap({
                      ...soap,
                      subjective: { ...soap.subjective, historyOfPresentIllness: e.target.value },
                    })
                  }
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-rose-500 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Riwayat Penyakit Dahulu (RPD)
                  </label>
                  <textarea
                    rows={2}
                    value={soap.subjective.pastMedicalHistory}
                    onChange={(e) =>
                      setSoap({
                        ...soap,
                        subjective: { ...soap.subjective, pastMedicalHistory: e.target.value },
                      })
                    }
                    className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="bg-rose-50/60 p-3 rounded-xl border border-rose-200">
                  <label className="block text-xs font-bold text-rose-900 mb-1 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Riwayat Alergi (Obat / Makanan) *</span>
                  </label>
                  <textarea
                    rows={2}
                    value={soap.subjective.allergies}
                    onChange={(e) =>
                      setSoap({
                        ...soap,
                        subjective: { ...soap.subjective, allergies: e.target.value },
                      })
                    }
                    className="w-full text-xs border border-rose-300 rounded-lg p-2 focus:ring-2 focus:ring-rose-500 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                    <Pill className="w-3.5 h-3.5 text-slate-500" />
                    <span>Obat yang Sedang Dikonsumsi</span>
                  </label>
                  <textarea
                    rows={2}
                    value={soap.subjective.currentMedications}
                    onChange={(e) =>
                      setSoap({
                        ...soap,
                        subjective: { ...soap.subjective, currentMedications: e.target.value },
                      })
                    }
                    className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB O: OBJEKTIF */}
          {activeSubTab === 'O' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Keadaan Umum Pasien
                </label>
                <select
                  value={soap.objective.generalCondition}
                  onChange={(e) =>
                    setSoap({
                      ...soap,
                      objective: { ...soap.objective, generalCondition: e.target.value as any },
                    })
                  }
                  className="w-full text-xs border border-slate-300 rounded-lg p-2.5 font-semibold text-slate-800"
                >
                  <option value="Tampak Sakit Berat">Tampak Sakit Berat</option>
                  <option value="Tampak Sakit Sedang">Tampak Sakit Sedang</option>
                  <option value="Tampak Sakit Ringan">Tampak Sakit Ringan</option>
                  <option value="Koma / Tidak Sadar">Koma / Tidak Sadar</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Pemeriksaan Kepala & Leher
                  </label>
                  <textarea
                    rows={2}
                    value={soap.objective.physicalExamHeadNeck}
                    onChange={(e) =>
                      setSoap({
                        ...soap,
                        objective: { ...soap.objective, physicalExamHeadNeck: e.target.value },
                      })
                    }
                    className="w-full text-xs border border-slate-300 rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Pemeriksaan Toraks (Jantung & Paru)
                  </label>
                  <textarea
                    rows={2}
                    value={soap.objective.physicalExamThorax}
                    onChange={(e) =>
                      setSoap({
                        ...soap,
                        objective: { ...soap.objective, physicalExamThorax: e.target.value },
                      })
                    }
                    className="w-full text-xs border border-slate-300 rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Pemeriksaan Abdomen
                  </label>
                  <textarea
                    rows={2}
                    value={soap.objective.physicalExamAbdomen}
                    onChange={(e) =>
                      setSoap({
                        ...soap,
                        objective: { ...soap.objective, physicalExamAbdomen: e.target.value },
                      })
                    }
                    className="w-full text-xs border border-slate-300 rounded-lg p-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Pemeriksaan Ekstremitas & Status Lokalis
                  </label>
                  <textarea
                    rows={2}
                    value={soap.objective.physicalExamExtremities}
                    onChange={(e) =>
                      setSoap({
                        ...soap,
                        objective: { ...soap.objective, physicalExamExtremities: e.target.value },
                      })
                    }
                    className="w-full text-xs border border-slate-300 rounded-lg p-2"
                  />
                </div>
              </div>

              <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-200">
                <label className="block text-xs font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  <span>Pemeriksaan Penunjang Cito (Laboratorium, EKG, X-Ray, FAST USG)</span>
                </label>
                <textarea
                  rows={3}
                  value={soap.objective.diagnosticTests}
                  onChange={(e) =>
                    setSoap({
                      ...soap,
                      objective: { ...soap.objective, diagnosticTests: e.target.value },
                    })
                  }
                  className="w-full text-xs border border-blue-300 rounded-lg p-2.5 bg-white font-mono"
                  placeholder="Catat hasil pemeriksaan laboratorium cito, EKG 12 sandapan, foto toraks..."
                />
              </div>
            </div>
          )}

          {/* TAB A: ASESMEN & ICD-10 */}
          {activeSubTab === 'A' && (
            <div className="space-y-4">
              <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-amber-950">
                    Diagnosis Utama Medis (Primary Diagnosis) *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowIcd10Picker(!showIcd10Picker)}
                    className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 underline"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Cari Kode ICD-10 Resmi</span>
                  </button>
                </div>

                <input
                  type="text"
                  value={soap.assessment.primaryDiagnosisText}
                  onChange={(e) =>
                    setSoap({
                      ...soap,
                      assessment: { ...soap.assessment, primaryDiagnosisText: e.target.value },
                    })
                  }
                  className="w-full text-xs font-bold border border-amber-300 rounded-lg p-2.5 bg-white text-slate-900 mb-2"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-medium">Kode ICD-10 Utama:</span>
                    <input
                      type="text"
                      value={soap.assessment.primaryIcd10Code}
                      onChange={(e) =>
                        setSoap({
                          ...soap,
                          assessment: { ...soap.assessment, primaryIcd10Code: e.target.value },
                        })
                      }
                      className="w-full font-mono font-bold text-xs border border-amber-300 rounded-lg p-2 bg-white mt-1"
                    />
                  </div>

                  <div>
                    <span className="text-slate-500 font-medium">Deskripsi ICD-10:</span>
                    <input
                      type="text"
                      value={soap.assessment.primaryIcd10Desc}
                      onChange={(e) =>
                        setSoap({
                          ...soap,
                          assessment: { ...soap.assessment, primaryIcd10Desc: e.target.value },
                        })
                      }
                      className="w-full text-xs border border-amber-300 rounded-lg p-2 bg-white mt-1 text-slate-700"
                    />
                  </div>
                </div>

                {/* ICD-10 Picker Dropdown */}
                {showIcd10Picker && (
                  <div className="mt-3 p-3 bg-white rounded-lg border border-slate-300 shadow-md">
                    <div className="relative mb-2">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Ketik nama penyakit atau kode ICD-10..."
                        value={icd10Search}
                        onChange={(e) => setIcd10Search(e.target.value)}
                        className="w-full pl-8 pr-2 py-1.5 text-xs border border-slate-300 rounded-md"
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto divide-y divide-slate-100 text-xs">
                      {filteredIcd10.map((item) => (
                        <div
                          key={item.code}
                          onClick={() => handleSelectIcd10Primary(item)}
                          className="p-2 hover:bg-amber-50 cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <span className="font-mono font-bold text-slate-900 mr-2">{item.code}</span>
                            <span className="text-slate-700">{item.descriptionId}</span>
                          </div>
                          <span className="text-[10px] text-slate-400">{item.category}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* External cause for trauma/accident */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                <h4 className="text-xs font-bold text-slate-800 mb-2">
                  Penyebab Luar Cedera / External Cause (V01-Y98) - Khusus Trauma & KLL
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 font-medium">Kode External Cause:</span>
                    <input
                      type="text"
                      placeholder="Contoh: V23.4 (Kecelakaan Motor)"
                      value={soap.assessment.externalCauseIcd10Code || ''}
                      onChange={(e) =>
                        setSoap({
                          ...soap,
                          assessment: { ...soap.assessment, externalCauseIcd10Code: e.target.value },
                        })
                      }
                      className="w-full font-mono text-xs border border-slate-300 rounded-lg p-2 bg-white mt-1"
                    />
                  </div>

                  <div>
                    <span className="text-slate-500 font-medium">Keterangan Kecelakaan:</span>
                    <input
                      type="text"
                      placeholder="Mekanisme kejadian trauma"
                      value={soap.assessment.externalCauseDesc || ''}
                      onChange={(e) =>
                        setSoap({
                          ...soap,
                          assessment: { ...soap.assessment, externalCauseDesc: e.target.value },
                        })
                      }
                      className="w-full text-xs border border-slate-300 rounded-lg p-2 bg-white mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB P: PLAN & ICD-9-CM */}
          {activeSubTab === 'P' && (
            <div className="space-y-4">
              {/* Procedures ICD-9 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <span>Tindakan & Prosedur Medis IGD (ICD-9-CM)</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowIcd9Picker(!showIcd9Picker)}
                    className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200 hover:bg-emerald-100 flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Tambah Prosedur ICD-9</span>
                  </button>
                </div>

                {showIcd9Picker && (
                  <div className="mb-3 p-3 bg-white rounded-lg border border-emerald-300 shadow-md">
                    <div className="relative mb-2">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Ketik prosedur atau kode ICD-9-CM..."
                        value={icd9Search}
                        onChange={(e) => setIcd9Search(e.target.value)}
                        className="w-full pl-8 pr-2 py-1.5 text-xs border border-slate-300 rounded-md"
                      />
                    </div>
                    <div className="max-h-44 overflow-y-auto divide-y divide-slate-100 text-xs">
                      {filteredIcd9.map((item) => (
                        <div
                          key={item.code}
                          onClick={() => handleAddIcd9Procedure(item)}
                          className="p-2 hover:bg-emerald-50 cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <span className="font-mono font-bold text-emerald-800 mr-2">{item.code}</span>
                            <span className="text-slate-700">{item.descriptionId}</span>
                          </div>
                          <span className="text-[10px] text-slate-400">{item.category}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  {soap.plan.procedures.map((proc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-slate-50 border border-slate-200 p-2.5 rounded-lg text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                          {proc.icd9Code}
                        </span>
                        <span className="font-medium text-slate-800">{proc.icd9Desc}</span>
                        {proc.notes && <span className="text-slate-500 italic text-[11px]">({proc.notes})</span>}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveProcedure(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pharmacology */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Terapi Farmakologi & Cairan Cito IGD
                </label>
                <textarea
                  rows={2}
                  value={soap.plan.emergencyTherapy}
                  onChange={(e) =>
                    setSoap({
                      ...soap,
                      plan: { ...soap.plan, emergencyTherapy: e.target.value },
                    })
                  }
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 font-mono"
                  placeholder="Infus, injeksi analgetik, antibiotik profilaksis..."
                />
              </div>

              {/* Disposition & Instructions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Rencana Disposisi Pasien IGD *
                  </label>
                  <select
                    value={soap.plan.disposition}
                    onChange={(e) =>
                      setSoap({
                        ...soap,
                        plan: { ...soap.plan, disposition: e.target.value as any },
                      })
                    }
                    className="w-full text-xs font-semibold border border-slate-300 rounded-lg p-2 bg-white"
                  >
                    <option value="RAWAT_INAP">RAWAT INAP (Admission)</option>
                    <option value="RAWAT_JALAN">RAWAT JALAN / PULANG (Discharge)</option>
                    <option value="RUJUK_KELUAR">RUJUK KE RS LAIN (Transfer Out)</option>
                    <option value="APS_MENOLAK">MENOLAK RAWAT / PULANG PAKSA (APS)</option>
                    <option value="MENINGGAL_IGD">MENINGGAL DUNIA DI IGD (Morgue)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Keterangan Ruang / Tujuan Disposisi
                  </label>
                  <input
                    type="text"
                    value={soap.plan.dispositionNotes}
                    onChange={(e) =>
                      setSoap({
                        ...soap,
                        plan: { ...soap.plan, dispositionNotes: e.target.value },
                      })
                    }
                    placeholder="Contoh: Ruang ICU Cito / Poliklinik Bedah"
                    className="w-full text-xs border border-slate-300 rounded-lg p-2"
                  />
                </div>
              </div>

              {/* Autentikasi DPJP & Perawat (Elemen KLPCM Kunci) */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Autentikasi DPJP (Dokter Penanggung Jawab Pelayanan)</span>
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      DPJP: <span className="font-semibold text-slate-800">{soap.plan.attendingDoctor}</span> · Perawat: {soap.plan.nurseInCharge}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleToggleDoctorSignature}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                      soap.plan.isDoctorSigned
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-rose-100 text-rose-800 hover:bg-rose-200 border border-rose-300'
                    }`}
                  >
                    {soap.plan.isDoctorSigned ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-white" />
                        <span>✓ Tervalidasi Tanda Tangan DPJP</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        <span>Klik untuk Autentikasi Dokter DPJP</span>
                      </>
                    )}
                  </button>
                </div>
                {!soap.plan.isDoctorSigned && (
                  <p className="text-[11px] text-rose-600 font-medium mt-2">
                    * Catatan RMIK: Berkas rekam medis ini masih terindikasi KLPCM (tidak lengkap autentikasi dokter).
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
