import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    Activity,
    ArrowRight,
    CheckCircle2,
    Clock,
    Leaf,
    Shield,
    ShieldAlert,
    Sparkles,
} from "lucide-react";
import Button from "../components/Button";
import { MENOSET_NAFDAC_REG_NO, MENOSET_PACKAGES } from "../lib/constants";
import { useApp } from "../context/AppContext";
import { useSeoMeta } from "../hooks/useSeoMeta";

type Answers = Record<string, string | string[]>;

const frequencyWeight: Record<string, number> = {
    Occasionally: 0,
    "A few times a month": 1,
    "Several times a week": 2,
    "Almost every day": 3,
    "They significantly affect my daily life": 4,
};

interface ProtocolResult {
    symptoms: string[];
    cycle: string;
    pack: (typeof MENOSET_PACKAGES)[number];
    title: string;
    copy: string;
    level: string;
    levelColor: string;
    focusAreas: string[];
    timeline: Array<{ label: string; height: number; text: string }>;
}

function resultFor(answers: Answers): ProtocolResult {
    const symptoms = (answers.symptoms as string[] | undefined) ?? [];
    const priority = (answers.priority as string | undefined) ?? "";
    const cycle = (answers.cycle as string | undefined) ?? "Not specified";
    const freq = (answers.frequency as string | undefined) ?? "Occasionally";
    const weight = frequencyWeight[freq] ?? 0;

    const isMulti = symptoms.length >= 5 || priority === "Several symptoms";
    const isHotFlash =
        symptoms.includes("Hot flashes") ||
        symptoms.includes("Night sweats") ||
        priority === "Hot flashes and night sweats";
    const isTransition =
        cycle === "My periods have stopped" ||
        cycle === "My periods have changed significantly" ||
        priority === "General menopause support";

    let packageId = "menoset-essentials";
    let level = "Targeted Balance";
    let levelColor = "text-[#9d3d65]";
    let title = "Your Targeted Menoset Protocol";
    let copy =
        "Based on your symptoms and cycle responses, we have formulated a botanical routine to restore hormonal harmony, monthly comfort, and calm.";

    if (isMulti || weight >= 3) {
        packageId = "menoset-wellness";
        level = "Comprehensive Care";
        levelColor = "text-[#8c3058]";
        title = "Your Comprehensive Menoset Protocol";
        copy =
            "You selected several recurring changes, suggesting that a broader, sustained multi-botanical routine is best suited to stabilize your cycle and daily comfort.";
    } else if (isHotFlash) {
        packageId = weight >= 2 ? "menoset-wellness" : "menoset-essentials";
        level = "Temperature & Comfort Protocol";
        levelColor = "text-[#9d3d65]";
        title = "Hot Flash & Temperature Relief Protocol";
        copy =
            "Your profile highlights temperature fluctuations and night sweats. Menoset incorporates Black Cohosh and Dong Quai, traditionally revered for thermal balance.";
    } else if (isTransition) {
        packageId = "menoset-essentials";
        level = "Menopause Transition Protocol";
        levelColor = "text-primary";
        title = "Menopause Transition Support Protocol";
        copy =
            "Your answers indicate you are navigating the natural transition of perimenopause or menopause. Menoset provides non-hormonal, botanical nourishment throughout this stage.";
    } else if (weight <= 1 && symptoms.length <= 2) {
        packageId = "menoset-starter";
        level = "Gentle Starter Protocol";
        levelColor = "text-[#9d3d65]";
        title = "Foundational Menstrual Comfort Protocol";
        copy =
            "Your symptoms appear occasional. A foundational monthly routine can help support regular cycles and ease occasional cramps.";
    }

    const pack =
        MENOSET_PACKAGES.find((item) => item.id === packageId) ||
        MENOSET_PACKAGES[1];

    // Determine tailored focus areas
    const focusAreas: string[] = [];
    if (isHotFlash) {
        focusAreas.push("Hot flash ease & natural temperature regulation");
    }
    if (
        symptoms.includes("Mood changes") ||
        symptoms.includes("Irritability or stress")
    ) {
        focusAreas.push("Emotional equilibrium, stress resilience & calming support");
    }
    if (
        symptoms.includes("Menstrual cramps or discomfort") ||
        symptoms.includes("Irregular periods")
    ) {
        focusAreas.push("Smoother monthly cycle flow & pelvic comfort");
    }
    if (symptoms.includes("Sleep difficulties")) {
        focusAreas.push("Restorative night rest & uninterrupted sleep cycles");
    }
    if (focusAreas.length < 3) {
        focusAreas.push("Non-hormonal herbal wellness for daily vitality");
    }
    if (focusAreas.length < 3) {
        focusAreas.push("Holistic nourishment powered by 4 standardized botanicals");
    }

    // Determine timeline milestones
    let timeline: Array<{ label: string; height: number; text: string }>;
    if (pack.id === "menoset-wellness") {
        timeline = [
            { label: "Month 1", height: 25, text: "Adaptation" },
            { label: "Month 2", height: 50, text: "Relief" },
            { label: "Month 4", height: 75, text: "Balance" },
            { label: "Month 6", height: 95, text: "Optimal" },
        ];
    } else if (pack.id === "menoset-starter") {
        timeline = [
            { label: "Week 1", height: 25, text: "Start" },
            { label: "Week 2", height: 50, text: "Uptake" },
            { label: "Week 3", height: 75, text: "Calm" },
            { label: "Week 4", height: 95, text: "Relief" },
        ];
    } else {
        timeline = [
            { label: "Week 1", height: 20, text: "Start" },
            { label: "Week 4", height: 45, text: "Easing" },
            { label: "Week 8", height: 75, text: "Balance" },
            { label: "Week 12", height: 95, text: "Optimal" },
        ];
    }

    return {
        symptoms,
        cycle,
        pack,
        title,
        copy,
        level,
        levelColor,
        focusAreas,
        timeline,
    };
}

