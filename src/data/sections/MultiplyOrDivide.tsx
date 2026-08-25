import { useState, type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableH3,
    EditableParagraph,
    InlineFormula,
    Button,
} from "@/components/atoms";
import { PracticeQuestion } from "./shared/PracticeQuestion";

interface RearrangeStep {
    latex: string;
    note: string;
}

interface RearrangeCase {
    id: "unknown-on-top" | "unknown-underneath";
    tab: string;
    story: string;
    steps: RearrangeStep[];
    check: string;
}

const CASES: RearrangeCase[] = [
    {
        id: "unknown-on-top",
        tab: "Unknown on top",
        story: "A skate ramp has a 6 m sloped surface and rises at 35°. Find its height h.",
        steps: [
            {
                latex: "\\sin 35^\\circ = \\frac{h}{6}",
                note: "Sine names the opposite side and the hypotenuse, which is exactly the pair here.",
            },
            {
                latex: "6 \\times \\sin 35^\\circ = h",
                note: "The unknown sits on top, held back by a division by 6. Multiplying both sides by 6 frees it.",
            },
            {
                latex: "h = 6 \\times 0.574 = 3.44 \\text{ m}",
                note: "The height is smaller than the 6 m sloped surface, which is what a ramp should look like.",
            },
        ],
        check: "Had you divided instead, 6 ÷ sin 35° gives 10.5 m — a height taller than the sloped surface it hangs from, which no triangle allows.",
    },
    {
        id: "unknown-underneath",
        tab: "Unknown underneath",
        story: "A ramp must reach a height of 2 m at 35°. Find the length L of the sloped surface.",
        steps: [
            {
                latex: "\\sin 35^\\circ = \\frac{2}{L}",
                note: "Same ratio as before, but this time the unknown is the one underneath.",
            },
            {
                latex: "L \\times \\sin 35^\\circ = 2",
                note: "Multiply both sides by L to lift the unknown out of the denominator.",
            },
            {
                latex: "L = \\frac{2}{\\sin 35^\\circ} = 3.49 \\text{ m}",
                note: "Now divide by sin 35°. The answer is longer than the 2 m height, as a hypotenuse must be.",
            },
        ],
        check: "Only here does the division happen — and it appears at the end, after the unknown has been lifted out of the denominator.",
    },
];

