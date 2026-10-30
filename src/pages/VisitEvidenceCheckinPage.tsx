import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Camera, MapPin, CheckCircle2, AlertTriangle, ArrowLeft, ShieldCheck, Upload } from 'lucide-react';
import { useSpecialist } from '../store/SpecialistContext';

export const VisitEvidenceCheckinPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJobById, submitVisitEvidence } = useSpecialist();

  const job = getJobById(id || '');

  const [specialistPhoto, setSpecialistPhoto] = useState<string>(
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'
  );
  const [platePhoto, setPlatePhoto] = useState<string>(
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80'
  );
  const [odometerPhoto, setOdometerPhoto] = useState<string>(
    'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=600&q=80'
  );
  const [odometerKm, setOdometerKm] = useState<number>(34820);
  const [gpsCoords] = useState<string>('12.9121° N, 77.6446° E (Bengaluru)');
  const [error, setError] = useState<string>('');

  if (!job) {
    return <div className="text-center py-20 text-slate-900 dark:text-white">Job Not Found</div>;
  }

  const handleCompleteCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!odometerKm || odometerKm <= 0) {
      setError('Please enter a valid odometer reading from the instrument cluster.');
      return;
    }

    submitVisitEvidence(job.id, {
      specialistPhotoUrl: specialistPhoto,
      numberPlatePhotoUrl: platePhoto,
      odometerPhotoUrl: odometerPhoto,
      odometerKm,
      gpsCoords,
    });

    // Navigate to checklist
    navigate(`/specialist/jobs/${job.id}/inspect`);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <Link to={`/specialist/jobs/${job.id}`} className="text-xs font-bold text-donezo-green dark:text-emerald-400 hover:underline flex items-center gap-1.5">
          <ArrowLeft className="w-4 h-4" /> Back to Job Details
        </Link>
        <span className="font-mono text-xs text-slate-400">BRD Rule ASN-005</span>
      </div>

      <div className="bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-3xl p-6 sm:p-8 space-y-6 shadow-donezo">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 px-3 py-1 rounded-full">
            Mandatory Arrival Proof
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-2">
            On-Site Check-in & Evidence
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Target Vehicle: <strong className="text-slate-900 dark:text-white">{job.vehicle.make} {job.vehicle.model}</strong> at {job.location.address}
          </p>
        </div>

        {/* GPS Sensor Badge */}
        <div className="bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder p-3.5 rounded-2xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>GPS Geotag: <code className="text-donezo-green dark:text-emerald-400 font-mono font-bold">{gpsCoords}</code></span>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Within 20m</span>
        </div>

        <form onSubmit={handleCompleteCheckin} className="space-y-5">
          {/* 3 Evidence Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            
            {/* Photo 1: Selfie with Vehicle */}
            <div className="bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder p-3.5 rounded-2xl space-y-2 text-center">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">1. You with Vehicle *</span>
              <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden relative border border-donezo-lightBorder dark:border-donezo-darkBorder">
                <img src={specialistPhoto} alt="Specialist with vehicle" className="w-full h-full object-cover" />
                <div className="absolute bottom-1.5 right-1.5 bg-emerald-600 text-white rounded-full p-1 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>
              <span className="text-[10px] text-slate-400 block">Proves Attendance</span>
            </div>

            {/* Photo 2: Number Plate */}
            <div className="bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder p-3.5 rounded-2xl space-y-2 text-center">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">2. License Plate *</span>
              <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden relative border border-donezo-lightBorder dark:border-donezo-darkBorder">
                <img src={platePhoto} alt="Vehicle registration plate" className="w-full h-full object-cover" />
                <div className="absolute bottom-1.5 right-1.5 bg-emerald-600 text-white rounded-full p-1 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>
              <span className="text-[10px] text-slate-400 block">VIN / Plate Proof</span>
            </div>

            {/* Photo 3: Odometer */}
            <div className="bg-slate-50 dark:bg-[#0E1318] border border-donezo-lightBorder dark:border-donezo-darkBorder p-3.5 rounded-2xl space-y-2 text-center">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">3. Odometer Display *</span>
              <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden relative border border-donezo-lightBorder dark:border-donezo-darkBorder">
                <img src={odometerPhoto} alt="Odometer cluster" className="w-full h-full object-cover" />
                <div className="absolute bottom-1.5 right-1.5 bg-emerald-600 text-white rounded-full p-1 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>
              <span className="text-[10px] text-slate-400 block">Cluster Proof</span>
            </div>

          </div>

          {/* Odometer Input */}
          <div className="bg-slate-50 dark:bg-[#0E1318] p-4 rounded-2xl border border-donezo-lightBorder dark:border-donezo-darkBorder space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
              Current Odometer Reading (KM) *
            </label>
            <input
              type="number"
              required
              value={odometerKm}
              onChange={(e) => setOdometerKm(Number(e.target.value))}
              placeholder="e.g. 34820"
              className="w-full px-4 py-3 bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-xl text-lg font-mono font-bold text-donezo-green dark:text-emerald-400 focus:outline-none focus:border-donezo-green"
            />
            <p className="text-[11px] text-slate-400">
              Must match physical cluster photo. Stored in permanent audit log.
            </p>
          </div>

          {error && <div className="p-3 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-700 dark:text-rose-300">{error}</div>}

          <button
            type="submit"
            className="w-full py-3.5 bg-donezo-green hover:bg-donezo-greenHover text-white font-bold text-sm rounded-full flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            Confirm Arrival & Start Inspection Checklist
          </button>
        </form>
      </div>
    </div>
  );
};