const MenosetResults: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addToCart } = useApp();
    const answers = (location.state as { answers?: Answers } | null)?.answers;

    useSeoMeta({
        title: "Your Menoset Support Profile - Personalized Recommendation",
        description:
            "View your tailored herbal protocol and personalized Menoset guidance.",
        url: "/menoset-results",
        robots: "noindex",
    });

    useEffect(() => {
        if (!answers) {
            navigate("/menoset-check", { replace: true });
        }
    }, [answers, navigate]);

    if (!answers) return null;

    const result = resultFor(answers);

    const handleClaim = () => {
        addToCart(result.pack.id);
        navigate("/summary");
    };

    return (
        <div className="min-h-screen bg-background px-4 pb-16 pt-24 sm:pt-28">
            <div className="mx-auto max-w-5xl">
                {/* Header section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/60 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#9d3d65]">
                        Assessment Complete
                    </span>
                    <h1 className="mb-4 text-3xl max-w-3xl mx-auto font-bold text-primary md:text-5xl">
                        Your Recommended Support is{" "}
                        <span className={result.levelColor}>
                            {result.level}
                        </span>
                    </h1>
                    <p className="mx-auto max-w-2xl text-sm md:text-base leading-relaxed text-text-muted">
                        {result.copy}
                    </p>
                </motion.div>

                {/* 2-Column Cards Grid */}
                <div className="grid items-start gap-8 md:grid-cols-2">
                    {/* Left Card: Analysis & Projected Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-3xl border border-primary/40 bg-white p-6 sm:p-8 shadow-lg"
                    >
                        <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-primary">
                            <Leaf className="h-5 w-5 text-[#9d3d65]" />{" "}
                            Personalized Analysis
                        </h3>

                        <div className="space-y-6">
                            {/* Selected Symptoms Chips */}
                            <div>
                                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-text-muted">
                                    Reported Indicators & Cycle
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-lg border border-primary bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary">
                                        Cycle: {result.cycle}
                                    </span>
                                    {result.symptoms.length > 0 ? (
                                        result.symptoms.map((symptom) => (
                                            <span
                                                key={symptom}
                                                className="rounded-lg border border-primary bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary"
                                            >
                                                {symptom}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="rounded-lg bg-[#fbeff1] px-3 py-1.5 text-xs text-[#6d274e]">
                                            General Wellness
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* What this protocol targets */}
                            <div className="rounded-2xl pt-3">
                                <h4 className="mb-3 text-sm font-bold text-primary">
                                    What this protocol targets for you:
                                </h4>
                                <ul className="space-y-2.5 text-sm">
                                    {result.focusAreas.map((item, index) => (
                                        <li
                                            key={index}
                                            className="flex items-start gap-2.5 text-text-muted"
                                        >
                                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#9d3d65]" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Projected Wellness Trajectory Chart */}
                            <div className="border-t border-[#ead7df]/60 pt-6">
                                <div className="mb-5 flex items-center gap-2.5">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#fbeff1] text-[#9d3d65]">
                                        <Activity size={16} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-primary">
                                            Projected Wellness Trajectory
                                        </h4>
                                        <p className="text-xs text-text-muted">
                                            Estimated hormonal balance progression
                                        </p>
                                    </div>
                                </div>

                                <div className="relative flex h-52 items-end justify-between gap-3 overflow-hidden rounded-2xl border border-primary/20 bg-primary/10 p-6">
                                    {/* Subtle grid lines aligned to bar track area */}
                                    <div className="pointer-events-none absolute inset-x-6 top-6 bottom-12 flex flex-col justify-between opacity-35">
                                        <div className="h-px w-full border-t border-dashed border-primary" />
                                        <div className="h-px w-full border-t border-dashed border-primary" />
                                        <div className="h-px w-full border-t border-dashed border-primary" />
                                    </div>

                                    {result.timeline.map((bar, i) => (
                                        <div
                                            key={i}
                                            className="z-10 flex h-full w-1/4 flex-col items-center justify-end gap-2"
                                        >
                                            {/* Bar Track with explicit height so percentage height animates correctly */}
                                            <div className="relative flex h-32 w-full items-end justify-center">
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{
                                                        height: `${bar.height}%`,
                                                    }}
                                                    transition={{
                                                        duration: 0.8,
                                                        delay: i * 0.15,
                                                        ease: "easeOut",
                                                    }}
                                                    className="group relative w-full rounded-t-lg bg-gradient-to-t from-[#9d3d65] to-primary shadow-sm hover:opacity-90"
                                                >
                                                    {/* Tooltip on hover */}
                                                    <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-primary px-2 py-1 text-[10px] font-semibold text-[#f4cf80] opacity-0 shadow-md transition-opacity group-hover:opacity-100">
                                                        {bar.text}
                                                    </div>
                                                </motion.div>
                                            </div>
                                            <span className="text-center text-xs font-semibold leading-tight text-primary">
                                                {bar.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-3 text-center text-[10px] uppercase tracking-wider text-text-muted">
                                    Estimated botanical harmony trajectory
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Card: Recommended Protocol */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="relative overflow-hidden rounded-3xl border border-[#5d1f44] bg-gradient-to-br from-primary via-[#481534] to-[#2f0c22] p-6 sm:p-8 text-white shadow-xl"
                    >
                        {/* Ambient warm glow in top right */}
                        <div className="pointer-events-none absolute -mr-12 -mt-12 right-0 top-0 h-44 w-44 rounded-full bg-[#f4cf80]/15 blur-3xl" />

                        <div className="relative z-10">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#f4cf80]">
                                    <Leaf className="h-3.5 w-3.5" /> Recommended
                                    Protocol
                                </span>
                                {result.pack.badge && (
                                    <span className="rounded-full bg-[#f4cf80] px-3 py-0.5 text-[11px] font-extrabold uppercase text-primary">
                                        {result.pack.badge}
                                    </span>
                                )}
                            </div>

                            <h3 className="mb-2 text-2xl font-bold sm:text-3xl">
                                {result.pack.name}
                            </h3>

                            {result.pack.originalPrice &&
                                result.pack.originalPrice >
                                    result.pack.price && (
                                    <div className="text-sm font-medium text-white/60 line-through">
                                        Was ₦
                                        {result.pack.originalPrice.toLocaleString()}
                                    </div>
                                )}

                            <div className="mb-5 text-3xl font-extrabold text-[#f4cf80] sm:text-4xl">
                                ₦{result.pack.price.toLocaleString()}
                            </div>

                            <p className="mb-6 border-l-2 border-[#f4cf80] pl-4 text-sm leading-relaxed text-white/85">
                                {result.pack.description}
                                {result.pack.savingsText && (
                                    <span className="mt-1 block font-bold text-[#f4cf80]">
                                        {result.pack.savingsText} with this
                                        bundle
                                    </span>
                                )}
                            </p>

                            {/* Usage Note */}
                            {result.pack.usageNote && (
                                <div className="mb-6 flex items-center gap-2.5 rounded-xl bg-white/10 p-3.5 text-xs font-bold leading-tight text-[#f4cf80]">
                                    <Clock className="h-4 w-4 shrink-0" />
                                    <span>{result.pack.usageNote}</span>
                                </div>
                            )}

                            {/* Trust & Botanical specs list */}
                            <ul className="mb-8 space-y-3 text-sm text-white/90">
                                <li className="flex items-center gap-2.5">
                                    <Shield className="h-4 w-4 text-[#f4cf80]" />
                                    <span>
                                        {result.pack.containers} Pack
                                        {result.pack.containers > 1 ? "s" : ""}{" "}
                                        · Sealed Botanical Protection
                                    </span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <CheckCircle2 className="h-4 w-4 text-[#f4cf80]" />
                                    <span>
                                        NAFDAC Registered Herbal Formula (
                                        {MENOSET_NAFDAC_REG_NO})
                                    </span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Leaf className="h-4 w-4 text-[#f4cf80]" />
                                    <span>
                                        Black Cohosh, Dong Quai, Vitex & Blue
                                        Cohosh
                                    </span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <CheckCircle2 className="h-4 w-4 text-[#f4cf80]" />
                                    <span>
                                        {result.pack.deliveryText ||
                                            "Nationwide delivery available"}
                                    </span>
                                </li>
                            </ul>

                            {/* Primary Action Button */}
                            <Button
                                fullWidth
                                size="md"
                                onClick={handleClaim}
                                className="group mb-4 border border-white/20 bg-[#f4cf80] text-sm sm:text-base font-extrabold text-white hover:text-primary shadow-2xl shadow-black/25 hover:bg-white"
                                animate={{ scale: [1, 1.02, 1] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                Get Your Personalized Package{" "}
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>

                            {/* Secondary Action: Ingredients */}
                            <a
                                href="/menoset#formula"
                                className="block w-full"
                            >
                                <Button
                                    variant="outline"
                                    fullWidth
                                    size="md"
                                    className="border-white/30 text-white hover:bg-white hover:text-primary"
                                >
                                    Learn More About the Botanical Formula
                                </Button>
                            </a>

                            {/* Option to start with 1 pack if recommended a larger pack */}
                            {result.pack.id !== "menoset-starter" && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        addToCart("menoset-starter");
                                        navigate("/summary");
                                    }}
                                    className="mt-4 w-full text-center text-xs font-semibold text-white/75 underline underline-offset-4 hover:text-white"
                                >
                                    Prefer to start smaller? Choose Starter Pack (1
                                    Month · ₦15,000)
                                </button>
                            )}

                            {result.pack.savingsText && (
                                <p className="mt-4 text-center text-xs text-[#f4cf80]">
                                    {result.pack.savingsText} with this protocol
                                </p>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Medical Disclaimer */}
                <div className="mt-12 flex items-start gap-3 rounded-2xl border border-surface/60 bg-surface p-5 text-sm leading-relaxed text-text-muted shadow-sm">
                    <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-text-muted" />
                    <p className="text-text-muted">
                        This assessment is for general wellness and product guidance
                        only. It does not diagnose, treat, or replace advice from a
                        qualified healthcare professional. Read the product label and
                        use as directed. If you are pregnant, breastfeeding,
                        taking medication, or have a medical condition, consult a
                        healthcare professional before use.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MenosetResults;
