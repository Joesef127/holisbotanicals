import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, HeartPulse, Clock, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FadeIn, SectionHeader } from '../prostanone/shared';

const COMMON_SYMPTOMS = [
  { id: 'hot-flashes', label: 'Hot Flashes & Warm Spikes' },
  { id: 'night-sweats', label: 'Night Sweats & Restless Sleep' },
  { id: 'irregular-cycles', label: 'Irregular or Delayed Periods' },
  { id: 'mood-swings', label: 'Mood Changes & Irritability' },
  { id: 'discomfort', label: 'Menstrual Cramps & Discomfort' },
  { id: 'vitality', label: 'Fatigue & Low Energy' },
];

export const MenosetAssessmentTeaser: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([
    'hot-flashes',
    'irregular-cycles',
  ]);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getInsight = () => {
    const count = selectedSymptoms.length;
    if (count >= 3) {
      return {
        focus: 'Multi-Symptom Menopausal Harmony',
        recommendation: '6-Pack Wellness Bundle (180 Days)',
        benefit: 'Comprehensive support to stabilize cycle rhythms, calm sudden temperature surges, and soothe nervous fatigue.',
        targetId: 'menoset-wellness',
      };
    } else if (count >= 1) {
      return {
        focus: 'Targeted Cycle & Temperature Comfort',
        recommendation: '3-Pack Essentials (90 Days)',
        benefit: 'Optimal foundational window to allow active botanicals to support natural balance and menstrual regularity.',
        targetId: 'menoset-essentials',
      };
    }
    return {
      focus: 'General Menopausal Transition Support',
      recommendation: '1-Pack Starter (30 Days)',
      benefit: 'A great introductory month to experience gentle, non-hormonal botanical relief.',
      targetId: 'menoset-starter',
    };
  };

  const insight = getInsight();

  return (
    <section id="assessment" className="py-20 lg:py-28 bg-surface relative overflow-hidden">

      {/* <div className="absolute top-0 right-0 w-96 h-96 bg-[#f4cf80]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d77892]/15 rounded-full blur-3xl pointer-events-none" /> */}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        <FadeIn>
            <SectionHeader
              eyebrow="Interactive Wellness Tool"
              title="Not Sure If Menoset Is Right For You?"
              subtitle="Answer a few simple questions about your cycle and symptoms. Our quick wellness
                        assessment will help you understand the type of support you may be looking for
                        and guide you towards the Menoset pack that best fits your routine."
            />
          </FadeIn>

        {/* Interactive Symptom Selector + Live Match Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-7xl rounded-3xl  border border-gray-100 bg-surface p-6 sm:p-10 lg:p-12 shadow-xl shadow-[#4e1939]/5"
        >
          <div className="grid gap-10 lg:grid-cols-12 items-center">

            {/* Left: Symptom Pill Selector */}
            <div className="lg:col-span-7">
              <div className="flex flex-col sm:flex-row item-start sm:items-center justify-between gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  Quick Interactive Symptom Matcher
                </span>
                {/* <span className="text-xs text-[#7d5e6e]">Select what you feel:</span> */}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-secondary mb-4">
                What changes are you currently noticing?
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {COMMON_SYMPTOMS.map((symptom) => {
                  const isSelected = selectedSymptoms.includes(symptom.id);
                  return (
                    <button
                      key={symptom.id}
                      type="button"
                      onClick={() => toggleSymptom(symptom.id)}
                      className={`group flex items-center justify-between text-left p-3.5 rounded-2xl border transition-all text-xs sm:text-sm shadow-sm font-medium ${isSelected
                        ? 'border-primary bg-white/80 text-secondary shadow-sm'
                        : 'border-primary/10 bg-primary/2 text-secondary hover:border-[#d77892] hover:bg-white'
                        }`}
                    >
                      <span className="leading-snug">{symptom.label}</span>
                      <div
                        className={`h-5 w-5 rounded-full flex items-center justify-center shrink-0 ml-2 transition-colors ${isSelected
                            ? 'bg-primary text-white'
                            : 'border border-[#d7c4ce] group-hover:border-primary'
                          }`}
                      >
                        {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="mt-4 text-xs text-text-muted flex items-center gap-1.5 italic">
                <HelpCircle className="h-3.5 w-3.5 shrink-0" />
                Tap symptoms above to preview how Menoset addresses your specific needs.
              </p>
            </div>

            {/* Right: Live Guidance Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-[#fff7fa] to-[#fff3e8] p-6 sm:p-7 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Instant Match Preview</span>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={insight.focus}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4"
                  >
                    <div className="inline-block rounded-lg bg-[#4e1939] px-3 py-1 text-xs font-bold text-[#f4cf80]">
                      {insight.recommendation}
                    </div>

                    <h4 className="mt-3 text-lg sm:text-xl font-bold text-secondary">
                      {insight.focus}
                    </h4>

                    <p className="mt-2 text-xs sm:text-sm text-[#664b5b] leading-relaxed">
                      {insight.benefit}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-6 pt-5 border-t border-[#ead7df] space-y-3">
                  <Link
                    to="/menoset-check"
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#4e1939] px-3 sm:px-5 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#68234d] transition-all"
                  >
                    <span>Take a 60-Second Check</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <a
                    href={`#pricing`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="block text-center text-xs font-semibold text-[#8a335a] hover:underline"
                  >
                    Or view pack options below ↓
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Microcopy disclaimer from document */}
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs text-text-muted font-medium tracking-wide">
              Product guidance only, not a medical diagnosis.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default MenosetAssessmentTeaser;
