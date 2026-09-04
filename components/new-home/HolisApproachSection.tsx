import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Target, HeartHandshake } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const HolisApproachSection: React.FC<{ reveal: any }> = ({ reveal }) => {
  const pillars = [
    {
      icon: <Leaf className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      title: 'Natural & Pure',
      description:
        'Sourced from proven, standardized medicinal plants without synthetic hormones or unnecessary chemical additives.',
      color: 'bg-[#14211F]',
    },
    {
      icon: <Target className="w-6 h-6 text-primary dark:text-primary-light" />,
      title: 'Purposefully Targeted',
      description:
        'Every formulation is engineered for specific physiological pathways: prostate cellular support, hormonal harmony, and cycle comfort.',
      color: 'bg-primary',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-accent dark:text-amber-400" />,
      title: 'Accessible Care',
      description:
        'Direct-to-doorstep reliable delivery across all 36 Nigerian states with dedicated wellness guidance and phone support.',
      color: 'bg-[#291C15]',
    },
  ];

  return (
    <section className="py-20 bg-background border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="A Natural Approach to Better Wellness"
          description="We are building a growing portfolio of products and wellness solutions across areas that matter to the people we serve."
          subtitle="Our Philosophy"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`p-8 rounded-3xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${pillar.color}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white dark:bg-card shadow-sm flex items-center justify-center mb-6">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>


      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[.9fr_1.1fr] lg:px-8 pt-16">
        <motion.div
          {...reveal}
          className="border-l-4 border-[#789445] pl-6"
        >
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#527130]">
            A natural approach
          </p>
          <h2 className="mt-4 text-4xl font-bold leading-tight">
            Better wellness begins with paying attention.
          </h2>
        </motion.div>
        <motion.p
          {...reveal}
          className="self-end text-lg leading-relaxed text-text-muted"
        >
          Wellness is not one-size-fits-all. Holis brings together
          nature, botanical knowledge, and purposeful wellness
          solutions to make natural wellness more accessible and
          easier to incorporate into everyday life.
        </motion.p>
      </div>
    </section>
  );
};

export default HolisApproachSection;
