import React from 'react';
import { User, ShieldCheck, Award, Wrench, MapPin, Building, CreditCard, CheckCircle2, ChevronRight, LogOut, Phone, Mail, FileText, BatteryCharging, ExternalLink } from 'lucide-react';
import { useSpecialist } from '../store/SpecialistContext';
import { useNavigate } from 'react-router-dom';

export const SpecialistProfilePage: React.FC = () => {
  const { specialist } = useSpecialist();
  const navigate = useNavigate();

  const certifications = [
    {
      title: 'ASDC Master Vehicle Diagnostic Technician',
      issuer: 'Automotive Skills Development Council of India',
      validity: 'Lifetime (Credential ID: ASDC-MDT-8821)',
      verified: true,
    },
    {
      title: 'Bosch Automotive Electronics & OBD-II Diagnostics',
      issuer: 'Robert Bosch Engineering Institute',
      validity: 'Valid till Nov 2028',
      verified: true,
    },
    {
      title: 'ARAI High-Voltage EV Safety & Battery Health (Level 3)',
      issuer: 'Automotive Research Association of India',
      validity: 'Valid till Aug 2027',
      verified: true,
    },
  ];

  const tools = [
    { name: 'Launch X431 V+ OBD-II Scanner', category: 'ECU Diagnostics', serial: 'SN-99824-OBD', status: 'Calibrated' },
    { name: 'Elcometer 456 Digital Paint Depth Meter', category: 'Bodywork Inspection', serial: 'ELC-456-781', status: 'Calibrated (±1µm)' },
    { name: 'Brake Fluid Boiling Point Tester', category: 'Safety & Hydraulics', serial: 'BF-TEST-301', status: 'Verified' },
    { name: 'Digital Tread Depth & Pressure Transducer', category: 'Tyres & Suspension', serial: 'TT-GAUGE-99', status: 'Calibrated' },
    { name: '1000V Insulated Safety Gloves & CAT-III Multimeter', category: 'EV Diagnostics', serial: 'EV-SAFE-012', status: 'Active' },
  ];

  const handleLogout = () => {
    navigate('/specialist/login');
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-3xl p-6 sm:p-8 shadow-donezo">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-20 h-20 rounded-3xl bg-donezo-green text-white flex items-center justify-center text-2xl font-bold shadow-sm">
            {specialist.name.split(' ').map((n) => n[0]).join('')}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{specialist.name}</h1>
              <span className="bg-donezo-greenLight dark:bg-emerald-950/40 text-donezo-green dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs px-3 py-0.5 rounded-full font-bold">
                {specialist.badge}
              </span>
              <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-xs px-3 py-0.5 rounded-full font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Specialist
              </span>
            </div>

            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
              Senior Field Diagnostic Specialist • 8+ Years Commercial Experience
            </p>

            <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-3 text-xs text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-donezo-green dark:text-emerald-400" /> {specialist.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-donezo-green dark:text-emerald-400" /> {specialist.email}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-donezo-green dark:text-emerald-400" /> Bengaluru South & East Cluster
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 border border-donezo-lightBorder dark:border-donezo-darkBorder text-slate-700 dark:text-slate-300 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* KYC & Identity Verification */}
      <div className="bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-3xl p-6 shadow-donezo">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> KYC & Background Verification
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-2xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Government ID (Aadhaar)</div>
              <div className="text-xs text-slate-400 mt-0.5">UIDAI Verified • •••• 4910</div>
              <span className="inline-block mt-2 text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">
                Cleared
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-2xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Police Clearance Record</div>
              <div className="text-xs text-slate-400 mt-0.5">Karnataka State Police Verified</div>
              <span className="inline-block mt-2 text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">
                Valid till Oct 2027
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-2xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Driving License (Commercial)</div>
              <div className="text-xs text-slate-400 mt-0.5">LMV / Trans • DL-04-201100294</div>
              <span className="inline-block mt-2 text-[10px] uppercase font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">
                Valid till 2031
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Certifications */}
      <div className="bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-3xl p-6 shadow-donezo">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-donezo-green dark:text-emerald-400" /> Diagnostic Certifications & Skills
        </h2>

        <div className="space-y-3">
          {certifications.map((c, idx) => (
            <div key={idx} className="p-4 bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-2xl flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-sm">{c.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{c.issuer}</div>
                <div className="text-[11px] text-donezo-green dark:text-emerald-400 font-mono mt-1">{c.validity}</div>
              </div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full flex items-center gap-1 shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" /> Active
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Tool Kit & Equipment Checklist */}
      <div className="bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-3xl p-6 shadow-donezo">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-amber-500" /> Field Diagnostic Tool Inventory
          </h2>
          <span className="text-xs text-slate-400 font-medium">Mandatory hardware kit for field dispatch</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tools.map((t, idx) => (
            <div key={idx} className="p-3.5 bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-2xl flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{t.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{t.category} • {t.serial}</div>
              </div>
              <span className="text-[11px] font-bold text-donezo-green dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full shrink-0">
                {t.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Verified Bank Account for IMPS Payouts */}
      <div className="bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-3xl p-6 shadow-donezo">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-purple-600 dark:text-purple-400" /> Verified Bank Account for Direct Payouts
        </h2>

        <div className="bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white text-base">{specialist.bankDetails.bankName}</span>
              <span className="text-[10px] font-bold uppercase bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full">
                Penny-Drop Verified
              </span>
            </div>
            <div className="text-sm text-slate-700 dark:text-slate-300 font-mono mt-1">
              Account No: {specialist.bankDetails.accountNumberMasked}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              IFSC: {specialist.bankDetails.ifsc} • Beneficiary: {specialist.bankDetails.accountHolder}
            </div>
          </div>

          <div className="text-xs text-slate-400 max-w-xs sm:text-right">
            Payouts released instantly via 24x7 IMPS upon expiration of the 48-hour customer review window.
          </div>
        </div>
      </div>
    </div>
  );
};
