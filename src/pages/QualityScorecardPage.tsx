import React from 'react';
import { Award, Star, Clock, AlertTriangle, ShieldCheck, CheckCircle2, ThumbsUp, TrendingUp, Sparkles, MessageSquare } from 'lucide-react';
import { useSpecialist } from '../store/SpecialistContext';

export const QualityScorecardPage: React.FC = () => {
  const { specialist } = useSpecialist();

  const metrics = [
    {
      title: 'Customer Satisfaction',
      value: `${specialist.rating} / 5.0`,
      target: 'Min 4.60',
      status: 'Elite',
      statusColor: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
      icon: <Star className="w-5 h-5 text-amber-500 fill-amber-500" />,
      detail: 'Based on 482 verified customer ratings',
    },
    {
      title: 'Punctuality & Arrival',
      value: '98.4%',
      target: 'Min 95%',
      status: 'Target Met',
      statusColor: 'text-donezo-green dark:text-emerald-300 bg-donezo-greenLight dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
      icon: <Clock className="w-5 h-5 text-donezo-green dark:text-emerald-400" />,
      detail: 'Arrived within booking window for 474/482 jobs',
    },
    {
      title: 'Defect Accuracy Rate',
      value: '99.1%',
      target: 'Min 97%',
      status: 'Exceptional',
      statusColor: 'text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800',
      icon: <ShieldCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      detail: 'Zero missed structural chassis or flood markers',
    },
    {
      title: 'Dispute / Flag Rate',
      value: '0.21%',
      target: 'Max 1.5%',
      status: 'Safe',
      statusColor: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800',
      icon: <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      detail: 'Only 1 customer revision request in last 90 days',
    },
  ];

  const recentReviews = [
    {
      id: 'rev-1',
      customer: 'Arunachalam M.',
      vehicle: '2021 Hyundai Creta 1.5 Turbo Petrol',
      date: 'Yesterday, 04:30 PM',
      rating: 5,
      comment:
        'Rajesh sir did an incredible job. He caught the non-OEM repainting on the left passenger door and showed me the micron paint readings on his digital gauge! Saved me from overpaying ₹45,000.',
    },
    {
      id: 'rev-2',
      customer: 'Pooja Hegde',
      vehicle: '2023 Tata Nexon EV LR',
      date: '12 Oct 2026',
      rating: 5,
      comment:
        'Very punctual and professional. The OBD scan revealed an intermittent sensor error which the used car dealer agreed to replace before delivery. Best ₹1,999 investment!',
    },
    {
      id: 'rev-3',
      customer: 'Karthik S.',
      vehicle: '2019 Honda City ZX CVT',
      date: '08 Oct 2026',
      rating: 5,
      comment:
        'Thorough suspension test on bumpy roads and clear brake pad thickness measurements with caliper photos. Report delivered in 15 minutes right after inspection.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Tier & Performance Header (Donezo Forest Green Banner) */}
      <div className="bg-donezo-green text-white rounded-3xl p-6 sm:p-8 shadow-donezo relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Award className="w-48 h-48 text-white" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Tier 1 Master Specialist
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Quality & Performance Scorecard
            </h1>
            <p className="text-emerald-100 text-sm mt-1 max-w-xl">
              Evaluated weekly across 200+ diagnostic standards, on-time GPS check-ins, and verified customer ratings.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl text-center min-w-[140px] shadow-sm">
            <div className="text-xs uppercase tracking-wider text-emerald-200 font-bold mb-1">Payout Multiplier</div>
            <div className="text-2xl font-black text-white">+10% Bonus</div>
            <div className="text-[11px] text-emerald-200 mt-0.5">Tier 1 Incentive Active</div>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-3xl p-5 shadow-donezo flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-donezo-lightBorder dark:border-donezo-darkBorder">{m.icon}</div>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${m.statusColor}`}>
                  {m.status}
                </span>
              </div>
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{m.title}</div>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">{m.value}</div>
            </div>
            <div className="mt-4 pt-3 border-t border-donezo-lightBorder dark:border-donezo-darkBorder text-[11px] flex justify-between text-slate-500 dark:text-slate-400">
              <span>{m.detail}</span>
              <span className="font-bold text-slate-700 dark:text-slate-300">{m.target}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quality Standards & Protocol Compliance */}
      <div className="bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-3xl p-6 shadow-donezo">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-donezo-green dark:text-emerald-400" /> Platform Compliance & Diagnostic Protocols
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-2xl">
            <div className="text-emerald-700 dark:text-emerald-400 font-bold text-sm flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-4 h-4" /> 100% OBD-II Scan Compliance
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Every car inspection includes full DTC electronic diagnostics and freeze-frame logs.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-2xl">
            <div className="text-emerald-700 dark:text-emerald-400 font-bold text-sm flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-4 h-4" /> 3-Point Visit Evidence
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Mandatory geotagged specialist selfie, number plate, and odometer photo captured on arrival.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-2xl">
            <div className="text-emerald-700 dark:text-emerald-400 font-bold text-sm flex items-center gap-1.5 mb-1">
              <CheckCircle2 className="w-4 h-4" /> Fast Report Turnaround
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Average delivery time of 22 minutes post-inspection (platform threshold: max 60 minutes).
            </p>
          </div>
        </div>
      </div>

      {/* Verified Customer Feedback */}
      <div className="bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-3xl p-6 shadow-donezo">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-500" /> Verified Customer Reviews
          </h2>
          <span className="text-xs text-slate-400">Showing last 3 reviews</span>
        </div>

        <div className="space-y-3">
          {recentReviews.map((rev) => (
            <div key={rev.id} className="p-4 bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{rev.customer}</span>
                  <span className="text-xs text-donezo-green dark:text-emerald-400 font-medium">({rev.vehicle})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed italic">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
