import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
    ArrowRight,
    Check,
    CircleCheck,
    HeartPulse,
    Leaf,
    Moon,
    Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useApp } from "../context/AppContext";
import { MENOSET_NAFDAC_REG_NO, MENOSET_PACKAGES } from "../lib/constants";
import { useSeoMeta } from "../hooks/useSeoMeta";

const productImage =
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=85";

const benefits = [
    [
        "Menstrual cycle support",
        "Herbal support for menstrual regularity and comfort when cycles become unpredictable.",
    ],
    [
        "Mood and emotional support",
        "Support for wellbeing during periods of hormonal fluctuation.",
    ],
    [
        "Hot flash support",
        "Black Cohosh is traditionally used for menopausal symptom support, particularly hot flashes.",
    ],
    [
        "Non-hormonal support",
        "A herbal, non-hormonal option for changing wellness needs.",
    ],
];

const botanicals = [
    [
        "Black Cohosh",
        "Traditionally used for menopausal wellness, particularly hot flashes and mood-related symptoms.",
    ],
    [
        "Dong Quai",
        "Traditionally known as a women's botanical in herbal practices for menstrual and menopausal concerns.",
    ],
    [
        "Vitex agnus-castus",
        "Traditionally used to support menstrual-cycle wellness and PMS-related concerns.",
    ],
    [
        "Blue Cohosh",
        "A botanical traditionally associated with women's menstrual wellness.",
    ],
];

const faqs = [
    [
        "Is Menoset hormone replacement therapy?",
        "No. Menoset is a non-hormonal herbal product, not hormone replacement therapy.",
    ],
    [
        "Who is Menoset for?",
        "Adult women seeking herbal support for menstrual irregularities, menstrual discomfort, or symptoms associated with perimenopause and menopause.",
    ],
    [
        "How do I take Menoset?",
        "Take 1 tablet twice daily, following the directions on the product label. Each pack contains 60 tablets, equivalent to a 30-day supply at the stated dosage.",
    ],
    [
        "Can I take Menoset with other medicines?",
        "If you take prescription medicines, are pregnant or breastfeeding, or have an existing medical condition, speak with your doctor or pharmacist before use.",
    ],
];

