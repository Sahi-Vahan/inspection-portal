import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Wrench, Smartphone, ArrowRight, Lock, CheckCircle2, AlertCircle, Sun, Moon } from 'lucide-react';
import { useTheme } from '../store/ThemeContext';

export const SpecialistLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [phone, setPhone] = useState('9845011223');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setOtpSent(true);
    setOtp('7041'); // Prefill test OTP
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== '7041' && otp.length < 4) {
      setError('Invalid OTP code. Use demo OTP 7041.');
      return;
    }
    navigate('/specialist/dashboard');
  };

  const handleQuickLogin = () => {
    navigate('/specialist/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-donezo-lightBg dark:bg-donezo-dark text-slate-900 dark:text-white relative transition-colors duration-200">
      {/* Top right Theme toggle */}
      <div className="absolute top-6 right-6 z-20">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full border border-donezo-lightBorder dark:border-donezo-darkBorder bg-white dark:bg-donezo-darkCard flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-donezo-green dark:hover:text-emerald-400 transition-colors shadow-sm"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>

      <div className="max-w-md w-full bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-3xl p-6 sm:p-8 shadow-donezo relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-donezo-green text-white mb-3 shadow-md">
            <Wrench className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">SahiVahan Specialist</h1>
          <p className="text-xs uppercase tracking-wider text-donezo-green dark:text-emerald-400 font-bold mt-1">
            Certified Field Workstation
          </p>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1.5">
            Restricted access portal for empaneled vehicle diagnostic specialists.
          </p>
        </div>

        {/* Demo Fast Login Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-donezo-green dark:text-emerald-400" /> One-Click Specialist Sign In
            </span>
            <span className="text-[10px] bg-donezo-greenLight dark:bg-emerald-950/40 text-donezo-green dark:text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
              Demo Preset
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Instant entry as Senior Specialist <strong>Rajesh Verma</strong> (SV-SPEC-704).
          </p>
          <button
            onClick={handleQuickLogin}
            className="w-full py-2.5 px-4 bg-donezo-green hover:bg-donezo-greenHover text-white font-bold rounded-full text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            Launch Field Terminal <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-donezo-lightBorder dark:border-donezo-darkBorder"></div>
          </div>
          <span className="relative bg-white dark:bg-donezo-darkCard px-3 text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            Or Standard Mobile OTP
          </span>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
                Registered Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm font-semibold">
                  +91
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="98450 11223"
                  className="w-full pl-14 pr-4 py-2.5 bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder focus:border-donezo-green rounded-xl text-slate-900 dark:text-white font-mono text-sm placeholder-slate-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-donezo-green hover:bg-donezo-greenHover text-white font-bold rounded-full text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              Request OTP Code <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  Enter 4-Digit OTP
                </label>
                <span className="text-xs text-donezo-green dark:text-emerald-400 font-medium">Sent to +91 {phone}</span>
              </div>
              <input
                type="text"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="7041"
                className="w-full text-center tracking-widest text-2xl py-2.5 bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder focus:border-donezo-green rounded-xl text-slate-900 dark:text-white font-mono placeholder-slate-400 focus:outline-none"
                required
              />
              <p className="text-[11px] text-slate-400 mt-1.5 text-center">
                Demo code: <span className="text-donezo-green dark:text-emerald-400 font-mono font-bold">7041</span>
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-donezo-green hover:bg-donezo-greenHover text-white font-bold rounded-full text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              Verify & Enter Terminal <CheckCircle2 className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="mt-8 text-center border-t border-donezo-lightBorder dark:border-donezo-darkBorder pt-4">
          <p className="text-[11px] text-slate-400">
            Field Support Dispatch: <span className="text-slate-700 dark:text-slate-300 font-semibold">1800-SAHI-SPEC</span> (24x7)
          </p>
        </div>
      </div>
    </div>
  );
};
