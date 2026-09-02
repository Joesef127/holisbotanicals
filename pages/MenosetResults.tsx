import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, Leaf, ShieldAlert } from "lucide-react";
import Button from "../components/Button";
import { MENOSET_PACKAGES } from "../lib/constants";
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

function resultFor(answers: Answers) {
    const symptoms = (answers.symptoms as string[] | undefined) ?? [];
    const preference = answers.preference as string;
    const priority = answers.priority as string;
    const isLongTerm = preference === "I want the best value";
    const isMulti = symptoms.length >= 6 || priority === "Several symptoms";
    const isHotFlash =
        symptoms.includes("Hot flashes") ||
        symptoms.includes("Night sweats") ||
        priority === "Hot flashes and night sweats";
    const transition =
        answers.cycle === "My periods have stopped" ||
        answers.cycle === "My periods have changed significantly" ||
        priority === "General menopause support";
    let packageId = "menoset-starter";
    let title = "Your current focus: menstrual wellness";
    let copy =
        "Your answers suggest that your main concerns are around your menstrual cycle and monthly comfort. Menoset is formulated with botanicals traditionally used in women's menstrual wellness.";
    if (isLongTerm) {
        packageId = "menoset-transformation";
        title = "Your preference: longer supply";
        copy =
            "You indicated that convenience and value are important to you. Our longer bundle reduces the need to reorder frequently and offers greater savings.";
    } else if (isMulti) {
        packageId = "menoset-wellness";
        title = "Your current focus: multiple menopause-related changes";
        copy =
            "You selected several symptoms, which suggests you are looking for broader support rather than help with one isolated concern.";
    } else if (isHotFlash) {
        packageId =
            frequencyWeight[answers.frequency as string] >= 2 ||
            preference === "I prefer a longer supply"
                ? "menoset-wellness"
                : "menoset-essentials";
        title = "Your current focus: hot flash and night-sweat support";
        copy =
            "Hot flashes and night sweats can be among the changes women experience during perimenopause and menopause. Menoset includes Black Cohosh, a botanical traditionally used for menopausal symptom support.";
    } else if (transition || preference === "I want a 3-month supply") {
        packageId = "menoset-essentials";
        title = "Your current focus: the menopause transition";
        copy =
            "Your answers suggest that you are experiencing changes commonly associated with the menopause transition. Menoset provides herbal, non-hormonal support for women navigating this stage.";
    }
    return {
        symptoms,
        pack: MENOSET_PACKAGES.find((item) => item.id === packageId)!,
        title,
        copy,
    };
}

const MenosetResults: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { addToCart } = useApp();
    const answers = (location.state as { answers?: Answers } | null)?.answers;
    useSeoMeta({
        title: "Your Menoset Support Profile",
        description: "Your Menoset product-guidance result.",
        url: "/menoset-results",
        robots: "noindex",
    });
    useEffect(() => {
        if (!answers) navigate("/menoset-check", { replace: true });
    }, [answers, navigate]);
    if (!answers) return null;
    const result = resultFor(answers);
    return (
        <main className="min-h-screen bg-[#fffaf7] px-4 py-28">
            <section className="mx-auto max-w-4xl">
                <p className="text-center text-sm font-bold uppercase tracking-[0.16em] text-[#9d3d65]">
                    Your Menoset support profile
                </p>
                <h1 className="mx-auto mt-4 max-w-3xl text-center text-4xl font-bold text-[#4e1939]">
                    {result.title}
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-center leading-relaxed text-[#624b57]">
                    {result.copy}
                </p>
                <div className="mt-12 grid gap-6 md:grid-cols-[.9fr_1.1fr]">
                    <section className="border border-[#ead7df] bg-white p-7">
                        <h2 className="text-xl font-bold text-[#4e1939]">
                            What you selected
                        </h2>
                        <div className="mt-5 flex flex-wrap gap-2">
                            {result.symptoms.slice(0, 5).map((symptom) => (
                                <span
                                    key={symptom}
                                    className="bg-[#fbeff1] px-3 py-2 text-sm font-medium text-[#6d274e]"
                                >
                                    {symptom}
                                </span>
                            ))}
                        </div>
                        <p className="mt-6 text-sm leading-relaxed text-[#624b57]">
                            <Leaf className="mr-2 inline h-4 w-4 text-[#9d3d65]" />
                            Menoset combines Black Cohosh, Dong Quai, Vitex
                            agnus-castus, and Blue Cohosh, botanicals
                            traditionally used in women's menstrual and
                            menopausal wellness.
                        </p>
                        <Link
                            to="/menoset#formula"
                            className="mt-6 inline-flex items-center gap-2 font-bold text-[#8c3058] underline underline-offset-4"
                        >
                            See ingredients <ArrowRight className="h-4 w-4" />
                        </Link>
                    </section>
                    <section className="bg-[#4e1939] p-7 text-white">
                        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#f4cf80]">
                            Our suggestion
                        </p>
                        <h2 className="mt-3 text-2xl font-bold">
                            {result.pack.name}
                        </h2>
                        <p className="mt-2 text-white/80">
                            {result.pack.description} | ₦
                            {result.pack.price.toLocaleString()}
                        </p>
                        {result.pack.savingsText && (
                            <p className="mt-3 font-bold text-[#f4cf80]">
                                {result.pack.savingsText}
                            </p>
                        )}
                        <p className="mt-6 border-l-2 border-[#f4cf80] pl-4 text-sm leading-relaxed text-white/80">
                            We are suggesting this based on the routine and
                            convenience preferences you selected. It is not a
                            medical recommendation, and individual experiences
                            may vary.
                        </p>
                        <Button
                            fullWidth
                            size="lg"
                            onClick={() => {
                                addToCart(result.pack.id);
                                navigate("/summary");
                            }}
                            className="mt-8 bg-[#f4cf80] text-[#4e1939]! hover:bg-white"
                        >
                            Get my recommended pack{" "}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <button
                            type="button"
                            onClick={() => {
                                addToCart("menoset-starter");
                                navigate("/summary");
                            }}
                            className="mt-4 w-full text-sm font-bold text-white underline underline-offset-4"
                        >
                            I'd rather start with 1 pack
                        </button>
                    </section>
                </div>
                <p className="mx-auto mt-10 flex max-w-3xl gap-3 border-t border-[#ead7df] pt-6 text-xs leading-relaxed text-[#624b57]">
                    <ShieldAlert className="h-5 w-5 shrink-0 text-[#9d3d65]" />
                    This assessment is for general wellness and product guidance
                    only. It does not diagnose, treat, or replace advice from a
                    qualified healthcare professional. Read the product label
                    and use as directed. If you are pregnant, breastfeeding,
                    taking medication, or have a medical condition, consult a
                    healthcare professional before use.
                </p>
            </section>
        </main>
    );
};

export default MenosetResults;
