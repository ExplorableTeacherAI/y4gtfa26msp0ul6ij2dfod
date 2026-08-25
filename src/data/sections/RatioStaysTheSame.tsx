import { useState, type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableH3,
    EditableParagraph,
    Slider,
    Button,
    RadioGroup,
    RadioGroupItem,
} from "@/components/atoms";
import { useVar, useSetVar } from "@/stores";

/* ------------------------------------------------------------------
 * Interactive skate ramp: resize it, change its slope, and watch the
 * height-to-slope ratio stay fixed for a fixed angle.
 * ------------------------------------------------------------------ */
const RampRatioExplorer = () => {
    const angle = useVar("rampAngle", 30) as number;
    const slopeLength = useVar("rampSlopeLength", 5) as number;
    const setVar = useSetVar();

    const radians = (angle * Math.PI) / 180;
    const height = slopeLength * Math.sin(radians);
    const base = slopeLength * Math.cos(radians);

    const PIXELS_PER_METRE = 32;
    const ORIGIN_X = 60;
    const BASE_Y = 262;
    const rightX = ORIGIN_X + base * PIXELS_PER_METRE;
    const topY = BASE_Y - height * PIXELS_PER_METRE;

    const arcRadius = 34;
    const arcEndX = ORIGIN_X + arcRadius * Math.cos(radians);
    const arcEndY = BASE_Y - arcRadius * Math.sin(radians);

    const ratio = height / slopeLength;

    return (
        <div className="w-full">
            <svg
                width="100%"
                viewBox="0 0 560 300"
                role="img"
                aria-label="A skate ramp drawn as a right triangle with its slope angle, sides and height-to-slope ratio"
            >
                <line
                    x1={30}
                    y1={BASE_Y}
                    x2={530}
                    y2={BASE_Y}
                    stroke="#cbd5e1"
                    strokeWidth={2}
                />

                <polygon
                    points={`${ORIGIN_X},${BASE_Y} ${rightX},${BASE_Y} ${rightX},${topY}`}
                    fill="rgba(99, 102, 241, 0.14)"
                    stroke="#6366f1"
                    strokeWidth={2.5}
                    strokeLinejoin="round"
                />

                {/* sloped riding surface highlighted */}
                <line
                    x1={ORIGIN_X}
                    y1={BASE_Y}
                    x2={rightX}
                    y2={topY}
                    stroke="#0ea5e9"
                    strokeWidth={4}
                    strokeLinecap="round"
                />

                {/* vertical height highlighted */}
                <line
                    x1={rightX}
                    y1={BASE_Y}
                    x2={rightX}
                    y2={topY}
                    stroke="#f43f5e"
                    strokeWidth={4}
                    strokeLinecap="round"
                />

                {/* angle arc */}
                <path
                    d={`M ${ORIGIN_X + arcRadius} ${BASE_Y} A ${arcRadius} ${arcRadius} 0 0 0 ${arcEndX} ${arcEndY}`}
                    fill="none"
                    stroke="#4338ca"
                    strokeWidth={2}
                />
                <text
                    x={ORIGIN_X + arcRadius + 10}
                    y={BASE_Y - 12}
                    fontSize="14"
                    fill="#4338ca"
                    fontWeight="600"
                >
                    {angle}°
                </text>

                {/* right angle marker */}
                <polyline
                    points={`${rightX - 14},${BASE_Y} ${rightX - 14},${BASE_Y - 14} ${rightX},${BASE_Y - 14}`}
                    fill="none"
                    stroke="#475569"
                    strokeWidth={2}
                />

                {/* labels */}
                <text
                    x={(ORIGIN_X + rightX) / 2 - 6}
                    y={(BASE_Y + topY) / 2 - 14}
                    fontSize="13"
                    fill="#0284c7"
                    fontWeight="600"
                    textAnchor="end"
                >
                    slope {slopeLength.toFixed(1)} m
                </text>

                <text
                    x={rightX + 10}
                    y={(BASE_Y + topY) / 2 + 4}
                    fontSize="13"
                    fill="#e11d48"
                    fontWeight="600"
                    textAnchor="start"
                >
                    height {height.toFixed(2)} m
                </text>

                <text
                    x={(ORIGIN_X + rightX) / 2}
                    y={BASE_Y + 22}
                    fontSize="13"
                    fill="#475569"
                    textAnchor="middle"
                >
                    ground {base.toFixed(2)} m
                </text>
            </svg>

            <div className="mt-2 grid gap-4 sm:grid-cols-2">
                <div>
                    <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
                        <span>Slope angle</span>
                        <span className="font-semibold text-indigo-600">{angle}°</span>
                    </div>
                    <Slider
                        value={[angle]}
                        min={15}
                        max={60}
                        step={1}
                        onValueChange={(value) => setVar("rampAngle", value[0])}
                    />
                </div>
                <div>
                    <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
                        <span>Length of the sloped surface</span>
                        <span className="font-semibold text-sky-600">
                            {slopeLength.toFixed(1)} m
                        </span>
                    </div>
                    <Slider
                        value={[slopeLength]}
                        min={2}
                        max={8}
                        step={0.5}
                        onValueChange={(value) => setVar("rampSlopeLength", value[0])}
                    />
                </div>
            </div>

            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
                <div className="text-sm text-slate-600">height ÷ slope</div>
                <div className="text-2xl font-semibold text-slate-800">
                    {height.toFixed(2)} ÷ {slopeLength.toFixed(1)} ={" "}
                    <span className="text-indigo-600">{ratio.toFixed(3)}</span>
                </div>
                <div className="mt-1 text-sm text-slate-600">
                    and sin {angle}° = {Math.sin(radians).toFixed(3)}
                </div>
            </div>
        </div>
    );
};

