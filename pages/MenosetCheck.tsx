import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useSeoMeta } from "../hooks/useSeoMeta";

type Answers = Record<string, string | string[]>;

const questions = [
    {
        id: "age",
        question: "Which age range are you in?",
        options: ["Under 30", "30-39", "40-49", "50-59", "60+"],
    },
    {
        id: "cycle",
        question: "Which best describes your menstrual cycle right now?",
        options: [
            "Regular and predictable",
            "Sometimes irregular",
            "Frequently irregular",
            "My periods have changed significantly",
            "My periods have stopped",
            "I'm not sure",
        ],
    },
    {
        id: "symptoms",
        question: "Which of these are you experiencing?",
        multiple: true,
        options: [
            "Hot flashes",
            "Night sweats",
            "Mood changes",
            "Irritability or stress",
            "Menstrual cramps or discomfort",
            "Irregular periods",
            "Breast tenderness",
            "Sleep difficulties",
            "Low libido",
            "Other changes",
        ],
    },
    {
        id: "frequency",
        question: "How often do these symptoms affect you?",
        options: [
            "Occasionally",
            "A few times a month",
            "Several times a week",
            "Almost every day",
            "They significantly affect my daily life",
        ],
    },
    {
        id: "priority",
        question: "What would you most like support with?",
        options: [
            "My monthly cycle",
            "Menstrual discomfort",
            "Hot flashes and night sweats",
            "Mood, stress and irritability",
            "Several symptoms",
            "General menopause support",
        ],
    },
];