const EquationRearranger = () => {
    const [caseIndex, setCaseIndex] = useState(0);
    const [step, setStep] = useState(0);
    const activeCase = CASES[caseIndex];
    const isLastStep = step === activeCase.steps.length - 1;

    const selectCase = (index: number) => {
        setCaseIndex(index);
        setStep(0);
    };

    return (
        <div className="w-full">
            <div className="mb-3 flex flex-wrap gap-2">
                {CASES.map((item, index) => (
                    <Button
                        key={item.id}
                        variant={index === caseIndex ? "default" : "outline"}
                        onClick={() => selectCase(index)}
                    >
                        {item.tab}
                    </Button>
                ))}
            </div>

            <div className="mb-4 rounded-lg bg-slate-50 p-3 text-slate-800">
                {activeCase.story}
            </div>

            <div className="space-y-3">
                {activeCase.steps.slice(0, step + 1).map((item, index) => (
                    <div
                        key={item.latex}
                        className={`rounded-lg border p-4 ${
                            index === step
                                ? "border-indigo-300 bg-indigo-50"
                                : "border-slate-200 bg-white"
                        }`}
                    >
                        <div className="text-center text-lg">
                            <InlineFormula latex={item.latex} />
                        </div>
                        <div className="mt-2 text-sm text-slate-600">{item.note}</div>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
                <Button
                    onClick={() => setStep(Math.min(step + 1, activeCase.steps.length - 1))}
                    disabled={isLastStep}
                >
                    Next step
                </Button>
                <Button
                    variant="outline"
                    onClick={() => setStep(Math.max(step - 1, 0))}
                    disabled={step === 0}
                >
                    Back
                </Button>
                <Button variant="ghost" onClick={() => setStep(0)}>
                    Restart
                </Button>
            </div>

            {isLastStep && (
                <div className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-800">
                    {activeCase.check}
                </div>
            )}
        </div>
    );
};

const MultiplyOrDividePractice = () => (
    <div className="space-y-4">
        <PracticeQuestion
            questionId="multiply-divide-ramp-height"
            prompt="A ramp rises at 40° and its sloped surface is 9 m long. Which calculation gives the height?"
            options={[
                {
                    id: "multiply",
                    label: "9 × sin 40°",
                    correct: true,
                    feedback:
                        "Correct. The equation is sin 40° = h ÷ 9 with the unknown on top, so multiplying by 9 releases it — and the answer, about 5.8 m, is shorter than the 9 m slope.",
                },
                {
                    id: "divide",
                    label: "9 ÷ sin 40°",
                    feedback:
                        "This is the divide-every-time habit. Here the unknown is already on top of the fraction, so dividing gives 14 m — a height longer than the sloped surface holding it up. Open the 'Unknown on top' steps above and follow where the 9 moves.",
                },
                {
                    id: "cosine-divide",
                    label: "9 ÷ cos 40°",
                    feedback:
                        "Two things to recheck: the height faces the 40° angle, so it is the opposite side, and the unknown's position decides the operation. Step through the first case above.",
                },
            ]}
        />
        <PracticeQuestion
            questionId="multiply-divide-zip-line"
            prompt="A zip line drops 3 m vertically and leaves the platform at 25° below horizontal. Which calculation gives the cable length?"
            options={[
                {
                    id: "multiply",
                    label: "3 × sin 25°",
                    feedback:
                        "That gives 1.3 m — a cable shorter than the drop it spans, which cannot happen. Switch to the 'Unknown underneath' steps above and watch where L travels.",
                },
                {
                    id: "divide",
                    label: "3 ÷ sin 25°",
                    correct: true,
                    feedback:
                        "Correct. Here sin 25° = 3 ÷ L puts the unknown underneath, so you divide, and 7.1 m is longer than the drop, exactly as a hypotenuse should be.",
                },
                {
                    id: "tangent",
                    label: "3 ÷ tan 25°",
                    feedback:
                        "Tangent never involves the hypotenuse, and the cable is the hypotenuse here. Rewrite the equation with sine and check where the unknown sits.",
                },
            ]}
        />
    </div>
);

export const multiplyOrDivideBlocks: ReactElement[] = [
    <StackLayout key="layout-multiply-divide-title" maxWidth="xl">
        <Block id="multiply-divide-title" padding="md">
            <EditableH2 id="h2-multiply-divide-title" blockId="multiply-divide-title">
                Multiply or Divide?
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-multiply-divide-cases" maxWidth="xl">
        <Block id="multiply-divide-cases" padding="sm">
            <EditableParagraph id="para-multiply-divide-cases" blockId="multiply-divide-cases">
                Picking the ratio leaves you with an equation, and the unknown lands in one
                of two places. In <InlineFormula latex="\sin 35^\circ = \frac{h}{6}" /> it
                sits on top. In <InlineFormula latex="\sin 35^\circ = \frac{2}{L}" /> it sits
                underneath. Step through both below and watch where the unknown travels.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-multiply-divide-visual" maxWidth="xl">
        <Block id="multiply-divide-visual" padding="sm" hasVisualization>
            <EquationRearranger />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-multiply-divide-warning" maxWidth="xl">
        <Block id="multiply-divide-warning" padding="sm">
            <EditableParagraph id="para-multiply-divide-warning" blockId="multiply-divide-warning">
                The two equations look almost identical, so reaching for division every time
                is an easy habit to fall into. Write the equation first, find the unknown,
                then decide — and check the hypotenuse ends up longest.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-multiply-divide-practice-heading" maxWidth="xl">
        <Block id="multiply-divide-practice-heading" padding="sm">
            <EditableH3
                id="h3-multiply-divide-practice-heading"
                blockId="multiply-divide-practice-heading"
            >
                Check your thinking
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-multiply-divide-practice" maxWidth="xl">
        <Block id="multiply-divide-practice" padding="sm">
            <MultiplyOrDividePractice />
        </Block>
    </StackLayout>,
];
