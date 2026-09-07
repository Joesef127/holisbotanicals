import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Sparkles, ArrowRight, CheckCircle2, Flower, Flame, Heart, Smile, Shield, Activity } from 'lucide-react';

const MenosetIngredientsSection: React.FC = () => {
  const [activeHerb, setActiveHerb] = useState<number>(0);

  const botanicals = [
    {
      name: 'Black Cohosh',
      botanicalName: 'Cimicifuga racemosa',
      tagline: 'Vasomotor & Hot Flash Specialist',
      traditionalCopy:
        'Traditionally used for menopausal wellness, particularly hot flashes and mood-related symptoms.',
      details:
        'A prized woodland root with centuries of traditional use. It interacts gently with central thermoregulatory pathways to help dissipate sudden heat surges and restore peaceful nighttime comfort.',
      targets: ['Vasomotor temperature spikes', 'Nocturnal perspiration', 'Hormonal irritability & tension'],
    },
    {
      name: 'Dong Quai',
      botanicalName: 'Angelica sinensis',
      tagline: "The Premier 'Women’s Herb'",
      traditionalCopy:
        "Traditionally known as a women's botanical and used in herbal practices for menstrual and menopausal concerns.",
      details:
        'Revered across centuries of Eastern herbal traditions. Dong Quai promotes healthy pelvic circulation, nourishes female vitality, and supports uterine comfort across cycle transitions.',
      targets: ['Pelvic circulation support', 'Relieves hormonal fatigue', 'Sustains feminine intimacy & vitality'],
    },
    {
      name: 'Vitex agnus-castus',
      botanicalName: 'Chasteberry',
      tagline: 'Cycle Rhythm & PMS Support',
      traditionalCopy:
        'Traditionally used to support menstrual-cycle wellness and PMS-related concerns, including mood changes and breast tenderness.',
      details:
        'Works with the pituitary regulatory pathways to foster harmonic cycle spacing, calming breast tenderness, fluid retention, and cyclic emotional swings.',
      targets: ['Cycle predictability & spacing', 'Cyclic breast tenderness', 'Emotional serenity & PMS calm'],
    },
    {
      name: 'Blue Cohosh',
      botanicalName: 'Caulophyllum thalictroides',
      tagline: 'Pelvic Comfort & Muscular Tone',
      traditionalCopy:
        "A botanical traditionally associated with women's menstrual wellness.",
      details:
        'Contains natural botanical glycosides that soothe uterine smooth muscle contractions, easing heavy dragging sensations, lower back tension, and periodic menstrual cramps.',
      targets: ['Eases menstrual cramps', 'Supports smooth muscular tone', 'Relieves heavy cyclical heaviness'],
    },
  ];

  const keyBenefits = [
    {
      icon: <Activity className="w-6 h-6 text-[#9d3d65]" />,
      title: 'Menstrual Cycle Support',
      text: 'Helps support menstrual regularity and comfort when cycles become unpredictable.',
    },
    {
      icon: <Smile className="w-6 h-6 text-amber-600" />,
      title: 'Mood & Emotional Support',
      text: 'Supports wellbeing during periods of hormonal fluctuation.',
    },
    {
      icon: <Flame className="w-6 h-6 text-rose-600" />,
      title: 'Hot Flash Support',
      text: 'Black Cohosh is traditionally used for menopausal symptom support, particularly hot flashes.',
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-600" />,
      title: 'Non-Hormonal Support',
      text: "A herbal, non-hormonal option for women's wellness during menstrual and menopause transitions.",
    },
    {
      icon: <Flower className="w-6 h-6 text-[#9d3d65]" />,
      title: 'Menstrual Comfort',
      text: 'Provides herbal support for menstrual discomfort.',
    },
    {
      icon: <Heart className="w-6 h-6 text-pink-600" />,
      title: "Women's Wellness & Libido",
      text: "Supports overall women's wellness, including sexual wellbeing during periods of change.",
    },
  ];

  const currentBotanical = botanicals[activeHerb];

  return (
    <section id="composition" className="py-24 bg-white dark:bg-[#180914] text-[#33242d] dark:text-white border-b border-[#ead7df] dark:border-rose-950/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: The Composition (PDF Section 7) */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fbeff1] dark:bg-rose-950/60 text-[#9d3d65] dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
              <Leaf className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Section 7 · The Composition</span>
            </div>

            {/* Headline & Intro from PDF Section 7 */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#4e1939] dark:text-white tracking-tight leading-tight mb-3">
              WHAT'S INSIDE EVERY TABLET?
            </h2>

            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#9d3d65] dark:text-[#ffd98e] mb-4">
              FOUR BOTANICALS. ONE WOMEN'S WELLNESS FORMULA.
            </p>

            <p className="text-base sm:text-lg text-[#624b57] dark:text-rose-100/80 leading-relaxed max-w-2xl mx-auto">
              Each plant extract has been selected for its individual traditional efficacy and how it complements the others in a harmonious botanical synergy.
            </p>
          </motion.div>
        </div>

        {/* Interactive Botanical Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
          
          {/* Herb Selector Tabs */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {botanicals.map((herb, idx) => {
              const isSelected = activeHerb === idx;
              return (
                <button
                  key={herb.name}
                  type="button"
                  onClick={() => setActiveHerb(idx)}
                  className={`p-5 rounded-2xl text-left transition-all cursor-pointer border flex items-center justify-between ${
                    isSelected
                      ? 'bg-[#4e1939] text-white border-[#4e1939] shadow-lg shadow-rose-950/20 ring-2 ring-[#d77892]/40'
                      : 'bg-[#fffaf7] dark:bg-[#1e0a19] text-[#4e1939] dark:text-white border-[#ead7df] dark:border-rose-950/60 hover:border-[#9d3d65]'
                  }`}
                >
                  <div>
                    <span className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${isSelected ? 'text-[#ffd98e]' : 'text-[#9d3d65]'}`}>
                      Botanical 0{idx + 1}
                    </span>
                    <h3 className="text-lg font-bold">{herb.name}</h3>
                    <p className={`text-xs italic font-serif ${isSelected ? 'text-white/75' : 'text-[#624b57] dark:text-rose-200/70'}`}>
                      {herb.botanicalName}
                    </p>
                  </div>
                  <Sparkles className={`w-4 h-4 ${isSelected ? 'text-[#ffd98e]' : 'text-[#ead7df] dark:text-rose-900'}`} />
                </button>
              );
            })}
          </div>

          {/* Active Herb Card Detail */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBotanical.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="h-full p-8 sm:p-10 rounded-3xl bg-[#fffaf7] dark:bg-[#1e0a19] border border-[#ead7df] dark:border-rose-950/60 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-6 border-b border-[#ead7df] dark:border-rose-950/40 mb-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#9d3d65] dark:text-[#ffd98e]">
                        {currentBotanical.tagline}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-black text-[#4e1939] dark:text-white mt-1">
                        {currentBotanical.name}
                      </h3>
                      <p className="text-xs italic font-serif text-[#7c6371] dark:text-rose-200/70">
                        ({currentBotanical.botanicalName})
                      </p>
                    </div>

                    <div className="px-3.5 py-1.5 rounded-full bg-white dark:bg-black/30 border border-[#ead7df] dark:border-rose-900/30 text-xs font-bold text-[#4e1939] dark:text-rose-200">
                      Standardized Extract
                    </div>
                  </div>

                  {/* Official PDF Quote */}
                  <blockquote className="p-4 rounded-xl bg-white dark:bg-[#150611] border-l-4 border-[#9d3d65] mb-6 text-sm sm:text-base text-[#4e1939] dark:text-rose-100 font-medium italic">
                    &ldquo;{currentBotanical.traditionalCopy}&rdquo;
                  </blockquote>

                  <p className="text-sm text-[#624b57] dark:text-rose-200/80 leading-relaxed mb-6">
                    {currentBotanical.details}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#9d3d65] dark:text-[#ffd98e] mb-3">
                      Primary Areas of Support:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      {currentBotanical.targets.map((target) => (
                        <li
                          key={target}
                          className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-[#150611] border border-[#ead7df] dark:border-rose-900/30 text-xs font-medium text-[#4e1939] dark:text-rose-100"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{target}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* CTA from PDF Section 7 */}
                <div className="pt-6 border-t border-[#ead7df] dark:border-rose-950/40 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-xs text-[#7c6371] dark:text-rose-200/70">
                    Synergistically calibrated for maximum efficacy.
                  </span>
                  <a href="#pricing">
                    <button className="px-5 py-2.5 rounded-xl bg-[#4e1939] hover:bg-[#6d274e] text-white text-xs font-bold flex items-center gap-2 transition-all cursor-pointer">
                      <span>READY TO EXPLORE MENOSET? ORDER NOW</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Section 6: Key Benefits Grid */}
        <div className="pt-12 border-t border-[#ead7df] dark:border-rose-950/40">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#9d3d65] dark:text-[#ffd98e] mb-2 block">
              Section 6 · Key Benefits
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-[#4e1939] dark:text-white tracking-tight">
              SUPPORT FOR THE CHANGES YOU FEEL
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -5 }}
                className="p-7 rounded-3xl bg-[#fffaf7] dark:bg-[#1e0a19] border border-[#ead7df] dark:border-rose-950/60 shadow-md hover:border-[#9d3d65] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-[#2a0e23] border border-[#ead7df] dark:border-rose-900/30 flex items-center justify-center mb-5 shadow-xs">
                    {benefit.icon}
                  </div>
                  <h4 className="text-lg font-bold text-[#4e1939] dark:text-white mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-[#624b57] dark:text-rose-200/80 leading-relaxed">
                    {benefit.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenosetIngredientsSection;
