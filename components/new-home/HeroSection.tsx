import { motion } from "framer-motion";
import { Sprout, ArrowRight, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { images } from "@/lib";


export const HeroSection: React.FC<{reveal: any}> = ({reveal}) => {
    return (

<section className="relative isolate flex min-h-screen items-center justify-start overflow-hidden px-4 pb-16 pt-32 sm:px-6 sm:pb-24 lg:px-8">
    <motion.div>
        <img
            src={images.holis_hero}
            alt="Lush greenery representing botanical wellness"
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            loading="eager"
        />
    </motion.div>

    <div className="absolute inset-0 -z-10 bg-[#102d24]/60" />

    <motion.div {...reveal} className="mx-auto w-fit text-white text-center flex flex-col items-center justify-center">
        <p className="flex items-center gap-2 text-sm sm:text-base font-bold uppercase tracking-[0.18em] text-[#cbdc89]">
            <Sprout className="h-4 w-4" /> Holis Botanicals
        </p>
        <h1 className="mt-5 max-w-2xl text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            Wellness, Rooted in Nature.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
        Thoughtfully sourced botanical wellness products for the needs of modern life.
        </p>
        <p className="max-w-2xl text-lg leading-relaxed text-white/75">
            We connect people with carefully selected herbal and
            botanical solutions designed around real wellness needs.
        </p>
                <Button
                    size="md"
                    variant="hero"
                    className="mt-8"
                    onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    Explore our products <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

    </motion.div>

            {/* Visual Showcase Card */}
            {/* <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
                className="lg:col-span-5 relative"
            >
                <div className="relative rounded-3xl bg-white dark:bg-card border border-gray-100 dark:border-gray-800 shadow-2xl p-6 sm:p-8 overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-accent/10 blur-2xl" />

                    <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">The Holis Standard</span>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/15 text-accent">Two Targeted Formulas</span>
                    </div>

                    <div className="space-y-4 mb-6">
                        <Link
                            to="/menoset"
                            className="group block p-4 rounded-2xl bg-gradient-to-r from-rose-500/5 to-amber-500/5 border border-rose-500/15 hover:border-rose-500/40 transition-all hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                                                Menoset
                                            </h3>
                                            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400 font-semibold">
                                                Women
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Menstrual comfort & hot flash transition relief
                                        </p>
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>

                        <Link
                            to="/prostanone"
                            className="group block p-4 rounded-2xl bg-gradient-to-r from-emerald-500/5 to-primary/5 border border-primary/15 hover:border-primary/40 transition-all hover:shadow-md"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                        <ShieldCheck className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                                                Prostanone
                                            </h3>
                                            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary font-semibold">
                                                Men
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            Prostate wellness & steady urinary comfort
                                        </p>
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>
                    </div>

                    <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-800/60 text-xs text-gray-600 dark:text-gray-300 flex items-center gap-2.5">
                        <HeartPulse className="w-4 h-4 text-accent shrink-0" />
                        <span>Standardized botanical extracts crafted for real daily results.</span>
                    </div>
                </div>
            </motion.div> */}
</section>

    );
};
