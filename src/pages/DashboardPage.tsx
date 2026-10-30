import React from 'react';
import { Link } from 'react-router-dom';
import {
  Wrench,
  Clock,
  MapPin,
  Car,
  Bike,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Navigation,
  Camera,
  Wallet,
  Sparkles,
  PhoneCall,
  ArrowUpRight
} from 'lucide-react';
import { useSpecialist } from '../store/SpecialistContext';

export const DashboardPage: React.FC = () => {
  const { specialist, jobs, walletBalance, acceptJob, rejectJob, startNavigation } = useSpecialist();

  const assignedJobs = jobs.filter((j) => j.status === 'assigned');
  const activeJobs = jobs.filter((j) => ['accepted', 'en_route', 'arrived', 'inspecting'].includes(j.status));
  const submittedJobs = jobs.filter((j) => j.status === 'submitted');

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Specialist Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your daily inspections, dispatch route, and earnings escrow.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-donezo-greenLight dark:bg-emerald-950/40 text-donezo-green dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            Certified Specialist Fleet
          </span>
        </div>
      </div>

      {/* Donezo Style KPI Earnings & Status Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1: Available Balance (Signature Donezo Forest Green) */}
        <div className="rounded-3xl p-6 bg-donezo-green text-white shadow-donezo flex flex-col justify-between h-44 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-100 flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5" /> Available Balance
            </span>
            <Link
              to="/specialist/wallet"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-transform group-hover:scale-110"
              title="Withdraw to bank"
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              ₹{walletBalance.available.toLocaleString()}
            </div>
          </div>

          <div>
            <Link
              to="/specialist/wallet"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-[11px] font-medium text-emerald-100 hover:bg-white/25 transition-colors"
            >
              <span>Withdraw to Bank →</span>
            </Link>
          </div>
        </div>

        {/* Card 2: 48h Escrow Pending (Crisp White Card) */}
        <div className="rounded-3xl p-6 bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder shadow-donezo flex flex-col justify-between h-44 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" /> Pending (48h Timer)
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center border border-donezo-lightBorder dark:border-donezo-darkBorder">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              ₹{walletBalance.pending.toLocaleString()}
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[11px] font-semibold text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
              <span>{submittedJobs.length} in quality hold</span>
            </span>
          </div>
        </div>

        {/* Card 3: Lifetime Rating (Crisp White Card) */}
        <div className="rounded-3xl p-6 bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder shadow-donezo flex flex-col justify-between h-44 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Lifetime Rating</span>
            <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center border border-donezo-lightBorder dark:border-donezo-darkBorder">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-tight flex items-center gap-1">
              ⭐ {specialist.rating}
            </div>
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-donezo-greenLight dark:bg-emerald-950/40 text-[11px] font-semibold text-donezo-green dark:text-emerald-300">
              <span>{specialist.completedJobsCount} Inspections Verified</span>
            </span>
          </div>
        </div>
      </div>

      {/* Urgent Assigned Job Offers (Requires immediate acceptance/rejection) */}
      {assignedJobs.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              New Assigned Jobs Awaiting Acceptance ({assignedJobs.length})
            </div>
            <span className="text-[11px] text-slate-400">Response Window Active</span>
          </div>

          {assignedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-donezo-darkCard border-2 border-amber-400/80 rounded-3xl p-6 space-y-4 shadow-donezo"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 px-2.5 py-0.5 rounded-full">
                      {job.id}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">Ref: {job.bookingRef}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1.5">
                    {job.vehicle.make} {job.vehicle.model} ({job.vehicle.variant})
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {job.vehicle.year} · {job.vehicle.fuel} · {job.vehicle.transmission}
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-xs text-slate-400 uppercase font-bold">Specialist Payout</div>
                  <div className="text-2xl font-black text-donezo-green dark:text-emerald-400 font-mono">₹{job.payoutAmount}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-[#0E1318] p-4 rounded-2xl border border-donezo-lightBorder dark:border-donezo-darkBorder">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-donezo-green dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">Inspection Address:</span>
                    <div className="text-slate-800 dark:text-slate-200 font-medium">{job.location.address}, {job.location.area}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 font-bold uppercase text-[10px] block">Scheduled Window:</span>
                    <div className="text-slate-800 dark:text-slate-200 font-bold">{job.appointment.date} · {job.appointment.window}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => rejectJob(job.id, 'Schedule conflict')}
                  className="py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full font-bold text-xs transition-colors border border-donezo-lightBorder dark:border-donezo-darkBorder"
                >
                  Decline Job
                </button>
                <button
                  type="button"
                  onClick={() => acceptJob(job.id)}
                  className="py-2.5 px-4 bg-donezo-green hover:bg-donezo-greenHover text-white rounded-full font-bold text-xs transition-all shadow-sm"
                >
                  Accept Assignment (₹{job.payoutAmount})
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Active Today's Jobs */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Active Jobs in Progress ({activeJobs.length})
        </h3>

        {activeJobs.length === 0 ? (
          <div className="bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-3xl p-8 text-center text-slate-400 text-xs shadow-donezo">
            No active jobs in transit or on-site. Accept an assigned job above to begin.
          </div>
        ) : (
          activeJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-3xl p-6 space-y-4 shadow-donezo hover:shadow-donezo-hover transition-all"
            >
              <div className="flex items-start justify-between gap-3 border-b border-donezo-lightBorder dark:border-donezo-darkBorder pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-donezo-green dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      {job.id}
                    </span>
                    <span className="text-xs uppercase font-bold text-emerald-600 dark:text-emerald-400">
                      ● Status: {job.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">
                    {job.vehicle.make} {job.vehicle.model}
                  </h4>
                </div>

                <div className="text-right">
                  <div className="text-xs text-slate-400">Payout</div>
                  <div className="text-lg font-bold text-donezo-green dark:text-emerald-400 font-mono">₹{job.payoutAmount}</div>
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.location.address}, {job.location.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Slot: {job.appointment.window}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 pt-1">
                  <span>Seller: <strong className="text-slate-800 dark:text-slate-200">{job.location.sellerName}</strong> ({job.location.sellerPhone})</span>
                </div>
              </div>

              {/* Action Buttons depending on status */}
              <div className="pt-2 flex flex-wrap gap-2">
                {job.status === 'accepted' && (
                  <button
                    type="button"
                    onClick={() => startNavigation(job.id)}
                    className="flex-1 py-2.5 px-5 bg-donezo-green hover:bg-donezo-greenHover text-white rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <Navigation className="w-4 h-4" /> Start Route Navigation
                  </button>
                )}

                {job.status === 'en_route' && (
                  <Link to={`/specialist/jobs/${job.id}/checkin`} className="flex-1">
                    <button
                      type="button"
                      className="w-full py-2.5 px-5 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <Camera className="w-4 h-4" /> Arrived at Vehicle: Capture Visit Proof
                    </button>
                  </Link>
                )}

                {(job.status === 'arrived' || job.status === 'inspecting') && (
                  <Link to={`/specialist/jobs/${job.id}/inspect`} className="flex-1">
                    <button
                      type="button"
                      className="w-full py-2.5 px-5 bg-donezo-green hover:bg-donezo-greenHover text-white rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <Wrench className="w-4 h-4" /> Open Inspection Checklist (200+ Pts)
                    </button>
                  </Link>
                )}

                <Link to={`/specialist/jobs/${job.id}`}>
                  <button
                    type="button"
                    className="py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full font-bold text-xs border border-donezo-lightBorder dark:border-donezo-darkBorder transition-colors"
                  >
                    Job Details
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Submitted Reports with 48h Countdown Timer */}
      {submittedJobs.length > 0 && (
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Submitted Reports (48-Hour Payout Timer Active)
          </h3>

          {submittedJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-3xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs shadow-donezo"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{job.vehicle.make} {job.vehicle.model}</span>
                  <span className="bg-emerald-50 dark:bg-emerald-950/40 text-donezo-green dark:text-emerald-400 font-mono px-2.5 py-0.5 rounded-full text-[10px] border border-emerald-200 dark:border-emerald-800 font-bold">
                    Health Score: {job.reportHealthScore}/100
                  </span>
                </div>
                <div className="text-slate-500 dark:text-slate-400">
                  Delivered on {new Date(job.reportSubmittedAt || '').toLocaleDateString()} · Immutable v{job.reportVersion}.0
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-donezo-green dark:text-emerald-400 font-bold text-sm font-mono">₹{job.payoutAmount}</div>
                  <div className="text-[10px] text-amber-600 dark:text-amber-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3" /> Releases in ~34 Hours
                  </div>
                </div>
                <Link to="/specialist/wallet">
                  <button className="py-2 px-3.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full text-xs font-bold border border-donezo-lightBorder dark:border-donezo-darkBorder transition-colors">
                    View Ledger
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
