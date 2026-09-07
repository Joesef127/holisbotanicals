import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, ShieldAlert, Sparkles, Check, Flame, Moon, Calendar, Heart } from 'lucide-react';
import Button from '../Button';

const MenosetAssessmentTeaser: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(['Hot Flashes', 'Night Sweats']);

  const sampleSymptoms = [
    { name: 'Hot Flashes', icon: <Flame className="w-3.5 h-3.5" /> },
    { name: 'Night Sweats', icon: <Moon className="w-3.5 h-3.5" /> },
    { name: 'Irregular Periods', icon: <Calendar className="w-3.5 h-3.5" /> },
    { name: 'Mood Fluctuations', icon: <Heart className="w-3.5 h-3.5" /> },
    { name: 'Sleep Difficulties', icon: <Activity className="w-3.5 h-3.5" /> },
    { name: 'Menstrual Cramps', icon: <Sparkles className="w-3.5 h-3.5" /> },
  ];

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-[#fcf7f9] to-[#f9edf1] dark:from-[#1b0916] dark:to-[#160612] border-b border-[#ead7df] dark:border-rose-950/40 relative overflow-hidden">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-300/20 dark:bg-rose-900/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-200/20 dark:bg-amber-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-white dark:bg-[#200b1a] border border-[#e5cad6] dark:border-rose-900/40 p-8 sm:p-12 shadow-xl shadow-rose-950/5 relative overflow-hidden"
        >
          {/* Subtle gold ribbon top edge */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#9d3d65] via-[#e5a95d] to-[#9d3d65]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading & Official Copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-[#9d3d65] dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Personalized Symptom Matching</span>
              </div>

              {/* Headline from PDF Section 2 */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#380b24] dark:text-white tracking-tight mb-4">
                NOT SURE IF MENOSET IS RIGHT FOR YOU?
              </h2>

              {/* Body from PDF Section 2 */}
              <p className="text-base sm:text-lg text-[#624b57] dark:text-rose-100/80 leading-relaxed mb-6">
                Answer a few simple questions about your cycle and symptoms. Our quick wellness assessment will help you understand the type of support you may be looking for and guide you towards the Menoset pack that best fits your routine.
              </p>

              {/* Microcopy & CTA button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link to="/menoset-check" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto gap-2 bg-[#9d3d65] hover:bg-[#832e52] text-white font-bold shadow-lg shadow-rose-900/20"
                  >
                    <span>TAKE THE 60-SECOND MENOSET CHECK</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <p className="text-xs text-[#826775] dark:text-rose-200/60 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Product guidance only — not a medical diagnosis.</span>
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Quick Symptom Selector Card */}
            <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#faf2f5] dark:bg-[#160612] border border-[#eedde5] dark:border-rose-900/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#9d3d65] dark:text-rose-300 flex items-center gap-1.5">
                  <Activity className="w-4 h-4" /> Quick Symptom Preview
                </span>
                <span className="text-[11px] text-[#826775] dark:text-rose-300/70">
                  Tap to preview match
                </span>
              </div>

              <p className="text-xs text-[#624b57] dark:text-rose-100/70 mb-4">
                Select what you are feeling right now:
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {sampleSymptoms.map((sym) => {
                  const isSelected = selectedSymptoms.includes(sym.name);
                  return (
                    <button
                      key={sym.name}
                      type="button"
                      onClick={() => toggleSymptom(sym.name)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#9d3d65] text-white shadow-sm ring-2 ring-[#9d3d65]/20'
                          : 'bg-white dark:bg-[#200b1a] text-[#624b57] dark:text-rose-200 border border-[#e2cbd6] dark:border-rose-900/40 hover:border-[#9d3d65]'
                      }`}
                    >
                      {sym.icon}
                      <span>{sym.name}</span>
                      {isSelected && <Check className="w-3 h-3 ml-0.5" />}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Feedback Box */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedSymptoms.join(',')}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="p-4 rounded-xl bg-white dark:bg-[#200b1a] border border-[#ead7df] dark:border-rose-900/40 text-xs text-[#523d49] dark:text-rose-100/90 leading-relaxed shadow-xs"
                >
                  <p className="font-bold text-[#9d3d65] dark:text-[#ffd98e] mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    {selectedSymptoms.length > 0
                      ? `${selectedSymptoms.length} Selected Concern${selectedSymptoms.length > 1 ? 's' : ''}`
                      : 'Select any symptom above'}
                  </p>
                  <p>
                    {selectedSymptoms.length > 0
                      ? `Menoset’s non-hormonal formula combines Black Cohosh, Dong Quai, and Vitex to provide targeted herbal support for ${selectedSymptoms.slice(0, 2).join(' & ')}.`
                      : 'Choose one or more symptoms to see how Menoset’s botanical composition supports you.'}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MenosetAssessmentTeaser;
