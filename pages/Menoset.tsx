import React from 'react';
import { useSeoMeta } from '../hooks/useSeoMeta';
import { generateProductSchema, SITE_CONFIG } from '../lib/seo';
import { images } from '@/lib';

// Menoset Modular Sections
import MenosetHeroSection from '@/components/menoset/MenosetHeroSection';
import MenosetTrustBar from '@/components/menoset/MenosetTrustBar';
import MenosetAssessmentTeaser from '@/components/menoset/MenosetAssessmentTeaser';
import MenosetProblemSection from '@/components/menoset/MenosetProblemSection';
import MenosetJourneySection from '@/components/menoset/MenosetJourneySection';
import MenosetProductShowcase from '@/components/menoset/MenosetProductShowcase';
import MenosetIngredientsSection from '@/components/menoset/MenosetIngredientsSection';
import MenosetUsageSection from '@/components/menoset/MenosetUsageSection';
import MenosetPricingSection from '@/components/menoset/MenosetPricingSection';
import MenosetWhySection from '@/components/menoset/MenosetWhySection';
import MenosetTestimonialsSection from '@/components/menoset/MenosetTestimonialsSection';
import MenosetFAQSection from '@/components/menoset/MenosetFAQSection';
import MenosetFinalCTA from '@/components/menoset/MenosetFinalCTA';

const Menoset: React.FC = () => {
  // SEO & JSON-LD Meta from PDF Section 14
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
      url: '/menoset',
      image: images.menoset,
      imageAlt: 'Menoset Herbal Tablets for Women',
      type: 'product',
    },
    {
      schema: generateProductSchema({
        name: 'Menoset Herbal Tablets',
        description:
          'Menoset is a non-hormonal herbal formula designed to support women experiencing menstrual irregularities, menstrual discomfort, perimenopause and menopause symptoms including hot flashes and mood changes.',
        brand: 'Menoset',
        manufacturer: 'Holis Botanical Gardens',
        image: SITE_CONFIG.logo,
        price: 15000,
        currency: 'NGN',
        availability: 'https://schema.org/InStock',
      }),
    }
  );

  return (
    <div className="overflow-x-hidden selection:bg-[#9d3d65] selection:text-white">
      {/* 1. Hero Section (PDF Section 1) with Parallax */}
      <MenosetHeroSection />

      {/* 2. Trust Credentials Ribbon */}
      <MenosetTrustBar />

      {/* 3. Quick Assessment Teaser with Interactive Preview (PDF Section 2) */}
      <MenosetAssessmentTeaser />

      {/* 4. The Problem: "Your Body Is Changing" (PDF Section 3) */}
      <MenosetProblemSection />

      {/* 5. The Journey: Interactive Lifecycle Stage Explorer (PDF Section 4) */}
      <MenosetJourneySection />

      {/* 6. Product Showcase & Image Gallery (PDF Section 5) */}
      <MenosetProductShowcase />

      {/* 7. The Composition: Interactive Botanical Lab & Key Benefits (PDF Section 6 & 7) */}
      <MenosetIngredientsSection />

      {/* 8. How to Use: Simple. Daily. Consistent. (PDF Section 8) */}
      <MenosetUsageSection />

      {/* 9. Pricing & Bundles Modern Grid (PDF Section 9) */}
      <MenosetPricingSection />

      {/* 10. Why Women Choose Menoset (PDF Section 10) */}
      <MenosetWhySection />

      {/* 11. Social Proof & Verified Feedback (PDF Section 11) */}
      <MenosetTestimonialsSection />

      {/* 12. Expandable Accordion FAQs (PDF Section 12) */}
      <MenosetFAQSection />

      {/* 13. Final CTA & Regulatory Compliance (PDF Section 13 & 15) */}
      <MenosetFinalCTA />
    </div>
  );
};

export default Menoset;
