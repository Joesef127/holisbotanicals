import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Beaker, BookOpen, Leaf, Sprout } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../Button";

const images = {
    hero: "https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=1800&q=85",
    menoset:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85",
    prostanone:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=85",
};

const ProductCard: React.FC<{
    name: string;
    type: string;
    copy: string;
    image: string;
    to: string;
    rose?: boolean;
}> = ({ name, type, copy, image, to, rose }) => (
    <article className="group grid overflow-hidden border border-[#d7e0ca] bg-[#f8faf5] sm:grid-cols-2">
        <img
            src={image}
            alt={`Temporary ${name} product placeholder`}
            className="min-h-72 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="flex flex-col p-7">
            <p
                className={`text-sm font-bold uppercase tracking-[0.13em] ${rose ? "text-[#9d3d65]" : "text-[#527130]"}`}
            >
                {type}
            </p>
            <h3 className="mt-4 text-3xl font-bold text-[#18352c]">{name}</h3>
            <p className="mt-4 leading-relaxed text-[#496158]">{copy}</p>
            <Link
                to={to}
                className="mt-7 inline-flex items-center gap-2 font-bold text-[#365d39] underline underline-offset-4"
            >
                Discover {name} <ArrowRight className="h-4 w-4" />
            </Link>
        </div>
    </article>
);

const HolisHome: React.FC = () => {
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
        <div className="overflow-x-hidden bg-[#f8faf5] text-[#18352c]">
            <section className="relative isolate flex min-h-180 items-end overflow-hidden px-4 pb-16 pt-32 sm:px-6 sm:pb-24 lg:px-8">
                <img
                    src={images.hero}
                    alt="Lush greenery representing botanical wellness"
                    className="absolute inset-0 -z-20 h-full w-full object-cover"
                />
                <div className="absolute inset-0 -z-10 bg-[#102d24]/75" />
                <motion.div
                    {...reveal}
                    className="mx-auto w-full max-w-7xl text-white"
                >
                    <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#cbdc89]">
                        <Sprout className="h-4 w-4" /> Holis Botanicals
                    </p>
                    <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
                        Wellness, rooted in nature.
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">
                        Thoughtfully sourced botanical wellness products for the
                        needs of modern life.
                    </p>
                    <p className="mt-4 max-w-2xl leading-relaxed text-white/75">
                        We connect people with carefully selected herbal and
                        botanical solutions designed around real wellness needs.
                    </p>
                    <Link to="#collection" className="mt-8 inline-block">
                        <Button
                            size="lg"
                                className="bg-[#cbdc89] text-[#18352c]! hover:bg-white"
                        >
                            Explore our products{" "}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </motion.div>
            </section>
            <section className="py-20">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[.9fr_1.1fr] lg:px-8">
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
                        className="self-end text-lg leading-relaxed text-[#496158]"
                    >
                        Wellness is not one-size-fits-all. Holis brings together
                        nature, botanical knowledge, and purposeful wellness
                        solutions to make natural wellness more accessible and
                        easier to incorporate into everyday life.
                    </motion.p>
                </div>
            </section>
            <section id="collection" className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div {...reveal} className="max-w-2xl">
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#527130]">
                            Discover the Holis collection
                        </p>
                        <h2 className="mt-4 text-4xl font-bold">
                            Wellness for where you are in life.
                        </h2>
                        <p className="mt-4 leading-relaxed text-[#496158]">
                            Our products are selected with specific wellness
                            needs in mind, giving you options to make informed
                            choices about your personal wellness routine.
                        </p>
                    </motion.div>
                    <div className="mt-12 grid gap-6 md:grid-cols-2">
                        <ProductCard
                            name="Menoset"
                            type="Women's menstrual wellness"
                            copy="A botanical wellness product formulated to support women's menstrual wellbeing and complement your personal wellness routine."
                            image={images.menoset}
                            to="/menoset"
                            rose
                        />
                        <ProductCard
                            name="Prostanone"
                            type="Men's prostate and urinary wellness"
                            copy="A botanical wellness product formulated with men's prostate and urinary wellbeing in mind."
                            image={images.prostanone}
                            to="/prostanone"
                        />
                    </div>
                </div>
            </section>
            <section className="py-20">
                <div className="mx-auto grid max-w-7xl gap-8 bg-[#18352c] p-8 text-white md:grid-cols-[1fr_.8fr] md:p-12">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#cbdc89]">
                            More from Holis, coming soon
                        </p>
                        <h2 className="mt-4 text-4xl font-bold">
                            Building a broader botanical wellness future.
                        </h2>
                        <p className="mt-5 max-w-2xl leading-relaxed text-white/75">
                            Our vision goes beyond the products you see today.
                            We are exploring research, product development,
                            natural health solutions, supply, and distribution
                            to build a broader range for changing wellness
                            needs.
                        </p>
                    </div>
                    <Beaker className="h-24 w-24 self-end justify-self-end text-[#cbdc89]" />
                </div>
            </section>
            <section className="bg-[#eef3e7] py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#527130]">
                            Why Holis
                        </p>
                        <h2 className="mt-4 text-4xl font-bold">
                            A thoughtful way forward.
                        </h2>
                    </div>
                    <div className="mt-12 grid gap-px bg-[#ccd8bc] sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            [
                                "Inspired by nature",
                                "Plants and botanicals have an important place in modern wellness.",
                            ],
                            [
                                "Purpose driven",
                                "Every product has a clear wellness purpose.",
                            ],
                            [
                                "Quality conscious",
                                "We care about what goes into the products we offer.",
                            ],
                            [
                                "Growing with you",
                                "A long-term vision for botanical wellness.",
                            ],
                        ].map(([title, copy]) => (
                            <article key={title} className="bg-[#eef3e7] p-7">
                                <Leaf className="h-6 w-6 text-[#527130]" />
                                <h3 className="mt-5 text-xl font-bold">
                                    {title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-[#496158]">
                                    {copy}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
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