const Menoset: React.FC = () => {
    const reduceMotion = useReducedMotion();
    const { addToCart } = useApp();
    const navigate = useNavigate();

    useSeoMeta({
        title: "Menoset Herbal Tablets | Menopause & Menstrual Support",
        description:
            "Menoset is a non-hormonal herbal formula designed to support women experiencing menstrual irregularities, menstrual discomfort, perimenopause and menopause symptoms.",
        keywords: [
            "Menoset",
            "herbal menopause supplement",
            "perimenopause support",
            "non-hormonal menopause supplement",
            "herbal menstrual support",
        ],
        url: "/menoset",
        image: productImage,
        imageAlt: "Menoset herbal tablets placeholder product image",
        type: "product",
    });

    const orderPackage = (packageId: string) => {
        addToCart(packageId);
        navigate("/summary");
    };

    const reveal = reduceMotion
        ? {}
        : {
              initial: { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, margin: "-10%" },
              transition: { duration: 0.55 },
          };

    return (
        <div className="overflow-x-hidden bg-[#fffaf7] text-[#33242d]">
            <section className="relative isolate overflow-hidden bg-[#4e1939] pb-16 pt-32 text-white lg:pb-24">
                <div
                    className="absolute inset-0 opacity-25"
                    style={{
                        backgroundImage:
                            "radial-gradient(#f4cf80 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                    }}
                />
                <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
                    <motion.div {...reveal}>
                        <p className="mb-5 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#f4cf80]">
                            <Leaf className="h-4 w-4" /> Botanical women's
                            wellness
                        </p>
                        <h1 className="max-w-xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                            No more dealing with hot flashes.
                        </h1>
                        <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/85">
                            Feel more comfortable. Feel more balanced. Feel like
                            yourself again.
                        </p>
                        <p className="mt-5 max-w-xl leading-relaxed text-white/75">
                            Menoset is a herbal, non-hormonal formula designed
                            to support women experiencing menstrual
                            irregularities, menstrual discomfort, and symptoms
                            associated with perimenopause and menopause.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Button
                                size="lg"
                                onClick={() => orderPackage("menoset-starter")}
                                className="bg-[#f4cf80] text-[#4e1939]! hover:bg-white"
                            >
                                Order Menoset Now{" "}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Link to="/menoset-check">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-white/70 text-white hover:bg-white/10"
                                >
                                    Take the 60-second check
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div
                        {...reveal}
                        transition={{ duration: 0.65, delay: 0.12 }}
                        className="relative mx-auto w-full max-w-md"
                    >
                        <div
                            className="absolute -inset-5 rounded-full bg-[#d77892]/30 blur-3xl"
                            aria-hidden="true"
                        />
                        <img
                            src={productImage}
                            alt="Temporary Menoset product placeholder"
                            className="relative aspect-square w-full rounded-lg object-cover shadow-2xl"
                        />
                        <p className="mt-3 text-center text-xs text-white/65">
                            Product image placeholder
                        </p>
                    </motion.div>
                </div>
            </section>

            <section
                aria-label="Product credentials"
                className="border-y border-[#ead7df] bg-white py-5"
            >
                <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-8 gap-y-3 px-4 text-sm font-semibold text-[#64254a]">
                    <span className="flex items-center gap-2">
                        <CircleCheck className="h-4 w-4" /> NAFDAC registered:{" "}
                        {MENOSET_NAFDAC_REG_NO}
                    </span>
                    <span className="flex items-center gap-2">
                        <Leaf className="h-4 w-4" /> Herbal product
                    </span>
                    <span className="flex items-center gap-2">
                        <HeartPulse className="h-4 w-4" /> Non-hormonal
                    </span>
                    <span className="flex items-center gap-2">
                        <Check className="h-4 w-4" /> 60 tablets
                    </span>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <motion.div
                    {...reveal}
                    className="grid gap-10 rounded-lg border border-[#ead7df] bg-[#fbeff1] p-8 md:grid-cols-[1.1fr_.9fr] md:p-12"
                >
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9d3d65]">
                            A changing body deserves support
                        </p>
                        <h2 className="mt-3 text-3xl font-bold text-[#4e1939] sm:text-4xl">
                            You do not have to simply put up with it.
                        </h2>
                    </div>
                    <div>
                        <p className="leading-relaxed text-[#624b57]">
                            One month your period is early. The next, it is
                            late. Sleep, mood, comfort, and temperature can all
                            feel less predictable. Every woman's experience is
                            different, and Menoset is formulated to provide
                            herbal support through menstrual changes,
                            perimenopause, and menopause.
                        </p>
                        <Link
                            to="/menoset-check"
                            className="mt-5 inline-flex items-center gap-2 font-bold text-[#8c3058] underline underline-offset-4"
                        >
                            Not sure where to begin? Take the check{" "}
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </motion.div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        {...reveal}
                        className="mx-auto max-w-2xl text-center"
                    >
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9d3d65]">
                            The journey
                        </p>
                        <h2 className="mt-3 text-3xl font-bold text-[#4e1939] sm:text-4xl">
                            What is happening to your body?
                        </h2>
                        <p className="mt-4 leading-relaxed text-[#624b57]">
                            The menopause transition happens gradually. Hormone
                            levels fluctuate and decline over time, which can
                            bring cycle changes and a range of physical and
                            emotional symptoms.
                        </p>
                    </motion.div>
                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {[
                            [
                                "Perimenopause",
                                "The transition toward menopause. You may notice irregular periods, mood changes, discomfort, sleep changes, night sweats, or hot flashes.",
                            ],
                            [
                                "Menopause",
                                "Reached after 12 consecutive months without a menstrual period. Experiences can include hot flashes, night sweats, sleep difficulties, and changes in libido.",
                            ],
                            [
                                "Postmenopause",
                                "The years following menopause, when some symptoms can continue and longer-term wellness considerations become important.",
                            ],
                        ].map(([title, text], index) => (
                            <motion.article
                                {...reveal}
                                transition={{
                                    duration: 0.45,
                                    delay: index * 0.08,
                                }}
                                key={title}
                                className="border-t-4 border-[#d77892] bg-[#fffaf7] p-6"
                            >
                                <span className="text-sm font-bold text-[#9d3d65]">
                                    0{index + 1}
                                </span>
                                <h3 className="mt-4 text-xl font-bold text-[#4e1939]">
                                    {title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-[#624b57]">
                                    {text}
                                </p>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="formula" className="py-20">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                    <motion.div {...reveal}>
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9d3d65]">
                            Herbal support designed for women
                        </p>
                        <h2 className="mt-3 text-3xl font-bold text-[#4e1939] sm:text-4xl">
                            One formula. Multiple stages of a woman's journey.
                        </h2>
                        <p className="mt-5 leading-relaxed text-[#624b57]">
                            Menoset combines Black Cohosh, Dong Quai, Vitex
                            agnus-castus, and Blue Cohosh, botanicals
                            traditionally used and studied in areas of women's
                            menstrual and menopausal wellness.
                        </p>
                        <div className="mt-8 rounded-lg border border-[#ead7df] bg-white p-6">
                            <h3 className="font-bold text-[#4e1939]">
                                Simple. Daily. Consistent.
                            </h3>
                            <dl className="mt-4 space-y-3 text-sm">
                                <div className="flex justify-between gap-4 border-b border-[#f0e5e9] pb-3">
                                    <dt className="text-[#624b57]">Dosage</dt>
                                    <dd className="font-semibold text-right">
                                        1 tablet twice daily
                                    </dd>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <dt className="text-[#624b57]">
                                        Pack size
                                    </dt>
                                    <dd className="font-semibold">
                                        60 tablets / 30 days
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </motion.div>
                    <motion.div
                        {...reveal}
                        className="grid gap-4 sm:grid-cols-2"
                    >
                        {botanicals.map(([name, text]) => (
                            <article
                                key={name}
                                className="border border-[#ead7df] bg-white p-6"
                            >
                                <Leaf className="h-6 w-6 text-[#9d3d65]" />
                                <h3 className="mt-5 text-lg font-bold text-[#4e1939]">
                                    {name}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-[#624b57]">
                                    {text}
                                </p>
                            </article>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="bg-[#fbeff1] py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        {...reveal}
                        className="mx-auto max-w-2xl text-center"
                    >
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9d3d65]">
                            Support for the changes you feel
                        </p>
                        <h2 className="mt-3 text-3xl font-bold text-[#4e1939] sm:text-4xl">
                            Thoughtful support, made for everyday life.
                        </h2>
                    </motion.div>
                    <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {benefits.map(([title, text]) => (
                            <article key={title} className="bg-white p-6">
                                <Sparkles className="h-6 w-6 text-[#9d3d65]" />
                                <h3 className="mt-5 font-bold text-[#4e1939]">
                                    {title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-[#624b57]">
                                    {text}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="pricing" className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <motion.div
                        {...reveal}
                        className="mx-auto max-w-2xl text-center"
                    >
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9d3d65]">
                            Choose your Menoset plan
                        </p>
                        <h2 className="mt-3 text-3xl font-bold text-[#4e1939] sm:text-4xl">
                            A pack that fits your routine and budget.
                        </h2>
                        <p className="mt-4 text-[#624b57]">
                            Bundles provide convenience and savings; they are
                            not a medical recommendation for a specific
                            duration.
                        </p>
                    </motion.div>
                    <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                        {MENOSET_PACKAGES.map((pkg) => (
                            <article
                                key={pkg.id}
                                className={`relative flex min-h-97.5 flex-col border p-6 ${pkg.badge ? "border-[#9d3d65] bg-[#fffaf7]" : "border-[#ead7df] bg-white"}`}
                            >
                                {pkg.badge && (
                                    <span className="-mt-10 mb-6 w-fit bg-[#9d3d65] px-3 py-1 text-xs font-bold text-white">
                                        {pkg.badge}
                                    </span>
                                )}
                                <h3 className="text-xl font-bold text-[#4e1939]">
                                    {pkg.name.replace("Menoset ", "")}
                                </h3>
                                <p className="mt-2 text-sm text-[#624b57]">
                                    {pkg.description}
                                </p>
                                <p className="mt-6 text-3xl font-bold text-[#4e1939]">
                                    ₦{pkg.price.toLocaleString()}
                                </p>
                                {pkg.savingsText && (
                                    <p className="mt-2 text-sm font-bold text-[#24734c]">
                                        {pkg.savingsText}
                                    </p>
                                )}
                                <p className="mt-6 text-sm leading-relaxed text-[#624b57]">
                                    {pkg.usageNote}
                                </p>
                                <Button
                                    fullWidth
                                    onClick={() => orderPackage(pkg.id)}
                                    className="mt-auto bg-[#4e1939] hover:bg-[#6d274e]"
                                >
                                    Select this pack{" "}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[#fbeff1] py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9d3d65]">
                            Sample customer feedback
                        </p>
                        <h2 className="mt-3 text-3xl font-bold text-[#4e1939] sm:text-4xl">
                            Everyday wellness, thoughtfully supported.
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-[#624b57]">
                            Temporary sample copy. This section will be replaced with approved, verified customer feedback before launch.
                        </p>
                    </div>
                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {[
                            ['Amina, Lagos', '“Adding Menoset to my routine felt simple and manageable while I paid closer attention to my wellbeing.”'],
                            ['Ifeoma, Abuja', '“The daily routine fits easily into my schedule, and the product information helped me make an informed choice.”'],
                            ['Tomi, Ibadan', '“I appreciated having a non-hormonal herbal option to consider as my needs changed.”'],
                        ].map(([name, feedback]) => (
                            <blockquote key={name} className="border border-[#ead7df] bg-white p-6">
                                <p className="leading-relaxed text-[#624b57]">{feedback}</p>
                                <footer className="mt-5 text-sm font-bold text-[#4e1939]">{name}</footer>
                            </blockquote>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
                    <motion.div
                        {...reveal}
                        className="bg-[#4e1939] p-8 text-white"
                    >
                        <Moon className="h-8 w-8 text-[#f4cf80]" />
                        <h2 className="mt-6 text-3xl font-bold">
                            Your next chapter deserves support.
                        </h2>
                        <p className="mt-4 leading-relaxed text-white/80">
                            Your cycle may change. Your body may change. But you
                            can still feel like you.
                        </p>
                        <Link to="/menoset-check" className="mt-8 inline-block">
                            <Button className="bg-[#f4cf80] text-[#4e1939]! hover:bg-white">
                                Take the 60-second check
                            </Button>
                        </Link>
                    </motion.div>
                    <motion.div {...reveal}>
                        <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9d3d65]">
                            Common questions
                        </p>
                        <h2 className="mt-3 text-3xl font-bold text-[#4e1939]">
                            Useful information, plainly put.
                        </h2>
                        <div className="mt-7 divide-y divide-[#ead7df] border-y border-[#ead7df]">
                            {faqs.map(([question, answer]) => (
                                <details key={question} className="group py-5">
                                    <summary className="cursor-pointer list-none font-bold text-[#4e1939]">
                                        {question}
                                        <span className="float-right text-[#9d3d65] group-open:rotate-45">
                                            +
                                        </span>
                                    </summary>
                                    <p className="pr-8 pt-3 text-sm leading-relaxed text-[#624b57]">
                                        {answer}
                                    </p>
                                </details>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="border-t border-[#ead7df] bg-white px-4 py-8 text-center text-xs leading-relaxed text-[#624b57]">
                <p className="mx-auto max-w-4xl">
                    Menoset is a herbal product for general wellness support. It
                    is not a substitute for diagnosis or medical treatment. Read
                    the product label and use as directed. If you are pregnant,
                    breastfeeding, taking medication, or have a medical
                    condition, consult a healthcare professional before use.
                    Individual experiences may vary.
                </p>
            </section>
        </div>
    );
};

export default Menoset;
