import React from "react";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { HeroSection } from "./HeroSection";
import HolisApproachSection from "./HolisApproachSection";
import HolisCollectionSection from "./HolisCollectionSection";
import WhyHolis from "./WhyHolis";
import HolisBlogSection from "./HolisBlogSection";
import HolisMore from "./HolisMore";


const HolisHome: React.FC = () => {

    const { scrollY } = useScroll();
    const bgY = useTransform(scrollY, [0, 600], ['0%', '20%']);
    const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

    const reduceMotion = useReducedMotion();
    const reveal = reduceMotion
        ? {}
        : {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-10%" },
            transition: { duration: 0.55 },
        };
    return (
        <div className="overflow-x-hidden bg-[#f8faf5]">
            <HeroSection reveal={reveal} />
            <HolisApproachSection reveal={reveal} />
            <HolisCollectionSection reveal={reveal} />
            <HolisMore reveal={reveal} />
            <HolisBlogSection reveal={reveal}/>
            <WhyHolis reveal={reveal} />

            

            <section className="py-20">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#527130]">
                            From botanical knowledge to everyday wellness
                        </p>
                        <h2 className="mt-4 text-4xl font-bold leading-tight">
                            A modern connection to the wisdom of plants.
                        </h2>
                        <p className="mt-6 leading-relaxed text-[#496158]">
                            For generations, people have looked to plants as
                            part of their approach to wellbeing. At Holis, we
                            see an opportunity to bring that connection into
                            modern life, thoughtfully.
                        </p>
                    </div>
                    <div className="border border-[#d7e0ca] bg-white p-8">
                        <BookOpen className="h-8 w-8 text-[#527130]" />
                        <h3 className="mt-6 text-2xl font-bold">
                            The Holis Journal
                        </h3>
                        <p className="mt-3 leading-relaxed text-[#496158]">
                            Know your body. Understand your wellness. Explore
                            practical information, botanical insights, and
                            conversations around wellness.
                        </p>
                        <Link
                            to="/blog"
                            className="mt-6 inline-flex items-center gap-2 font-bold text-[#365d39] underline underline-offset-4"
                        >
                            Visit the wellness journal{" "}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default HolisHome;
