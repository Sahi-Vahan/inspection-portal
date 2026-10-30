import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Camera,
  Mic,
  ArrowRight,
  ArrowLeft,
  Wrench,
  FileText
} from 'lucide-react';
import { useSpecialist } from '../store/SpecialistContext';
import { ChecklistGrade } from '../types/specialist';

export const ChecklistPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getJobById, updateChecklistItem } = useSpecialist();

  const job = getJobById(id || '');

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [voiceRecordingActive, setVoiceRecordingActive] = useState<string | null>(null);

  if (!job) {
    return <div className="text-center py-20 text-slate-900 dark:text-white">Job Record Not Found</div>;
  }

  const categories = ['All', ...Array.from(new Set(job.checklist.map((i) => i.category)))];

  const filteredItems = activeCategory === 'All'
    ? job.checklist
    : job.checklist.filter((i) => i.category === activeCategory);

  const completedCount = job.checklist.filter((i) => i.grade).length;
  const totalCount = job.checklist.length;
  const isAllCompleted = completedCount === totalCount;

  const handleGradeSelect = (itemId: string, grade: ChecklistGrade) => {
    updateChecklistItem(job.id, itemId, grade);
    if (grade === 'poor' || grade === 'critical' || grade === 'not_inspected') {
      setEditingItemId(itemId);
    }
  };

  const handleSimulateVoiceInput = (itemId: string) => {
    setVoiceRecordingActive(itemId);
    setTimeout(() => {
      updateChecklistItem(
        job.id,
        itemId,
        job.checklist.find((i) => i.id === itemId)?.grade || 'good',
        'Inspected with ultrasonic gauge. Clear indication of factory spot welds; zero structural deformation observed.'
      );
      setVoiceRecordingActive(null);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto pb-24">
      
      {/* Top Bar with Progress */}
      <div className="bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-3xl p-4 sm:p-5 sticky top-16 z-20 shadow-donezo space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-xs text-donezo-green dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              {job.id}
            </span>
            <span className="text-xs text-slate-900 dark:text-white font-bold ml-2">
              {job.vehicle.make} {job.vehicle.model}
            </span>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono font-bold text-donezo-green dark:text-emerald-400">
              {completedCount} / {totalCount} Done
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden border border-donezo-lightBorder dark:border-donezo-darkBorder">
          <div
            className="bg-donezo-green dark:bg-emerald-500 h-full transition-all duration-300 rounded-full"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-donezo-green text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Checklist Items List */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          return (
            <div
              key={item.id}
              className={`bg-white dark:bg-donezo-darkCard border rounded-3xl p-5 space-y-4 shadow-donezo transition-all ${
                item.grade === 'poor' || item.grade === 'critical'
                  ? 'border-rose-300 dark:border-rose-800/80'
                  : item.grade === 'average'
                  ? 'border-amber-300 dark:border-amber-800/60'
                  : 'border-donezo-lightBorder dark:border-donezo-darkBorder'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-donezo-green dark:text-emerald-400 tracking-wider">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">{item.title}</h3>
                </div>

                {item.grade && (
                  <span
                    className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                      item.grade === 'good'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                        : item.grade === 'average'
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                        : item.grade === 'not_inspected'
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                        : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                    }`}
                  >
                    {item.grade.replace('_', ' ')}
                  </span>
                )}
              </div>

              {/* Large 1-Touch Outdoor Buttons */}
              <div className="grid grid-cols-5 gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleGradeSelect(item.id, 'good')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    item.grade === 'good'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                      : 'bg-slate-50 dark:bg-[#0E1318] text-slate-700 dark:text-slate-300 border-donezo-lightBorder dark:border-donezo-darkBorder hover:bg-slate-100'
                  }`}
                >
                  Good
                </button>

                <button
                  type="button"
                  onClick={() => handleGradeSelect(item.id, 'average')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    item.grade === 'average'
                      ? 'bg-amber-500 text-white border-amber-400 shadow-sm'
                      : 'bg-slate-50 dark:bg-[#0E1318] text-slate-700 dark:text-slate-300 border-donezo-lightBorder dark:border-donezo-darkBorder hover:bg-slate-100'
                  }`}
                >
                  Average
                </button>

                <button
                  type="button"
                  onClick={() => handleGradeSelect(item.id, 'poor')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    item.grade === 'poor'
                      ? 'bg-rose-600 text-white border-rose-500 shadow-sm'
                      : 'bg-slate-50 dark:bg-[#0E1318] text-slate-700 dark:text-slate-300 border-donezo-lightBorder dark:border-donezo-darkBorder hover:bg-slate-100'
                  }`}
                >
                  Poor
                </button>

                <button
                  type="button"
                  onClick={() => handleGradeSelect(item.id, 'critical')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    item.grade === 'critical'
                      ? 'bg-red-700 text-white border-red-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-[#0E1318] text-slate-700 dark:text-slate-300 border-donezo-lightBorder dark:border-donezo-darkBorder hover:bg-slate-100'
                  }`}
                >
                  Critical
                </button>

                <button
                  type="button"
                  onClick={() => handleGradeSelect(item.id, 'not_inspected')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                    item.grade === 'not_inspected'
                      ? 'bg-slate-700 text-white border-slate-600'
                      : 'bg-slate-50 dark:bg-[#0E1318] text-slate-400 border-donezo-lightBorder dark:border-donezo-darkBorder hover:bg-slate-100'
                  }`}
                >
                  N / I
                </button>
              </div>

              {/* Remarks, Voice Transcription, or Not Inspected Reason */}
              {(editingItemId === item.id || item.remarks || item.notInspectedReason || item.grade === 'poor' || item.grade === 'critical' || item.grade === 'not_inspected') && (
                <div className="bg-slate-50 dark:bg-[#0E1318] p-4 rounded-2xl border border-donezo-lightBorder dark:border-donezo-darkBorder space-y-3 text-xs">
                  {item.grade === 'not_inspected' ? (
                    <div>
                      <label className="block text-slate-600 dark:text-slate-400 font-bold mb-1">
                        Mandatory Reason for Not Inspecting:
                      </label>
                      <input
                        type="text"
                        value={item.notInspectedReason || ''}
                        onChange={(e) =>
                          updateChecklistItem(job.id, item.id, item.grade, item.remarks, e.target.value)
                        }
                        placeholder="e.g. Engine undercover blocked physical access / seller lacked key"
                        className="w-full px-3 py-2 bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-xl text-slate-900 dark:text-white"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-slate-600 dark:text-slate-400 font-bold">
                          Technical Findings & Observations:
                        </label>
                        {/* Voice Input Simulator per BRD RPT-005 */}
                        <button
                          type="button"
                          onClick={() => handleSimulateVoiceInput(item.id)}
                          className="flex items-center gap-1 text-[11px] font-bold text-donezo-green dark:text-emerald-400 hover:underline"
                        >
                          <Mic className={`w-3.5 h-3.5 ${voiceRecordingActive === item.id ? 'text-rose-500 animate-ping' : ''}`} />
                          {voiceRecordingActive === item.id ? 'Transcribing...' : 'Voice Dictate'}
                        </button>
                      </div>
                      <textarea
                        rows={2}
                        value={item.remarks || ''}
                        onChange={(e) =>
                          updateChecklistItem(job.id, item.id, item.grade, e.target.value)
                        }
                        placeholder="Describe observed wear, gauge reading, or component condition..."
                        className="w-full px-3 py-2 bg-white dark:bg-donezo-darkCard border border-donezo-lightBorder dark:border-donezo-darkBorder rounded-xl text-slate-900 dark:text-white"
                      />
                    </div>
                  )}

                  {/* Photo Evidence attachment */}
                  <div className="flex items-center justify-between pt-1 border-t border-donezo-lightBorder dark:border-donezo-darkBorder">
                    <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Camera className="w-4 h-4 text-donezo-green dark:text-emerald-400" /> Defect Photo Attached
                    </span>
                    <button
                      type="button"
                      className="px-3 py-1 bg-white dark:bg-slate-800 hover:bg-slate-100 text-donezo-green dark:text-emerald-300 rounded-full text-[11px] font-bold border border-donezo-lightBorder dark:border-donezo-darkBorder"
                    >
                      + Add Photo
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Review & Submit Bottom Bar */}
      <div className="fixed bottom-14 md:bottom-0 left-0 right-0 z-20 bg-white/95 dark:bg-donezo-darkCard/95 backdrop-blur-md border-t border-donezo-lightBorder dark:border-donezo-darkBorder p-4 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400">Progress:</span>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {completedCount} of {totalCount} Items Graded
            </div>
          </div>

          <Link to={`/specialist/jobs/${job.id}/submit`}>
            <button
              type="button"
              className="py-2.5 px-6 bg-donezo-green hover:bg-donezo-greenHover text-white font-bold text-xs rounded-full flex items-center gap-2 shadow-sm transition-all"
            >
              Review & Submit Report <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
};
