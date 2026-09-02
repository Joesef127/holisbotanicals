import React from 'react';
import { useSeoMeta } from '../hooks/useSeoMeta';
import { PAGE_URLS, generateSchema, SITE_CONFIG, getFullUrl } from '../lib/seo';
import HolisHome from '../components/home/HolisHome';

const Home: React.FC = () => {
  // SEO configuration for home page
  useSeoMeta(
    {
      title: 'Holis Botanicals | Wellness, Rooted in Nature',
      description: 'Thoughtfully sourced botanical wellness products for the needs of modern life.',
      keywords: [
        'botanical wellness',
        "women's wellness",
        "men's wellness",
      ],
      url: PAGE_URLS.home,
      image: SITE_CONFIG.defaultImage,
      imageAlt: 'Holis botanical wellness',
      type: 'website',
    },
    {
      schema: generateSchema('WebSite', {
        name: 'Holis Botanicals',
        url: SITE_CONFIG.domain,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: getFullUrl('/?q={search_term_string}'),
          },
          'query-input': 'required name=search_term_string',
        },
      }),
    },
  );

  return (
    <HolisHome />
  );
};

export default Home;
