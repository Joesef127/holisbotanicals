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
import HolisBotanicalKnowledgeSection from "./HolisBotanicalKnowledge";
import HolisCommunitySection from "./HolisCommunity";


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
            <WhyHolis reveal={reveal} />
            <HolisBotanicalKnowledgeSection />
            <HolisBlogSection reveal={reveal} />
            {/* <HolisCommunitySection /> */}
        </div>
    );
};

export default HolisHome;
