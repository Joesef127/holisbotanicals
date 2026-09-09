import React from 'react';
import { useSeoMeta } from '../hooks/useSeoMeta';
import { PAGE_URLS, generateProductSchema, generateFAQSchema, SITE_CONFIG } from '../lib/seo';
import { images } from '@/lib';

import MenosetHeroSection from '../components/menoset/MenosetHeroSection';
import MenosetTrustBar from '../components/menoset/MenosetTrustBar';
import MenosetAssessmentTeaser from '../components/menoset/MenosetAssessmentTeaser';
import MenosetProblemSection from '../components/menoset/MenosetProblemSection';
import MenosetJourneySection from '../components/menoset/MenosetJourneySection';
import MenosetFormulaSection from '../components/menoset/MenosetFormulaSection';
import MenosetBenefitsSection from '../components/menoset/MenosetBenefitsSection';
import MenosetHowToUse from '../components/menoset/MenosetHowToUse';
import MenosetWhyChooseSection from '../components/menoset/MenosetWhyChooseSection';
import MenosetPricingSection from '../components/menoset/MenosetPricingSection';
import MenosetSocialProof from '../components/menoset/MenosetSocialProof';
import MenosetFAQSection from '../components/menoset/MenosetFAQSection';
import MenosetFinalCTA from '../components/menoset/MenosetFinalCTA';
import MenosetComplianceNotice from '../components/menoset/MenosetComplianceNotice';

const MENOSET_FAQS = [
  {
    question: 'Is Menoset a hormone replacement therapy?',
    answer: 'No. Menoset is a non-hormonal herbal product, not hormone replacement therapy.',
  },
  {
    question: 'Who is Menoset for?',
    answer: 'Adult women seeking herbal support for menstrual irregularities, menstrual discomfort or symptoms associated with perimenopause and menopause.',
  },
  {
    question: 'What symptoms does Menoset support?',
    answer: 'The product is positioned to support menstrual irregularities and discomfort, mood changes, hot flashes and other symptoms associated with the menstrual and menopause transition.',
  },
  {
    question: 'How do I take Menoset?',
    answer: '1 tablet twice daily, following the directions on the product label.',
  },
  {
    question: 'How many tablets are in a pack?',
    answer: '60 tablets, equivalent to a 30-day supply at the stated dosage.',
  },
  {
    question: 'Can I take Menoset with other medicines?',
    answer: 'If you take prescription medicines, are pregnant or breastfeeding, or have an existing medical condition, speak with your doctor or pharmacist before use.',
  },
  {
    question: 'Is Menoset a medical treatment?',
    answer: "No. It is a herbal product intended to support women's wellness. It is not a substitute for diagnosis or medical treatment.",
  },
];

const Menoset: React.FC = () => {
  // Official SEO Metadata from Website Content Document Section 14
  useSeoMeta(
    {
      title: 'Menoset Herbal Tablets | Menopause & Menstrual Support',
      description:
        'Menoset is a non-hormonal herbal formula designed to support women experiencing menstrual irregularities, menstrual discomfort, perimenopause and menopause symptoms including hot flashes and mood changes.',
      keywords: [
        'Menoset',
        'herbal menopause supplement',
        'menopause support',
        'perimenopause support',
        'natural hot flash support',
        'menstrual irregularity support',
        'non-hormonal menopause supplement',
        'herbal menstrual support',
        'menopause tablets Nigeria',
      ],
      url: PAGE_URLS.menoset,
      image: images.menoset,
      imageAlt: 'Menoset Herbal Tablets for Menopause and Menstrual Support',
      type: 'product',
    },
    {
      schema: {
        '@context': 'https://schema.org',
        '@graph': [
          generateProductSchema({
            name: 'Menoset Herbal Tablets',
            description:
              'A non-hormonal herbal formula combining Black Cohosh, Dong Quai, Vitex agnus-castus, and Blue Cohosh to support menstrual cycle regularity, hot flashes, and menopausal wellness.',
            brand: 'Menoset',
            manufacturer: 'Holis Botanical Gardens',
            image: SITE_CONFIG.logo,
            price: 15000,
            currency: 'NGN',
            availability: 'https://schema.org/InStock',
          }),
          generateFAQSchema(MENOSET_FAQS),
        ],
      },
    }
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-text selection:bg-accent selection:text-text">
      <MenosetHeroSection />
      <MenosetTrustBar />
      <MenosetAssessmentTeaser />
      <MenosetProblemSection />
      <MenosetJourneySection />
      <MenosetFormulaSection />
      <MenosetBenefitsSection />
      <MenosetHowToUse />
      <MenosetPricingSection />
      <MenosetWhyChooseSection />
      <MenosetSocialProof />
      <MenosetFAQSection />
      <MenosetFinalCTA />
      {/* <MenosetComplianceNotice /> */}
    </div>
  );
};

export default Menoset;