/* ------------------------------------------------------------------
 * Practice
 * ------------------------------------------------------------------ */
interface PracticeOption {
    id: string;
    label: string;
    correct?: boolean;
    feedback: string;
}

const PracticeQuestion = ({
    prompt,
    options,
}: {
    prompt: string;
    options: PracticeOption[];
}) => {
    const [choice, setChoice] = useState<string>("");
    const [checked, setChecked] = useState(false);
    const selected = options.find((option) => option.id === choice);

    return (
        <div className="rounded-lg border border-slate-200 p-4">
            <div className="mb-3 text-slate-800">{prompt}</div>
            <RadioGroup
                value={choice}
                onValueChange={(value) => {
                    setChoice(value);
                    setChecked(false);
                }}
                className="space-y-2"
            >
                {options.map((option) => (
                    <label
                        key={option.id}
                        htmlFor={`${prompt.slice(0, 12)}-${option.id}`}
                        className="flex cursor-pointer items-center gap-2 text-slate-700"
                    >
                        <RadioGroupItem
                            value={option.id}
                            id={`${prompt.slice(0, 12)}-${option.id}`}
                        />
                        <span>{option.label}</span>
                    </label>
                ))}
            </RadioGroup>
            <Button
                className="mt-3"
                variant="outline"
                disabled={!choice}
                onClick={() => setChecked(true)}
            >
                Check
            </Button>
            {checked && selected && (
                <div
                    className={`mt-3 rounded-md p-3 text-sm ${
                        selected.correct
                            ? "bg-emerald-50 text-emerald-800"
                            : "bg-amber-50 text-amber-800"
                    }`}
                >
                    {selected.feedback}
                </div>
            )}
        </div>
    );
};

const RatioPractice = () => (
    <div className="space-y-4">
        <PracticeQuestion
            prompt="A ramp with a 45° slope has a sloped surface of 3 m. A second ramp keeps the same 45° slope but its sloped surface is 6 m. What happens to height ÷ slope?"
            options={[
                {
                    id: "doubles",
                    label: "It doubles",
                    feedback:
                        "Both the height and the slope doubled, and a fraction with both parts doubled is unchanged. Set the angle to 45° above and slide the length from 3 m to 6 m to watch the ratio hold still.",
                },
                {
                    id: "same",
                    label: "It stays exactly the same",
                    correct: true,
                    feedback:
                        "Correct — the angle is what fixes the ratio. Growing the ramp stretches the height and the slope by the same factor, so their quotient is untouched.",
                },
                {
                    id: "halves",
                    label: "It halves",
                    feedback:
                        "Check which quantity grew. Set the angle to 45° above, then slide the length from 3 m to 6 m and read the ratio at both ends.",
                },
            ]}
        />
        <PracticeQuestion
            prompt="Two ramps have sloped surfaces of the same 4 m length, but one rises at 20° and the other at 50°. Which statement is true?"
            options={[
                {
                    id: "equal",
                    label: "Both have the same height ÷ slope, because the slopes are equal in length",
                    feedback:
                        "Length is not what fixes the ratio. Keep the slope slider at 4 m above and move the angle from 20° to 50°, watching the ratio panel.",
                },
                {
                    id: "steeper-bigger",
                    label: "The 50° ramp has the larger height ÷ slope",
                    correct: true,
                    feedback:
                        "Correct — a steeper angle lifts more height out of the same 4 m of slope, so the ratio is bigger. That is exactly why sin 50° is larger than sin 20°.",
                },
                {
                    id: "steeper-smaller",
                    label: "The 50° ramp has the smaller height ÷ slope",
                    feedback:
                        "Picture the steeper ramp: it climbs higher over the same length of riding surface. Set the length to 4 m above and compare the two angles.",
                },
            ]}
        />
    </div>
);

export const ratioStaysTheSameBlocks: ReactElement[] = [
    <StackLayout key="layout-same-ratio-title" maxWidth="xl">
        <Block id="same-ratio-title" padding="md">
            <EditableH2 id="h2-same-ratio-title" blockId="same-ratio-title">
                The Ratio That Stays the Same
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-same-ratio-setup" maxWidth="xl">
        <Block id="same-ratio-setup" padding="sm">
            <EditableParagraph id="para-same-ratio-setup" blockId="same-ratio-setup">
                Imagine the skate park rebuilding its ramp bigger, keeping exactly the same
                30 degree slope. Every length changes, so nothing about the triangle is
                fixed. Except one thing. Stretch the ramp below and watch the height divided
                by the sloped surface.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-same-ratio-visual" maxWidth="xl">
        <Block id="same-ratio-visual" padding="sm" hasVisualization>
            <RampRatioExplorer />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-same-ratio-payoff" maxWidth="xl">
        <Block id="same-ratio-payoff" padding="sm">
            <EditableParagraph id="para-same-ratio-payoff" blockId="same-ratio-payoff">
                The ratio only moves when the angle moves, and it always matches the sine of
                that angle. Sine, cosine and tangent are simply names for three of these
                ratios. So which of the three does a given problem need?
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-same-ratio-practice-heading" maxWidth="xl">
        <Block id="same-ratio-practice-heading" padding="sm">
            <EditableH3
                id="h3-same-ratio-practice-heading"
                blockId="same-ratio-practice-heading"
            >
                Check your thinking
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-same-ratio-practice" maxWidth="xl">
        <Block id="same-ratio-practice" padding="sm">
            <RatioPractice />
        </Block>
    </StackLayout>,
];
