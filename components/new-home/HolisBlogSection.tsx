import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { BlogPost } from '../../lib/blogData';
import BlogCard from '../blog/BlogCard';
import BlogCardSkeleton from '../skeleton-loaders/blog/BlogCardSkeleton';
import { API_BASE } from '../../lib/constants';
import SectionHeading from '../SectionHeading';

const HolisBlogSection: React.FC<{ reveal: any }> = ({ reveal }) => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        fetch(`${API_BASE}/api/blog`)
            .then((r) => (r.ok ? r.json() : []))
            .then((data: BlogPost[]) => {
                const list = Array.isArray(data) ? data : [];
                // Sort descending by date/createdAt to guarantee most recent posts are first
                const sorted = [...list].sort((a, b) => {
                    const timeA = a.createdAt ? new Date(a.createdAt).getTime() : (a.date ? new Date(a.date).getTime() : 0);
                    const timeB = b.createdAt ? new Date(b.createdAt).getTime() : (b.date ? new Date(b.date).getTime() : 0);
                    return timeB - timeA;
                });
                setPosts(sorted.slice(0, 3));
            })
            .catch(() => {
                setPosts([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <section className="py-24 bg-white dark:bg-card/40 border-t border-gray-100 dark:border-gray-800">
            <motion.div {...reveal} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div className='max-w-2xl'>
                        <span className="text-xs font-bold uppercase tracking-wider text-accent mb-3 block">
                            The Holis Journal
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                            Wellness begins with understanding
                        </h2>
                        <p className="mt-6 leading-relaxed text-[#496158]">
                            Explore practical information, botanical insights and conversations around women's wellness, men's wellness, nutrition, lifestyle and natural approaches to wellbeing.
                        </p>
                    </div>

                    {/* <SectionHeading
                        title="Wellness begins with understanding"
                        description="Explore practical information, botanical insights and conversations around women's wellness, men's wellness, nutrition, lifestyle and natural approaches to wellbeing."
                        subtitle="The Holis Journal"
                    /> */}

                    <Link
                        to="/blog"
                        className="group relative inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-dark transition-colors pb-1 focus-visible:outline-none"
                    >
                        <span>Visit the Wellness Journal</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 group-focus-visible:translate-x-1 transition-transform duration-300" />
                        <span
                            aria-hidden="true"
                            className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full group-focus-visible:w-full group-focus:w-full transition-all duration-300 ease-out"
                        />
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <BlogCardSkeleton key={i} />
                        ))}
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        <p className="text-sm">No articles available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post, index) => (
                            <BlogCard
                                key={post.slug}
                                post={post}
                                delay={index * 0.08}
                                onDeleted={(slug) => setPosts(prev => prev.filter(p => p.slug !== slug))}
                            />
                        ))}
                    </div>
                )}
            </motion.div>
        </section>
    );
};

export default HolisBlogSection;
