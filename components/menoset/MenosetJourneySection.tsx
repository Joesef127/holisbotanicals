import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Sparkles, Sun, Moon, Shield, ArrowDown } from 'lucide-react';

const MenosetJourneySection: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'perimenopause' | 'menopause' | 'postmenopause'>('perimenopause');

  const stages = [
    {
      id: 'perimenopause',
      number: '01',
      title: 'Perimenopause',
      tagline: 'The Initial Transition & Hormonal Wave',
      description:
        'The transition towards menopause. Hormone levels fluctuate and gradually shift, bringing unexpected changes to your monthly rhythm.',
      symptoms: [
        'Irregular periods & cycle spacing',
        'Early daytime hot flashes',
        'Night sweats affecting sleep quality',
        'Cyclical breast tenderness & cramps',
        'Mood shifts & emotional irritability',
        'Gradual changes in libido',
      ],
      supportRole:
        'Menoset provides non-hormonal botanical stability with Vitex and Black Cohosh to help smooth erratic peaks and valleys without synthetic hormones.',
    },
    {
      id: 'menopause',
      number: '02',
      title: 'Menopause',
      tagline: 'The Biological Milestone',
      description:
        'Menopause is reached after 12 consecutive months without a menstrual period. Vasomotor temperature surges often reach their most disruptive levels during this window.',
      symptoms: [
        'Periods have completely ceased',
        'Sudden, intense daytime hot flashes',
        'Drenching night sweats & waking up cold',
        'Persistent sleep difficulties',
        'Vaginal dryness & tissue sensitivity',
        'Changes in emotional vitality & libido',
      ],
      supportRole:
        'Standardized Black Cohosh and Dong Quai directly assist hypothalamic temperature regulation to calm rapid heat flashes and nocturnal perspiration.',
    },
    {
      id: 'postmenopause',
      number: '03',
      title: 'Postmenopause',
      tagline: 'Long-Term Vitality & Balance',
      description:
        'The years following menopause. Some symptoms can continue, while longer-term health considerations such as bone and cardiovascular health become increasingly important.',
      symptoms: [
        'Lower stabilized estrogen baseline',
        'Residual mild temperature surges',
        'Bone density & cardiovascular wellness priorities',
        'Sustaining energy, stamina & mood stability',
        'Maintaining intimate vitality & tissue comfort',
      ],
      supportRole:
        'Continuous botanical nourishment keeps your system grounded, energized, and comfortable as you embrace this empowering new life chapter.',
    },
  ];

  const current = stages.find((s) => s.id === activeStage)!;

  return (
    <section id="journey" className="py-24 bg-white dark:bg-[#180914] text-[#33242d] dark:text-white relative overflow-hidden border-b border-[#ead7df] dark:border-rose-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Official PDF Copy */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fbeff1] dark:bg-rose-950/60 text-[#9d3d65] dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Calendar className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>The Menopause Journey</span>
            </div>

            {/* Headline from PDF Section 4 */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4e1939] dark:text-white tracking-tight leading-tight mb-6">
              PERIMENOPAUSE. MENOPAUSE. POSTMENOPAUSE.{' '}
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-[#9d3d65] via-[#d47892] to-[#9d3d65]">
                WHAT'S HAPPENING TO YOUR BODY?
              </span>
            </h2>

            {/* Body from PDF Section 4 */}
            <p className="text-base sm:text-lg text-[#624b57] dark:text-rose-100/80 leading-relaxed max-w-2xl mx-auto">
              The menopause transition does not happen overnight. As your body changes with age, hormone levels fluctuate and gradually decline. This can bring changes to your menstrual cycle and a range of physical and emotional symptoms.
            </p>
          </motion.div>
        </div>

        {/* 3 Interactive Stage Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-4xl mx-auto">
          {stages.map((stage) => {
            const isActive = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id as any)}
                className={`p-5 rounded-2xl text-left transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#4e1939] text-white border-[#4e1939] shadow-xl shadow-rose-950/20 ring-2 ring-[#d77892]/40'
                    : 'bg-[#fffaf7] dark:bg-[#200b1a] text-[#4e1939] dark:text-white border-[#ead7df] dark:border-rose-950/60 hover:border-[#9d3d65]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold tracking-widest ${isActive ? 'text-[#ffd98e]' : 'text-[#9d3d65]'}`}>
                    {stage.number}
                  </span>
                  {isActive && <Sparkles className="w-4 h-4 text-[#ffd98e]" />}
                </div>
                <h3 className="text-lg font-extrabold mb-1">{stage.title}</h3>
                <p className={`text-xs leading-relaxed ${isActive ? 'text-white/80' : 'text-[#624b57] dark:text-rose-200/70'}`}>
                  {stage.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Stage Detailed Card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="p-8 sm:p-12 rounded-3xl bg-[#fffaf7] dark:bg-[#1e0a19] border border-[#ead7df] dark:border-rose-950/60 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#ead7df] dark:border-rose-950/40">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#9d3d65] dark:text-[#ffd98e]">
                    Stage {current.number} · {current.tagline}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#4e1939] dark:text-white mt-1">
                    {current.title}
                  </h3>
                </div>
                <div className="px-4 py-2 rounded-xl bg-white dark:bg-black/30 border border-[#ead7df] dark:border-rose-900/30 text-xs font-semibold text-[#4e1939] dark:text-rose-200">
                  Natural Life Phase
                </div>
              </div>

              {/* Exact definition from PDF Section 4 */}
              <p className="text-base sm:text-lg text-[#624b57] dark:text-rose-100/90 leading-relaxed mb-8">
                {current.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Common Symptoms List */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#9d3d65] dark:text-[#ffd98e] mb-4 flex items-center gap-1.5">
                    <Sun className="w-4 h-4" /> Common Symptoms in this Stage:
                  </h4>
                  <ul className="space-y-3">
                    {current.symptoms.map((symptom) => (
                      <li
                        key={symptom}
                        className="flex items-start gap-2.5 text-sm text-[#523d49] dark:text-rose-100/80 leading-snug"
                      >
                        <div className="w-2 h-2 rounded-full bg-[#d77892] mt-1.5 shrink-0" />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How Menoset Supports this stage */}
                <div className="p-6 rounded-2xl bg-white dark:bg-[#160612] border border-[#ead7df] dark:border-rose-900/40 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#9d3d65] dark:text-[#ffd98e] mb-2">
                    <Shield className="w-4 h-4 text-[#d4af37]" />
                    <span>How Menoset Supports You</span>
                  </div>
                  <p className="text-sm text-[#624b57] dark:text-rose-100/90 leading-relaxed">
                    {current.supportRole}
                  </p>
                </div>
              </div>

              {/* CTA from PDF Section 4 */}
              <div className="text-center pt-6 border-t border-[#ead7df] dark:border-rose-950/40">
                <a
                  href="#formula"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#9d3d65] dark:text-[#ffd98e] hover:underline underline-offset-4 cursor-pointer"
                >
                  <span>DISCOVER THE MENOSET FORMULA ↓</span>
                  <ArrowDown className="w-4 h-4 animate-bounce" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default MenosetJourneySection;
