import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  FileCheck,
  Clock,
  Wallet,
  Sparkles,
  Lock,
  Wrench
} from 'lucide-react';
import { useSpecialist } from '../store/SpecialistContext';

export const ReportSubmitPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJobById, submitInspectionReport } = useSpecialist();

  const job = getJobById(id || '');

  const [partsMin, setPartsMin] = useState(8500);
  const [partsMax, setPartsMax] = useState(12000);
  const [laborMin, setLaborMin] = useState(2500);
  const [laborMax] = useState(4000);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!job) {
    return <div className="text-center py-20 text-slate-900 dark:text-white">Job Record Not Found</div>;
  }

  // Calculate score preview
  const totalItems = job.checklist.length;
  const goodCount = job.checklist.filter((i) => i.grade === 'good').length;
  const avgCount = job.checklist.filter((i) => i.grade === 'average').length;
  const poorCount = job.checklist.filter((i) => i.grade === 'poor' || i.grade === 'critical').length;
  const notInspectedCount = job.checklist.filter((i) => i.grade === 'not_inspected').length;

  let score = Math.round(((goodCount * 1.0 + avgCount * 0.7) / totalItems) * 100);
  if (poorCount > 0) score = Math.max(40, score - poorCount * 8);

  const recommendation =
    score >= 85
      ? 'Strong Buy'
      : score >= 70
      ? 'Fair Deal with Minor Repairs'
      : score >= 55
      ? 'Negotiate Heavily'
      : 'Walk Away / High Risk';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      submitInspectionReport(job.id);
      setIsSubmitting(false);
      setSubmittedSuccess(true);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-16">
      <div className="flex items-center justify-between">
        <Link to={`/specialist/jobs/${job.id}/inspect`} className="text-xs font-bold text-donezo-green dark:text-emerald-400 hover:underline flex items-center gap-1.5">
          <ArrowLeft className="w-4 h-4" /> Back to Checklist
        </Link>
        <span className="font-mono text-xs text-slate-400">Final Verification</span>
      </div>

      <div className="bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-3xl p-6 sm:p-8 space-y-6 shadow-donezo">
        {submittedSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-donezo-green dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                IMMUTABLE REPORT VERSION 1.0 LOCKED
              </span>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white pt-2">
                Report Published & Delivered!
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                The inspection report has been delivered directly to the customer portal. The <strong>48-Hour Payout Timer</strong> has started.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-[#0E1318] p-4 rounded-2xl border border-donezo-lightBorder dark:border-donezo-darkBorder max-w-sm mx-auto text-xs text-slate-700 dark:text-slate-300 space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-slate-400">Specialist Earnings:</span>
                <strong className="text-donezo-green dark:text-emerald-400 font-bold text-sm">₹{job.payoutAmount}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payout Release Deadline:</span>
                <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">In Exactly 48 Hours</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <Link to="/specialist/wallet">
                <button className="py-2.5 px-5 bg-donezo-green hover:bg-donezo-greenHover text-white rounded-full font-bold text-xs shadow-sm transition-all">
                  View Wallet & Timer
                </button>
              </Link>
              <Link to="/specialist/dashboard">
                <button className="py-2.5 px-5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full font-bold text-xs border border-donezo-lightBorder dark:border-donezo-darkBorder transition-colors">
                  Dashboard
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b border-donezo-lightBorder dark:border-donezo-darkBorder pb-4 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-donezo-greenLight dark:bg-emerald-950/40 text-donezo-green dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-3 py-1 rounded-full">
                Report Pre-Submission Review
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
                {job.vehicle.make} {job.vehicle.model} ({job.vehicle.variant})
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Review automated health scoring, repair estimates, and immutable report snapshot.
              </p>
            </div>

            {/* Health Score Computation Preview */}
            <div className="bg-slate-50 dark:bg-[#0E1318] p-5 rounded-2xl border border-donezo-lightBorder dark:border-donezo-darkBorder flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Computed Health Score</span>
                <div className="text-3xl font-extrabold text-donezo-green dark:text-emerald-400 mt-0.5">{score} <span className="text-sm text-slate-400 font-normal">/ 100</span></div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">{recommendation}</div>
              </div>

              {/* Point Statistics */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-right">
                <span className="bg-white dark:bg-donezo-darkCard px-2.5 py-1 rounded-full text-emerald-600 dark:text-emerald-400 font-bold border border-donezo-lightBorder dark:border-donezo-darkBorder">{goodCount} Good</span>
                <span className="bg-white dark:bg-donezo-darkCard px-2.5 py-1 rounded-full text-amber-600 dark:text-amber-400 font-bold border border-donezo-lightBorder dark:border-donezo-darkBorder">{avgCount} Average</span>
                <span className="bg-white dark:bg-donezo-darkCard px-2.5 py-1 rounded-full text-rose-600 dark:text-rose-400 font-bold border border-donezo-lightBorder dark:border-donezo-darkBorder">{poorCount} Attention</span>
                <span className="bg-white dark:bg-donezo-darkCard px-2.5 py-1 rounded-full text-slate-400 font-bold border border-donezo-lightBorder dark:border-donezo-darkBorder">{notInspectedCount} N/I</span>
              </div>
            </div>

            {/* Indicative Repair Cost Builder */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-donezo-green dark:text-emerald-400" /> Indicative Repair Estimates (for Buyer Negotiation)
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-500 mb-1 font-bold">Parts Estimate Min (₹)</label>
                  <input
                    type="number"
                    value={partsMin}
                    onChange={(e) => setPartsMin(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none focus:border-donezo-green"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 mb-1 font-bold">Parts Estimate Max (₹)</label>
                  <input
                    type="number"
                    value={partsMax}
                    onChange={(e) => setPartsMax(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-xl text-slate-900 dark:text-white font-mono focus:outline-none focus:border-donezo-green"
                  />
                </div>
              </div>

              <p className="text-[11px] text-slate-400 italic">
                Indicative market ranges for identified front brake pads and thermostat housing repair.
              </p>
            </div>

            {/* 48-Hour Payout Rules Notice */}
            <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 p-4 rounded-2xl space-y-1.5 text-xs text-emerald-900 dark:text-emerald-200">
              <div className="font-bold flex items-center gap-1.5 text-donezo-green dark:text-emerald-300">
                <Clock className="w-4 h-4 text-donezo-green dark:text-emerald-400" /> Platform Payout Rule (48-Hour Timer)
              </div>
              <p className="leading-relaxed text-[11px] text-emerald-800 dark:text-emerald-300/90">
                Upon submitting this report:
                <br />1. The report is locked as <strong>Version 1.0 (Immutable)</strong> and delivered immediately to customer.
                <br />2. Your payout of <strong>₹{job.payoutAmount}</strong> is credited to your wallet in <em>Pending</em> status.
                <br />3. After 48 hours, eligible earnings automatically release to your withdrawable balance if no qualifying quality flag is raised.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-donezo-green hover:bg-donezo-greenHover text-white font-bold text-sm rounded-full flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-60"
            >
              <Lock className="w-4 h-4 stroke-[2.5]" />
              {isSubmitting ? 'Locking Version & Submitting...' : `Submit & Deliver Report (Earn ₹${job.payoutAmount})`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
