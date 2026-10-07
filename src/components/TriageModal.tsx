import React, { useState } from 'react';
import { 
  PatientEmergencyRecord, 
  TriageCategory 
} from '../types/rmik';
import { 
  X, 
  Activity, 
  Calculator, 
  UserCheck, 
  Save 
} from 'lucide-react';

interface TriageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSavePatient: (newPatient: PatientEmergencyRecord) => void;
  existingCount: number;
}

export const TriageModal: React.FC<TriageModalProps> = ({
  isOpen,
  onClose,
  onSavePatient,
  existingCount,
}) => {
  if (!isOpen) return null;

  const now = new Date();
  const defaultTimeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  const generatedMRN = `04-82-${String(20 + existingCount + 1).padStart(2, '0')}`;

  // Form State
  const [mrn, setMrn] = useState(generatedMRN);
  const [nik, setNik] = useState('320114' + Math.floor(1000000000 + Math.random() * 9000000000));
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState<'L' | 'P'>('L');
  const [birthDate, setBirthDate] = useState('1990-01-01');
  const [age, setAge] = useState(36);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('0812' + Math.floor(10000000 + Math.random() * 90000000));
  const [companionName, setCompanionName] = useState('');
  const [companionPhone, setCompanionPhone] = useState('');
  const [companionRelation, setCompanionRelation] = useState<'Suami/Istri' | 'Orang Tua' | 'Anak' | 'Keluarga' | 'Petugas Pengantar'>('Keluarga');
  const [arrivalMethod, setArrivalMethod] = useState<'Datang Sendiri' | 'Ambulans 118' | 'Rujukan Puskesmas' | 'Rujukan RS Lain' | 'Polisi / KLL'>('Datang Sendiri');
  const [insuranceType, setInsuranceType] = useState<'BPJS Kesehatan (PBI)' | 'BPJS Kesehatan (Non-PBI)' | 'Asuransi Swasta' | 'Umum / Tunai' | 'Jasa Raharja'>('BPJS Kesehatan (Non-PBI)');
  const [insuranceNumber, setInsuranceNumber] = useState('000' + Math.floor(1000000000 + Math.random() * 9000000000));

  // Triage state
  const [category, setCategory] = useState<TriageCategory>('P2');
  const [categoryRationale, setCategoryRationale] = useState('');
  const [airway, setAirway] = useState<'Paten' | 'Sumbatan Parsial (Gargling/Stridor)' | 'Sumbatan Total'>('Paten');
  const [breathing, setBreathing] = useState<'Normal' | 'Takipnea (>28x/m)' | 'Bradipnea (<12x/m)' | 'Apnea / Gasping' | 'Wheezing Berat'>('Normal');
  const [circulation, setCirculation] = useState<'Nadi Kuat & Teratur' | 'Nadi Cepat & Lemah' | 'Nadi Tidak Teraba' | 'Akral Dingin & Pucat / Sianosis'>('Nadi Kuat & Teratur');
  const [disability, setDisability] = useState<'Alert (Sadar Penuh)' | 'Voice (Respon Suara)' | 'Pain (Respon Nyeri)' | 'Unresponsive (Koma)'>('Alert (Sadar Penuh)');
  const [triageOfficer, setTriageOfficer] = useState('Ns. Hendra Wijaya, S.Kep');

  // Vitals & GCS
  const [gcsEye, setGcsEye] = useState(4);
  const [gcsVerbal, setGcsVerbal] = useState(5);
  const [gcsMotor, setGcsMotor] = useState(6);
  const gcsTotal = gcsEye + gcsVerbal + gcsMotor;

  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(80);
  const [heartRate, setHeartRate] = useState(84);
  const [respiratoryRate, setRespiratoryRate] = useState(20);
  const [temperature, setTemperature] = useState(36.7);
  const [oxygenSaturation, setOxygenSaturation] = useState(98);
  const [painScale, setPainScale] = useState(4);

  // Quick preset loader for presentation demo
  const handleLoadPreset = (presetType: 'STEMI' | 'TRAUMA_KLL' | 'ASTHMA' | 'DISPEPSIA') => {
    if (presetType === 'STEMI') {
      setFullName('Tn. Haryono Wibowo');
      setAge(58);
      setGender('L');
      setCategory('P1');
      setCategoryRationale('Nyeri dada seperti tertindih beban berat menjalar ke leher dan lengan kiri, keringat dingin, mual.');
      setAirway('Paten');
      setBreathing('Takipnea (>28x/m)');
      setCirculation('Akral Dingin & Pucat / Sianosis');
      setSystolic(95);
      setDiastolic(65);
      setHeartRate(112);
      setRespiratoryRate(28);
      setOxygenSaturation(92);
      setPainScale(9);
    } else if (presetType === 'TRAUMA_KLL') {
      setFullName('Nn. Amanda Novita');
      setAge(24);
      setGender('P');
      setCategory('P2');
      setArrivalMethod('Polisi / KLL');
      setInsuranceType('Jasa Raharja');
      setCategoryRationale('Kecelakaan motor vs minibus. Deformitas regio antebrachii dextra, nyeri tekan hebat, vulnus excoriatio multipel.');
      setPainScale(7);
      setSystolic(115);
      setDiastolic(75);
      setHeartRate(94);
    } else if (presetType === 'ASTHMA') {
      setFullName('Tn. Muhammad Rizal');
      setAge(35);
      setGender('L');
      setCategory('P1');
      setCategoryRationale('Sesak nafas berat mendadak, mengi nyaring, bicara terputus-putus, riwayat asma bronkial.');
      setBreathing('Wheezing Berat');
      setRespiratoryRate(32);
      setOxygenSaturation(90);
      setHeartRate(120);
    } else {
      setFullName('Ny. Kartika Sari');
      setAge(42);
      setGender('P');
      setCategory('P3');
      setCategoryRationale('Nyeri ulu hati terasa perih sejak 3 hari, mual, kembung, tidak ada muntah darah.');
      setPainScale(3);
      setSystolic(120);
      setDiastolic(80);
      setHeartRate(78);
      setRespiratoryRate(18);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName) {
      alert('Nama Pasien wajib diisi!');
      return;
    }

    const newRecord: PatientEmergencyRecord = {
      id: `emg-${Date.now()}`,
      mrn,
      nik,
      fullName,
      gender,
      birthDate,
      age: Number(age),
      address: address || 'Kota Bandung, Jawa Barat',
      phoneNumber,
      companionName: companionName || 'Keluarga Pasien',
      companionPhone: companionPhone || phoneNumber,
      companionRelation,
      arrivalTime: defaultTimeStr,
      arrivalMethod,
      insuranceType,
      insuranceNumber,
      triage: {
        airway,
        breathing,
        circulation,
        disability,
        category,
        categoryRationale: categoryRationale || 'Pengkajian triase awal gawat darurat.',
        triageOfficer,
        triageTimestamp: defaultTimeStr,
        responseTimeMinutes: category === 'P1' ? 0 : category === 'P2' ? 4 : 10,
      },
      vitals: {
        gcsEye,
        gcsVerbal,
        gcsMotor,
        gcsTotal,
        bloodPressureSystolic: Number(systolic),
        bloodPressureDiastolic: Number(diastolic),
        heartRate: Number(heartRate),
        respiratoryRate: Number(respiratoryRate),
        temperature: Number(temperature),
        oxygenSaturation: Number(oxygenSaturation),
        painScale: Number(painScale),
      },
      soap: {
        subjective: {
          chiefComplaint: categoryRationale || 'Keluhan dalam evaluasi awal IGD.',
          historyOfPresentIllness: `Pasien datang ke IGD dengan ${categoryRationale}. Dilakukan pengkajian awal.`,
          pastMedicalHistory: 'Riwayat medis dalam evaluasi anamnesis lanjutan.',
          allergies: 'Tidak ada riwayat alergi yang dilaporkan.',
          currentMedications: 'Tidak ada obat rutin yang dikonsumsi.',
        },
        objective: {
          generalCondition: category === 'P1' ? 'Tampak Sakit Berat' : category === 'P2' ? 'Tampak Sakit Sedang' : 'Tampak Sakit Ringan',
          physicalExamHeadNeck: 'Bentuk kepala simetris, konjungtiva tidak anemis.',
          physicalExamThorax: 'Cor: S1-S2 normal. Pulmo: Suara nafas dasar vesikuler.',
          physicalExamAbdomen: 'Supel, bising usus normal.',
          physicalExamExtremities: 'Hangat, capillary refill time < 2 detik.',
          diagnosticTests: 'Pemeriksaan laboratorium dan penunjang cito diinstruksikan.',
        },
        assessment: {
          primaryDiagnosisText: category === 'P1' ? 'Sindrom Koroner Akut / Gawat Nafas' : 'Observasi Kasus Kegawatdaruratan',
          primaryIcd10Code: category === 'P1' ? 'I21.9' : 'R57.0',
          primaryIcd10Desc: category === 'P1' ? 'Infark miokard akut, tidak spesifik (STEMI/NSTEMI)' : 'Gejala klinis gawat darurat',
          secondaryDiagnoses: [],
        },
        plan: {
          procedures: [
            {
              icd9Code: '89.52',
              icd9Desc: 'Elektrokardiogram 12 sandapan (EKG)',
              notes: 'Monitoring cito',
            },
            {
              icd9Code: '93.96',
              icd9Desc: 'Pemberian oksigen / Terapi inhalasi oksigen',
              notes: 'Nasal kanul jika indikasi',
            },
          ],
          emergencyTherapy: 'Pemberian terapi stabilisasi cairan dan analgesik cito sesuai instruksi DPJP.',
          disposition: category === 'P1' ? 'RAWAT_INAP' : 'RAWAT_JALAN',
          dispositionNotes: category === 'P1' ? 'Persiapan ruangan rawat intensif' : 'Observasi 4 jam sebelum dipulangkan',
          dischargeInstructions: 'Edukasi tanda bahaya kegawatdaruratan kepada keluarga.',
          attendingDoctor: 'dr. Fajar Baskoro, Sp.JP, FIHA',
          nurseInCharge: triageOfficer,
          recordTimestamp: defaultTimeStr,
          isDoctorSigned: false, // Default false to enable KLPCM audit workflow demonstration!
        },
      },
      informedConsentSigned: true,
      klpcm: {
        isComplete: false,
        scorePercentage: 75,
        identificationComplete: true,
        essentialReportsComplete: true,
        authenticationComplete: false,
        goodDocumentationComplete: true,
        defectNotes: ['Autentikasi DPJP dokter belum ditandatangani'],
        auditedBy: 'Josua Steven H. (Mahasiswa RMIK)',
        auditDate: defaultTimeStr,
      },
    };

    onSavePatient(newRecord);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto no-print">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Penerimaan & Pengkajian Triase Gawat Darurat (RM-01)
              </h2>
              <p className="text-xs text-slate-500">
                Unit Numbering System (UNS) & Format Standar Akreditasi Kemenkes
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

        {/* Preset quick buttons for rapid presentation demo */}
        <div className="px-6 py-2.5 bg-rose-50/70 border-b border-rose-100 flex items-center justify-between flex-wrap gap-2 text-xs">
          <span className="font-semibold text-rose-900 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-rose-600" />
            Demo Sidang (Pilih Skenario Pasien Cepat):
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              type="button"
              onClick={() => handleLoadPreset('STEMI')}
              className="px-2.5 py-1 rounded bg-white text-rose-700 border border-rose-200 hover:bg-rose-100 font-medium transition-colors text-xs"
            >
              Kasus P1: STEMI Jantung
            </button>
            <button
              type="button"
              onClick={() => handleLoadPreset('ASTHMA')}
              className="px-2.5 py-1 rounded bg-white text-blue-700 border border-blue-200 hover:bg-blue-100 font-medium transition-colors text-xs"
            >
              Kasus P1: Status Asmatikus
            </button>
            <button
              type="button"
              onClick={() => handleLoadPreset('TRAUMA_KLL')}
              className="px-2.5 py-1 rounded bg-white text-amber-700 border border-amber-200 hover:bg-amber-100 font-medium transition-colors text-xs"
            >
              Kasus P2: Fraktur KLL
            </button>
            <button
              type="button"
              onClick={() => handleLoadPreset('DISPEPSIA')}
              className="px-2.5 py-1 rounded bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-100 font-medium transition-colors text-xs"
            >
              Kasus P3: Dispepsia Akut
            </button>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* SECTION 1: Identitas & Penomoran Rekam Medis (UNS) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <span>01. Identitas Pasien & Penomoran Rekam Medis (UNS)</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-500">Unit Numbering System</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor Rekam Medis (No. RM) *
                </label>
                <input
                  type="text"
                  value={mrn}
                  onChange={(e) => setMrn(e.target.value)}
                  className="w-full text-xs font-mono font-bold bg-slate-100 border border-slate-300 rounded-lg p-2 text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor Induk Kependudukan (NIK) *
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  className="w-full text-xs font-mono border border-slate-300 rounded-lg p-2 text-slate-900"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Lengkap Pasien *
                </label>
                <input
                  type="text"
                  value={fullName}
                  placeholder="Contoh: Tn. Bambang Sugianto"
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs font-semibold border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-rose-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jenis Kelamin
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'L' | 'P')}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 text-slate-900"
                >
                  <option value="L">Laki-laki (L)</option>
                  <option value="P">Perempuan (P)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Usia (Tahun)
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 text-slate-900 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cara Masuk / Transportasi
                </label>
                <select
                  value={arrivalMethod}
                  onChange={(e) => setArrivalMethod(e.target.value as any)}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 text-slate-900"
                >
                  <option value="Datang Sendiri">Datang Sendiri</option>
                  <option value="Ambulans 118">Ambulans 118</option>
                  <option value="Rujukan Puskesmas">Rujukan Puskesmas</option>
                  <option value="Rujukan RS Lain">Rujukan RS Lain</option>
                  <option value="Polisi / KLL">Polisi / KLL (Laka Lantas)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Jenis Penjamin / Asuransi
                </label>
                <select
                  value={insuranceType}
                  onChange={(e) => setInsuranceType(e.target.value as any)}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 text-slate-900"
                >
                  <option value="BPJS Kesehatan (Non-PBI)">BPJS Kesehatan (Non-PBI)</option>
                  <option value="BPJS Kesehatan (PBI)">BPJS Kesehatan (PBI)</option>
                  <option value="Asuransi Swasta">Asuransi Swasta</option>
                  <option value="Jasa Raharja">Jasa Raharja (KLL)</option>
                  <option value="Umum / Tunai">Umum / Tunai</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: Pengkajian ABCD & Penetapan Triase */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <span>02. Pengkajian Triase Klinis (ABCD & Prioritas ESI/ATS)</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-500">Emergency Severity Index</span>
            </div>

            {/* Category selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Penetapan Kategori Triase:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setCategory('P1')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    category === 'P1'
                      ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-500 text-rose-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center justify-between">
                    <span>P1 · RESUSITASI</span>
                    <span className="w-2 h-2 rounded-full bg-rose-600" />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Respon segera (0 menit)</p>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('P2')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    category === 'P2'
                      ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-500 text-amber-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center justify-between">
                    <span>P2 · EMERGENSI</span>
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Respon &lt; 15 menit</p>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('P3')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    category === 'P3'
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500 text-emerald-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center justify-between">
                    <span>P3 · NON-EMERGENSI</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">Respon &lt; 60 menit</p>
                </button>

                <button
                  type="button"
                  onClick={() => setCategory('P0')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    category === 'P0'
                      ? 'bg-slate-900 border-slate-900 ring-2 ring-slate-900 text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center justify-between">
                    <span>P0 · DOA</span>
                    <span className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Death on Arrival</p>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Airway (Jalan Nafas)
                </label>
                <select
                  value={airway}
                  onChange={(e) => setAirway(e.target.value as any)}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2"
                >
                  <option value="Paten">Paten</option>
                  <option value="Sumbatan Parsial (Gargling/Stridor)">Sumbatan Parsial (Stridor/Gargling)</option>
                  <option value="Sumbatan Total">Sumbatan Total</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Breathing (Pernafasan)
                </label>
                <select
                  value={breathing}
                  onChange={(e) => setBreathing(e.target.value as any)}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2"
                >
                  <option value="Normal">Normal</option>
                  <option value="Takipnea (>28x/m)">Takipnea (&gt;28x/m)</option>
                  <option value="Bradipnea (<12x/m)">Bradipnea (&lt;12x/m)</option>
                  <option value="Wheezing Berat">Wheezing Berat / Mengi</option>
                  <option value="Apnea / Gasping">Apnea / Gasping</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Circulation (Sirkulasi)
                </label>
                <select
                  value={circulation}
                  onChange={(e) => setCirculation(e.target.value as any)}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2"
                >
                  <option value="Nadi Kuat & Teratur">Nadi Kuat & Teratur</option>
                  <option value="Nadi Cepat & Lemah">Nadi Cepat & Lemah</option>
                  <option value="Akral Dingin & Pucat / Sianosis">Akral Dingin / Sianosis</option>
                  <option value="Nadi Tidak Teraba">Nadi Tidak Teraba</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Disability (Kesadaran AVPU)
                </label>
                <select
                  value={disability}
                  onChange={(e) => setDisability(e.target.value as any)}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2"
                >
                  <option value="Alert (Sadar Penuh)">Alert (Sadar Penuh)</option>
                  <option value="Voice (Respon Suara)">Voice (Respon Suara)</option>
                  <option value="Pain (Respon Nyeri)">Pain (Respon Nyeri)</option>
                  <option value="Unresponsive (Koma)">Unresponsive (Koma)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Keluhan Utama & Rationale Triase
              </label>
              <textarea
                rows={2}
                value={categoryRationale}
                onChange={(e) => setCategoryRationale(e.target.value)}
                placeholder="Deskripsikan keluhan utama, mekanisme cedera, dan alasan penentuan kategori triase..."
                className="w-full text-xs border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-rose-500"
              />
            </div>
          </div>

          {/* SECTION 3: Kalkulator GCS & Tanda-Tanda Vital */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-indigo-600" />
                <span>03. Kalkulator GCS & Tanda Vital Terstruktur</span>
              </h3>
              <span className="text-[11px] font-mono text-indigo-700 font-bold">
                Skor GCS Total: {gcsTotal} / 15
              </span>
            </div>

            {/* GCS component selector */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
              <div>
                <label className="block text-[11px] font-semibold text-indigo-950 mb-1">
                  Eye Opening (E: {gcsEye})
                </label>
                <select
                  value={gcsEye}
                  onChange={(e) => setGcsEye(Number(e.target.value))}
                  className="w-full text-xs border border-indigo-200 rounded-lg p-2 bg-white"
                >
                  <option value={4}>4 - Spontan</option>
                  <option value={3}>3 - Terhadap Suara</option>
                  <option value={2}>2 - Terhadap Nyeri</option>
                  <option value={1}>1 - Tidak ada respon</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-indigo-950 mb-1">
                  Verbal Response (V: {gcsVerbal})
                </label>
                <select
                  value={gcsVerbal}
                  onChange={(e) => setGcsVerbal(Number(e.target.value))}
                  className="w-full text-xs border border-indigo-200 rounded-lg p-2 bg-white"
                >
                  <option value={5}>5 - Orientasi Baik</option>
                  <option value={4}>4 - Bingung (Confused)</option>
                  <option value={3}>3 - Kata-kata tidak tepat</option>
                  <option value={2}>2 - Mengerang / Suara tanpa arti</option>
                  <option value={1}>1 - Tidak ada respon suara</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-indigo-950 mb-1">
                  Motor Response (M: {gcsMotor})
                </label>
                <select
                  value={gcsMotor}
                  onChange={(e) => setGcsMotor(Number(e.target.value))}
                  className="w-full text-xs border border-indigo-200 rounded-lg p-2 bg-white"
                >
                  <option value={6}>6 - Mengikuti Perintah</option>
                  <option value={5}>5 - Melokalisir Nyeri</option>
                  <option value={4}>4 - Menghindar Nyeri (Fleksi normal)</option>
                  <option value={3}>3 - Fleksi Abnormal (Dekortikasi)</option>
                  <option value={2}>2 - Ekstensi Abnormal (Deserebrasi)</option>
                  <option value={1}>1 - Tidak ada respon (Flaksid)</option>
                </select>
              </div>
            </div>

            {/* Vital signs inputs */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  TD Sistolik
                </label>
                <input
                  type="number"
                  value={systolic}
                  onChange={(e) => setSystolic(Number(e.target.value))}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  TD Diastolik
                </label>
                <input
                  type="number"
                  value={diastolic}
                  onChange={(e) => setDiastolic(Number(e.target.value))}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Nadi (bpm)
                </label>
                <input
                  type="number"
                  value={heartRate}
                  onChange={(e) => setHeartRate(Number(e.target.value))}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  RR (x/m)
                </label>
                <input
                  type="number"
                  value={respiratoryRate}
                  onChange={(e) => setRespiratoryRate(Number(e.target.value))}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  SpO2 (%)
                </label>
                <input
                  type="number"
                  value={oxygenSaturation}
                  onChange={(e) => setOxygenSaturation(Number(e.target.value))}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Skala Nyeri (0-10)
                </label>
                <input
                  type="number"
                  min={0}
                  max={10}
                  value={painScale}
                  onChange={(e) => setPainScale(Number(e.target.value))}
                  className="w-full text-xs border border-slate-300 rounded-lg p-2 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              * Formulir akan menginisiasi berkas RME-IGD dan masuk ke antrian verifikasi DPJP
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>

              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Rekam Medis Triase</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
