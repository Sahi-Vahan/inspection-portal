import React, { useState } from 'react';
import {
  Wallet,
  Clock,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  CheckCircle2,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { useSpecialist } from '../store/SpecialistContext';

export const WalletPage: React.FC = () => {
  const { specialist, walletBalance, transactions, jobs, requestWithdrawal } = useSpecialist();

  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState<number>(walletBalance.available);
  const [withdrawResult, setWithdrawResult] = useState<{ success?: boolean; refId?: string; error?: string } | null>(null);

  const submittedWithTimers = jobs.filter((j) => j.status === 'submitted');

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const res = requestWithdrawal(withdrawAmount);
    setWithdrawResult(res);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-16">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Specialist Wallet & Payouts</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Immutable earnings ledger, 48-hour quality timers, and direct bank payouts.
        </p>
      </div>

      {/* Balance Cards (Donezo Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Available to Withdraw (Donezo Forest Green) */}
        <div className="rounded-3xl p-6 bg-donezo-green text-white shadow-donezo flex flex-col justify-between h-44 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-100 flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5" /> Available Balance
            </span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </div>

          <div className="text-3xl font-extrabold tracking-tight">
            ₹{walletBalance.available.toLocaleString()}
          </div>

          <div>
            <button
              type="button"
              onClick={() => {
                setWithdrawAmount(walletBalance.available);
                setWithdrawResult(null);
                setWithdrawModalOpen(true);
              }}
              disabled={walletBalance.available <= 0}
              className="w-full py-2 bg-white text-donezo-green hover:bg-emerald-50 disabled:opacity-50 rounded-full text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <ArrowUpRight className="w-3.5 h-3.5" /> Transfer to Bank (IMPS)
            </button>
          </div>
        </div>

        {/* Pending Payout Timer (Crisp White Card) */}
        <div className="rounded-3xl p-6 bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder shadow-donezo flex flex-col justify-between h-44 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" /> Pending (48h Hold)
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center border border-donezo-lightBorder dark:border-donezo-darkBorder">
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
          </div>

          <div className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">
            ₹{walletBalance.pending.toLocaleString()}
          </div>

          <p className="text-[11px] text-slate-400">
            Releases automatically once 48-hr timer expires.
          </p>
        </div>

        {/* Lifetime Withdrawn (Crisp White Card) */}
        <div className="rounded-3xl p-6 bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder shadow-donezo flex flex-col justify-between h-44 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Lifetime Payouts
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center border border-donezo-lightBorder dark:border-donezo-darkBorder">
              <ArrowDownLeft className="w-4 h-4 text-emerald-500" />
            </div>
          </div>

          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
            ₹{walletBalance.lifetimeWithdrawn.toLocaleString()}
          </div>

          <p className="text-[11px] text-slate-400">
            Transferred directly to verified HDFC account.
          </p>
        </div>

      </div>

      {/* Active 48-Hour Payout Timers Section */}
      <div className="bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-3xl p-6 space-y-4 shadow-donezo">
        <div className="flex items-center justify-between border-b border-donezo-lightBorder dark:border-donezo-darkBorder pb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">Active 48-Hour Quality Payout Timers</h3>
          </div>
          <span className="text-xs text-amber-700 dark:text-amber-400 font-mono font-bold bg-amber-50 dark:bg-amber-950/40 px-3 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
            {submittedWithTimers.length} Active
          </span>
        </div>

        {submittedWithTimers.length === 0 ? (
          <div className="text-center py-4 text-xs text-slate-400 italic">
            No pending quality timers. When you submit an inspection report, the 48-hour countdown appears here.
          </div>
        ) : (
          submittedWithTimers.map((job) => (
            <div
              key={job.id}
              className="bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="font-bold text-slate-900 dark:text-white text-sm">
                  {job.vehicle.make} {job.vehicle.model} ({job.vehicle.variant})
                </div>
                <div className="text-slate-400 font-mono text-[11px]">
                  Ref: {job.bookingRef} · Submitted: {new Date(job.reportSubmittedAt || '').toLocaleTimeString()}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-donezo-green dark:text-emerald-400 font-bold text-base font-mono">₹{job.payoutAmount}</div>
                  <div className="text-amber-600 dark:text-amber-400 font-mono font-bold text-[11px] flex items-center gap-1 justify-end">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                    ~34h 15m remaining
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Verified Bank Account Details */}
      <div className="bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-3xl p-6 space-y-3 shadow-donezo">
        <div className="flex items-center justify-between border-b border-donezo-lightBorder dark:border-donezo-darkBorder pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-donezo-green dark:text-emerald-400" /> Verified Settlement Bank Account (IMPS/NEFT)
          </div>
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
            KYC VERIFIED
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block font-bold text-[10px] uppercase">Bank Name:</span>
            <span className="font-bold text-slate-900 dark:text-white mt-1 block">{specialist.bankDetails.bankName}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-bold text-[10px] uppercase">Account Number:</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white mt-1 block">{specialist.bankDetails.accountNumberMasked}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-bold text-[10px] uppercase">IFSC Code:</span>
            <span className="font-mono font-bold text-donezo-green dark:text-emerald-400 mt-1 block">{specialist.bankDetails.ifsc}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-bold text-[10px] uppercase">Account Name:</span>
            <span className="font-bold text-slate-900 dark:text-white mt-1 block">{specialist.bankDetails.accountHolder}</span>
          </div>
        </div>
      </div>

      {/* Immutable Financial Ledger */}
      <div className="space-y-3">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wider">
          Immutable Wallet Ledger Transactions
        </h3>

        <div className="bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-3xl overflow-hidden divide-y divide-slate-100 dark:divide-donezo-darkBorder text-xs shadow-donezo">
          {transactions.map((txn) => (
            <div key={txn.id} className="p-4 flex items-center justify-between hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${
                    txn.type === 'withdrawal'
                      ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400'
                      : txn.type === 'release_available'
                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                      : 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400'
                  }`}
                >
                  {txn.type === 'withdrawal' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                </div>

                <div>
                  <div className="font-bold text-slate-900 dark:text-white">{txn.description}</div>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                    {txn.id} · {new Date(txn.timestamp).toLocaleDateString()} at {new Date(txn.timestamp).toLocaleTimeString()} · Ref: {txn.jobRef}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`font-bold font-mono text-sm ${
                    txn.amount > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {txn.amount > 0 ? `+₹${txn.amount}` : `-₹${Math.abs(txn.amount)}`}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">
                  Balance: ₹{txn.balanceAfter.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instant IMPS Withdrawal Modal */}
      {withdrawModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 text-xs shadow-2xl">
            <div className="flex items-center justify-between border-b border-donezo-lightBorder dark:border-donezo-darkBorder pb-4">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Request Instant Bank Withdrawal</h3>
              <button
                type="button"
                onClick={() => setWithdrawModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {withdrawResult?.success ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-donezo-green dark:text-emerald-400 mx-auto" />
                <h4 className="font-bold text-slate-900 dark:text-white text-base">Withdrawal Dispatched via IMPS</h4>
                <p className="text-slate-600 dark:text-slate-300">
                  ₹{withdrawAmount.toLocaleString()} has been sent to your verified HDFC Bank Account.
                </p>
                <div className="text-[11px] text-donezo-green dark:text-emerald-400 font-mono bg-slate-50 dark:bg-[#0E1318] p-3 rounded-xl border border-donezo-lightBorder dark:border-donezo-darkBorder">
                  Transaction Reference: {withdrawResult.refId}
                </div>
                <button
                  type="button"
                  onClick={() => setWithdrawModalOpen(false)}
                  className="w-full py-2.5 bg-donezo-green hover:bg-donezo-greenHover text-white rounded-full font-bold mt-2 shadow-sm transition-all"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleWithdraw} className="space-y-4">
                <div className="bg-slate-50 dark:bg-[#0E1318] p-4 rounded-2xl border border-donezo-lightBorder dark:border-donezo-darkBorder space-y-1">
                  <span className="text-slate-400">Available to Withdraw:</span>
                  <div className="text-2xl font-black text-donezo-green dark:text-emerald-400 font-mono">₹{walletBalance.available.toLocaleString()}</div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Enter Withdrawal Amount (₹)</label>
                  <input
                    type="number"
                    max={walletBalance.available}
                    min={500}
                    required
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-xl text-slate-900 dark:text-white font-mono font-bold text-lg focus:outline-none focus:border-donezo-green"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>Min: ₹500</span>
                    <button
                      type="button"
                      onClick={() => setWithdrawAmount(walletBalance.available)}
                      className="text-donezo-green dark:text-emerald-400 hover:underline font-bold"
                    >
                      Withdraw Max
                    </button>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-[#0E1318] p-3.5 rounded-2xl border border-donezo-lightBorder dark:border-donezo-darkBorder text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                  <div className="text-slate-900 dark:text-white font-bold">Destination Account:</div>
                  <div>HDFC Bank · {specialist.bankDetails.accountNumberMasked}</div>
                  <div>IFSC: {specialist.bankDetails.ifsc}</div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold">✓ Instant 24x7 IMPS Transfer</div>
                </div>

                {withdrawResult?.error && (
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 rounded-xl border border-rose-200 dark:border-rose-800">
                    {withdrawResult.error}
                  </div>
                )}

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setWithdrawModalOpen(false)}
                    className="flex-1 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-donezo-green hover:bg-donezo-greenHover text-white rounded-full font-bold shadow-sm transition-all"
                  >
                    Confirm Payout
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
