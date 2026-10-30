import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Clock,
  PhoneCall,
  ShieldCheck,
  Navigation,
  Camera,
  Wrench,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useSpecialist } from '../store/SpecialistContext';

export const JobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJobById, acceptJob, rejectJob, startNavigation } = useSpecialist();

  const job = getJobById(id || '');

  if (!job) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Job Not Found</h2>
        <Link to="/specialist/dashboard" className="text-donezo-green dark:text-emerald-400 hover:underline text-xs font-bold">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link to="/specialist/dashboard" className="text-xs font-bold text-donezo-green dark:text-emerald-400 hover:underline flex items-center gap-1.5">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <span className="font-mono text-xs text-slate-400">Ref: {job.bookingRef}</span>
      </div>

      {/* Main Card */}
      <div className="bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-3xl p-6 sm:p-8 space-y-6 shadow-donezo">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-donezo-lightBorder dark:border-donezo-darkBorder pb-5 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-donezo-green dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                {job.id}
              </span>
              <span className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400">
                Status: <strong className="text-slate-900 dark:text-white">{job.status.replace('_', ' ')}</strong>
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">
              {job.vehicle.make} {job.vehicle.model}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {job.vehicle.variant} ({job.vehicle.year}) · {job.vehicle.fuel} · {job.vehicle.transmission}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-[11px] text-slate-400 uppercase font-bold block">Technician Payout</span>
            <span className="text-3xl font-extrabold text-donezo-green dark:text-emerald-400 font-mono">₹{job.payoutAmount}</span>
          </div>
        </div>

        {/* Location & Navigation Card */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-donezo-green dark:text-emerald-400" /> Inspection Site Address
          </div>
          <div className="bg-slate-50 dark:bg-[#0E1318] p-4 rounded-2xl border border-donezo-lightBorder dark:border-donezo-darkBorder space-y-2 text-xs">
            <div className="text-slate-900 dark:text-white font-medium text-sm">
              {job.location.address}, {job.location.area}, {job.location.city} - {job.location.pincode}
            </div>
            {job.location.landmark && (
              <div className="text-slate-500 dark:text-slate-400">Landmark: {job.location.landmark}</div>
            )}
            {job.location.accessNotes && (
              <div className="text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
                Gate / Parking Notes: {job.location.accessNotes}
              </div>
            )}
            <div className="pt-2">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(job.location.address + ' ' + job.location.city)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-donezo-green dark:text-emerald-400 hover:underline bg-white dark:bg-donezo-darkCard px-4 py-2 rounded-full border border-donezo-lightBorder dark:border-donezo-darkBorder shadow-2xs"
              >
                <Navigation className="w-3.5 h-3.5" /> Open in Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Seller Contact Card */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-donezo-green dark:text-emerald-400" /> Vehicle Seller Contact
          </div>
          <div className="bg-slate-50 dark:bg-[#0E1318] p-4 rounded-2xl border border-donezo-lightBorder dark:border-donezo-darkBorder flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">{job.location.sellerName}</div>
              <div className="text-slate-500 dark:text-slate-400 mt-0.5">Role: {job.location.sellerRelationship} · Phone: {job.location.sellerPhone}</div>
              {job.location.askingPrice && (
                <div className="mt-1.5 text-donezo-green dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Seller Quoted Price:</span>
                  <span className="font-bold font-mono">
                    ₹{isNaN(Number(job.location.askingPrice)) ? job.location.askingPrice : Number(job.location.askingPrice).toLocaleString('en-IN')}
                  </span>
                </div>
              )}
            </div>
            <a
              href={`tel:${job.location.sellerPhone}`}
              className="px-4 py-2 bg-donezo-green hover:bg-donezo-greenHover text-white rounded-full flex items-center gap-1.5 font-bold shadow-sm transition-all"
            >
              <PhoneCall className="w-4 h-4" /> Call Seller
            </a>
          </div>
        </div>

        {/* Scheduled Window */}
        <div className="flex items-center justify-between bg-slate-50 dark:bg-[#0E1318] p-4 rounded-2xl border border-donezo-lightBorder dark:border-donezo-darkBorder text-xs">
          <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-500" /> Appointment Window:
          </span>
          <span className="font-bold text-slate-900 dark:text-white text-sm">
            {job.appointment.date} ({job.appointment.window})
          </span>
        </div>

        {/* Dynamic Action Buttons */}
        <div className="pt-2 space-y-3">
          {job.status === 'assigned' && (
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  rejectJob(job.id, 'Declined by specialist');
                  navigate('/specialist/dashboard');
                }}
                className="py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full font-bold text-xs border border-donezo-lightBorder dark:border-donezo-darkBorder transition-colors"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => {
                  acceptJob(job.id);
                  navigate('/specialist/dashboard');
                }}
                className="py-3 bg-donezo-green hover:bg-donezo-greenHover text-white rounded-full font-bold text-xs shadow-sm transition-all"
              >
                Accept Assignment (₹{job.payoutAmount})
              </button>
            </div>
          )}

          {job.status === 'accepted' && (
            <button
              type="button"
              onClick={() => {
                startNavigation(job.id);
                navigate(`/specialist/jobs/${job.id}/checkin`);
              }}
              className="w-full py-3 bg-donezo-green hover:bg-donezo-greenHover text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Navigation className="w-4 h-4" /> Start Route Navigation (Status: En Route)
            </button>
          )}

          {job.status === 'en_route' && (
            <Link to={`/specialist/jobs/${job.id}/checkin`}>
              <button
                type="button"
                className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Camera className="w-4 h-4" /> Arrived at Vehicle: Capture Visit Proof
              </button>
            </Link>
          )}

          {(job.status === 'arrived' || job.status === 'inspecting') && (
            <Link to={`/specialist/jobs/${job.id}/inspect`}>
              <button
                type="button"
                className="w-full py-3 bg-donezo-green hover:bg-donezo-greenHover text-white rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <Wrench className="w-4 h-4" /> Open 200+ Point Checklist Terminal
              </button>
            </Link>
          )}

          {job.status === 'submitted' && (
            <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 text-xs text-emerald-800 dark:text-emerald-300 text-center font-bold">
              ✓ Report Submitted & Delivered to Customer (v{job.reportVersion}.0). Payout release timer is running.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
