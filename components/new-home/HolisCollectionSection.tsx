import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, PlusCircle } from 'lucide-react';
import Button from '../Button';
import ProductCard from './ProductCard';
import { productCardsData } from '@/lib/data';
import SectionHeading from '../SectionHeading';

const HolisCollectionSection: React.FC<{ reveal: any }> = ({ reveal }) => {
  return (
    <section id="collection" className="py-24 bg-surface scroll-mt-20">
      <motion.div {...reveal} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Wellness for where you are in life."
          description="Our products are selected with specific wellness needs in mind, giving you options to make informed choices about your personal wellness routine."
          subtitle="Discover the Holis collection"
        />


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 xl:gap-6 ">
          {productCardsData.map((product) => (
            <ProductCard key={product.title} product={product} />
          ))}
        </div>

        {/* More from Holis - Pipeline Teaser */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl bg-primary border border-gray-200 dark:border-gray-800 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                More From Holis, Coming Soon
              </h4>
              <p className="text-sm text-white">
                We are continually exploring new opportunities in botanical wellness, research, product
                development and natural health solutions to build a broader range of products for different
                wellness needs.
              </p>
            </div>
          </div>
          <a href="#community" className="shrink-0">
            <Button variant="outline" size="md" className="gap-2 text-xs bg-transparent text-white! border! border-white! hover:bg-white! hover:text-primary!">
              <PlusCircle className="w-4 h-4" />
              <span>Stay Connected</span>
            </Button>
          </a>
        </motion.div> */}
      </motion.div>
    </section>
  );
};

export default HolisCollectionSection;