const MenosetCheck: React.FC = () => {
    const [step, setStep] = useState(-1);
    const [answers, setAnswers] = useState<Answers>({});
    const [notice, setNotice] = useState("");
    const navigate = useNavigate();
    const reduceMotion = useReducedMotion();
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const question = questions[step];

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [step]);

    useSeoMeta({
        title: "Menoset 60-Second Symptom Check",
        description:
            "A short general wellness and product-guidance check for Menoset.",
        url: "/menoset-check",
        robots: "noindex",
    });

    const isAnswered = question
        ? Array.isArray(answers[question.id])
            ? answers[question.id].length > 0
            : Boolean(answers[question.id])
        : true;

    const next = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (!isAnswered) {
            setNotice("Choose at least one answer before continuing.");
            return;
        }
        setNotice("");
        if (step < questions.length - 1) setStep((current) => current + 1);
        else navigate("/menoset-results", { state: { answers } });
    };

    const prev = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setNotice("");
        if (step > 0) setStep(step - 1);
        else setStep(-1);
    };

    const toggleMultipleOption = (questionId: string, option: string) => {
        const selected = (answers[questionId] as string[] | undefined) ?? [];
        setAnswers({
            ...answers,
            [questionId]: selected.includes(option)
                ? selected.filter((item) => item !== option)
                : [...selected, option],
        });
        if (notice) setNotice("");
    };

    const handleRadioSelect = (questionId: string, option: string) => {
        const nextAnswers = {
            ...answers,
            [questionId]: option,
        };
        setAnswers(nextAnswers);
        if (notice) setNotice("");

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            if (step < questions.length - 1) {
                setStep((current) => current + 1);
            } else {
                navigate("/menoset-results", { state: { answers: nextAnswers } });
            }
        }, 300);
    };

    if (step === -1)
        return (
            <main className="min-h-screen px-4 pt-28">
                <section className="mx-auto max-w-3xl flex flex-col items-center border border-gray-200 rounded-3xl bg-surface p-8 text-center shadow-sm sm:p-14">
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#9d3d65]">
                        Menoset wellness guidance
                    </p>
                    <h1 className="mt-4 text-4xl max-w-2/3 text-center font-bold text-[#4e1939]">
                        Not sure which Menoset pack is right for you?
                    </h1>
                    <p className="mx-auto mt-5 max-w-xl leading-relaxed text-[#624b57]">
                        Answer a few questions about your cycle and symptoms. We
                        will guide you toward a Menoset option that fits your
                        current needs and routine.
                    </p>
                    <Button
                        size="md"
                        onClick={() => setStep(0)}
                        className="mt-8 bg-[#4e1939] hover:bg-[#6d274e]"
                    >
                        Start my 60-second check{" "}
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <p className="mt-6 text-xs leading-relaxed text-[#624b57]">
                        This check is for general wellness and product guidance.
                        It is not a medical diagnosis.
                    </p>
                </section>
            </main>
        );

    return (
        <main className="min-h-screen bg-[#fffaf7] px-4 py-24 sm:pt-28">
            <section className="mx-auto max-w-2xl overflow-hidden border border-[#ead7df] bg-white shadow-sm">
                <div className="h-2 bg-[#f4e4e9]">
                    <motion.div
                        className="h-full bg-[#9d3d65]"
                        animate={{
                            width: `${((step + 1) / questions.length) * 100}%`,
                        }}
                        transition={
                            reduceMotion ? { duration: 0 } : { duration: 0.35 }
                        }
                    />
                </div>
                <div className="p-6 sm:p-10">
                    <div className="flex items-center justify-between gap-3">
                        <button
                            type="button"
                            onClick={prev}
                            className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#7a3155] hover:text-[#4e1939]"
                        >
                            <ArrowLeft className="h-4 w-4" /> Back
                        </button>
                        <p className="text-sm font-semibold text-[#7a3155]">
                            Question {step + 1} of {questions.length}
                        </p>
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={question.id}
                            initial={
                                reduceMotion ? false : { opacity: 0, x: 16 }
                            }
                            animate={{ opacity: 1, x: 0 }}
                            exit={
                                reduceMotion
                                    ? undefined
                                    : { opacity: 0, x: -16 }
                            }
                            transition={{ duration: 0.2 }}
                            className="mt-10"
                        >
                            <h1 className="text-3xl font-bold leading-tight text-[#4e1939]">
                                {question.question}
                            </h1>
                            <fieldset className="mt-8 space-y-3">
                                <legend className="sr-only">
                                    {question.question}
                                </legend>
                                {question.options.map((option) => {
                                    const selected = question.multiple
                                        ? (
                                            (answers[question.id] as
                                                | string[]
                                                | undefined) ?? []
                                        ).includes(option)
                                        : answers[question.id] === option;
                                    return (
                                        <label
                                            key={option}
                                            onClick={() => {
                                                if (!question.multiple && selected) {
                                                    handleRadioSelect(question.id, option);
                                                }
                                            }}
                                            className={`flex min-h-14 rounded-lg cursor-pointer items-center justify-between gap-4 border p-4 transition-colors ${selected ? "border-[#9d3d65] bg-[#fbeff1] text-[#4e1939]" : "border-[#ead7df] hover:border-[#c77b9a]"}`}
                                        >
                                            <span className="font-medium">
                                                {option}
                                            </span>
                                            <input
                                                type={
                                                    question.multiple
                                                        ? "checkbox"
                                                        : "radio"
                                                }
                                                name={question.id}
                                                value={option}
                                                checked={selected}
                                                onChange={() =>
                                                    question.multiple
                                                        ? toggleMultipleOption(question.id, option)
                                                        : handleRadioSelect(question.id, option)
                                                }
                                                className="h-5 w-5 accent-[#9d3d65]"
                                            />
                                            {/* {selected && (
                                                <Check
                                                    className="h-5 w-5 text-[#9d3d65]"
                                                    aria-hidden="true"
                                                />
                                            )} */}
                                        </label>
                                    );
                                })}
                            </fieldset>
                        </motion.div>
                    </AnimatePresence>
                    {notice && (
                        <p
                            role="alert"
                            className="mt-5 text-sm font-semibold text-red-700"
                        >
                            {notice}
                        </p>
                    )}
                    <Button
                        size="lg"
                        fullWidth
                        onClick={next}
                        className="mt-8 bg-[#4e1939] hover:bg-[#6d274e]"
                    >
                        {step === questions.length - 1
                            ? "See my guidance"
                            : "Continue"}{" "}
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <div className="mt-7 flex gap-3 border-t border-[#ead7df] pt-5 text-xs leading-relaxed text-[#624b57]">
                        <ShieldAlert className="h-5 w-5 shrink-0 text-[#9d3d65]" />
                        This assessment is for general wellness and product
                        guidance only. It does not diagnose, treat, or replace
                        advice from a qualified healthcare professional.
                    </div>
                </div>
            </section>
        </main>
    );
};

export default MenosetCheck;
