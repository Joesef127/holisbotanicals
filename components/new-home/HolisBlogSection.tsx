import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';

const HolisBlogSection: React.FC<{ reveal: any }> = ({ reveal }) => {
    const articles = [
        {
            title: 'Navigating Hormonal Transitions & Hot Flashes with Natural Botanicals',
            category: "Women's Health",
            readTime: '4 min read',
            excerpt: 'Discover how non-hormonal plant extracts like Black Cohosh and Vitex help soothe night sweats and regulate cycle rhythm.',
            link: '/blog',
        },
        {
            title: 'The Science of Prostate Wellness: Reducing Night-Time Bathroom Urgency',
            category: "Men's Health",
            readTime: '5 min read',
            excerpt: 'Understanding the role of 5-alpha reductase and how saw palmetto and chimaphila support healthy urinary flow.',
            link: '/blog',
        },
        {
            title: 'Why Standardized Botanical Extracts Deliver Predictable Health Outcomes',
            category: 'Botanical Science',
            readTime: '3 min read',
            excerpt: 'The critical difference between raw ground herbs and high-potency standardized phytochemical formulations.',
            link: '/blog',
        },
    ];

    return (
        <section className="py-24 bg-white dark:bg-card/40 border-t border-gray-100 dark:border-gray-800">
            <motion.div {...reveal} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-accent mb-3 block">
                            Knowledge &amp; Research
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                            The Holis Journal
                        </h2>
                    </div>
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-dark transition-colors"
                    >
                        <span>Read All Articles</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <motion.div
                            key={article.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                to={article.link}
                                className="group block h-full p-6 sm:p-8 rounded-3xl bg-gray-50 dark:bg-card border border-gray-100 dark:border-gray-800 hover:border-primary/30 hover:shadow-xl transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                                        <span className="font-semibold uppercase tracking-wider text-accent">
                                            {article.category}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {article.readTime}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors mb-3 leading-snug">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {article.excerpt}
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-200/60 dark:border-gray-800/80 flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                                    <span>Read Article</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default HolisBlogSection;
