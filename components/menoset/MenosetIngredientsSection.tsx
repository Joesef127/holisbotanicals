import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Sparkles, CheckCircle2 } from 'lucide-react';

const MenosetIngredientsSection: React.FC = () => {
  const ingredients = [
    {
      name: 'Black Cohosh',
      botanical: 'Cimicifuga racemosa',
      role: 'Hot Flash & Thermoregulation Specialist',
      description:
        'Globally recognized as the premier botanical for menopausal vasomotor support. It interacts gently with central serotonin receptors to help cool sudden internal heat surges and prevent disruptive nighttime sweat cycles.',
      highlights: ['Hypothalamic cooling', 'Reduces night sweat awakenings', 'Non-hormonal estrogen receptor modulation'],
    },
    {
      name: 'Dong Quai',
      botanical: 'Angelica sinensis',
      role: 'Female Hormonal Balance & Pelvic Tonic',
      description:
        'Often revered as the "female ginseng," Dong Quai is traditionally used to promote healthy pelvic circulation, support natural hormonal equilibrium, and relieve tension associated with transitional life stages.',
      highlights: ['Pelvic circulation support', 'Relieves hormonal fatigue', 'Sustains feminine vitality & intimacy'],
    },
    {
      name: 'Vitex (Chasteberry)',
      botanical: 'Vitex agnus-castus',
      role: 'Pituitary-Ovarian Rhythm & PMS Calmer',
      description:
        'Works with the pituitary gland to encourage balanced progesterone-to-estrogen ratios. Highly effective for easing breast tenderness, PMS mood volatility, and erratic cycle spacing.',
      highlights: ['Restores cycle predictability', 'Eases cyclic breast tenderness', 'Supports neuro-emotional serenity'],
    },
    {
      name: 'Blue Cohosh',
      botanical: 'Caulophyllum thalictroides',
      role: 'Uterine Tone & Antispasmodic Comfort',
      description:
        'Contains bioactive plant compounds that promote healthy smooth muscle tone throughout the pelvic region, easing severe cyclical spasms, menstrual cramps, and heavy dragging sensations.',
      highlights: ['Calms severe pelvic cramps', 'Supports smooth muscular tone', 'Reduces cyclical dragging discomfort'],
    },
  ];

  return (
    <section className="py-24 bg-rose-500/5 dark:bg-rose-950/20 border-b border-rose-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-700 dark:text-rose-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Leaf className="w-3.5 h-3.5" />
            <span>Standardized Botanical Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            The 4 Proven Botanicals Inside Menoset
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
            Carefully calibrated in exact synergistic ratios so each plant extract amplifies the therapeutic efficacy of the others.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ingredients.map((ing, index) => (
            <motion.div
              key={ing.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-card border border-rose-500/15 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                      {ing.role}
                    </span>
                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">
                      {ing.name}
                    </h3>
                    <p className="text-xs italic text-gray-400 dark:text-gray-500 font-mono">
                      {ing.botanical}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {ing.description}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                <ul className="space-y-2">
                  {ing.highlights.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenosetIngredientsSection;
