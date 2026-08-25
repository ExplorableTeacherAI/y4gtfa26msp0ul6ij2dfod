import { useState, type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import {
    EditableH2,
    EditableH3,
    EditableParagraph,
    Button,
} from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { PracticeQuestion } from "./shared/PracticeQuestion";

type SideName = "opposite" | "adjacent" | "hypotenuse";
type RatioName = "sine" | "cosine" | "tangent";

const RATIO_SIDES: Record<RatioName, [SideName, SideName]> = {
    sine: ["opposite", "hypotenuse"],
    cosine: ["adjacent", "hypotenuse"],
    tangent: ["opposite", "adjacent"],
};

interface RatioScenario {
    id: string;
    story: string;
    angle: number;
    known: SideName;
    knownLength: string;
    unknown: SideName;
    correct: RatioName;
    why: string;
}

const SCENARIOS: RatioScenario[] = [
    {
        id: "ramp-height",
        story: "The sloped riding surface of a skate ramp is 5 m and it rises at 34°. How tall is the ramp?",
        angle: 34,
        known: "hypotenuse",
        knownLength: "5 m",
        unknown: "opposite",
        correct: "sine",
        why: "You know the hypotenuse and want the opposite side, and sine is the ratio that names exactly that pair.",
    },
    {
        id: "ramp-ground",
        story: "A ramp rises at 28° with a 7 m sloped surface. How much floor space does it take up?",
        angle: 28,
        known: "hypotenuse",
        knownLength: "7 m",
        unknown: "adjacent",
        correct: "cosine",
        why: "The hypotenuse is known and the adjacent side is wanted, which is the pair cosine names.",
    },
    {
        id: "shadow",
        story: "A flagpole casts a 12 m shadow and the sun sits 41° above the ground. How tall is the pole?",
        angle: 41,
        known: "adjacent",
        knownLength: "12 m",
        unknown: "opposite",
        correct: "tangent",
        why: "No hypotenuse is involved here: you have the adjacent side and want the opposite one, so it is tangent.",
    },
    {
        id: "zip-line",
        story: "A zip line drops 9 m vertically and leaves the platform at 23° below horizontal. How long is the cable?",
        angle: 23,
        known: "opposite",
        knownLength: "9 m",
        unknown: "hypotenuse",
        correct: "sine",
        why: "The opposite side is known and the hypotenuse is wanted, and sine is the ratio linking those two.",
    },
];

const SIDE_COLOR: Record<SideName, string> = {
    opposite: "#f43f5e",
    adjacent: "#0ea5e9",
    hypotenuse: "#8b5cf6",
};

const RatioPicker = () => {
    const [index, setIndex] = useState(0);
    const [choice, setChoice] = useState<RatioName | null>(null);
    const scenario = SCENARIOS[index];

    const highlighted: SideName[] = choice ? RATIO_SIDES[choice] : [];
    const isCorrect = choice === scenario.correct;

    // Triangle geometry: right angle bottom-right, marked angle bottom-left.
    const ORIGIN_X = 90;
    const BASE_Y = 236;
    const MAX_WIDTH = 290;
    const MAX_HEIGHT = 170;
    const radians = (scenario.angle * Math.PI) / 180;
    const triangleWidth = Math.min(MAX_WIDTH, MAX_HEIGHT / Math.tan(radians));
    const RIGHT_X = ORIGIN_X + triangleWidth;
    const topY = BASE_Y - triangleWidth * Math.tan(radians);

    const strokeFor = (side: SideName) =>
        highlighted.includes(side) ? SIDE_COLOR[side] : "#94a3b8";
    const widthFor = (side: SideName) => (highlighted.includes(side) ? 6 : 3);

    const labelFor = (side: SideName) => {
        if (side === scenario.known) return `${side} = ${scenario.knownLength}`;
        if (side === scenario.unknown) return `${side} = ?`;
        return side;
    };

    return (
        <div className="w-full">
            <div className="mb-3 rounded-lg bg-slate-50 p-3 text-slate-800">
                {scenario.story}
            </div>

            <svg
                width="100%"
                viewBox="0 0 560 300"
                role="img"
                aria-label="A right triangle with one known side, one unknown side, and its sides named from the marked angle"
            >
                <polygon
                    points={`${ORIGIN_X},${BASE_Y} ${RIGHT_X},${BASE_Y} ${RIGHT_X},${topY}`}
                    fill="rgba(148, 163, 184, 0.12)"
                />

                {/* adjacent side (along the ground) */}
                <line
                    x1={ORIGIN_X}
                    y1={BASE_Y}
                    x2={RIGHT_X}
                    y2={BASE_Y}
                    stroke={strokeFor("adjacent")}
                    strokeWidth={widthFor("adjacent")}
                    strokeLinecap="round"
                />
                {/* opposite side (vertical) */}
                <line
                    x1={RIGHT_X}
                    y1={BASE_Y}
                    x2={RIGHT_X}
                    y2={topY}
                    stroke={strokeFor("opposite")}
                    strokeWidth={widthFor("opposite")}
                    strokeLinecap="round"
                />
                {/* hypotenuse */}
                <line
                    x1={ORIGIN_X}
                    y1={BASE_Y}
                    x2={RIGHT_X}
                    y2={topY}
                    stroke={strokeFor("hypotenuse")}
                    strokeWidth={widthFor("hypotenuse")}
                    strokeLinecap="round"
                />

                {/* marked angle */}
                <path
                    d={`M ${ORIGIN_X + 36} ${BASE_Y} A 36 36 0 0 0 ${ORIGIN_X + 36 * Math.cos(radians)} ${BASE_Y - 36 * Math.sin(radians)}`}
                    fill="none"
                    stroke="#4338ca"
                    strokeWidth={2}
                />
                <text
                    x={ORIGIN_X + 46}
                    y={BASE_Y - 12}
                    fontSize="14"
                    fill="#4338ca"
                    fontWeight="600"
                >
                    {scenario.angle}°
                </text>

                {/* right angle marker */}
                <polyline
                    points={`${RIGHT_X - 14},${BASE_Y} ${RIGHT_X - 14},${BASE_Y - 14} ${RIGHT_X},${BASE_Y - 14}`}
                    fill="none"
                    stroke="#475569"
                    strokeWidth={2}
                />

                {/* labels */}
                <text
                    x={(ORIGIN_X + RIGHT_X) / 2}
                    y={BASE_Y + 24}
                    fontSize="13"
                    fontWeight="600"
                    fill={strokeFor("adjacent")}
                    textAnchor="middle"
                >
                    {labelFor("adjacent")}
                </text>
                <text
                    x={RIGHT_X + 12}
                    y={(BASE_Y + topY) / 2}
                    fontSize="13"
                    fontWeight="600"
                    fill={strokeFor("opposite")}
                    textAnchor="start"
                >
                    {labelFor("opposite")}
                </text>
                <text
                    x={(ORIGIN_X + RIGHT_X) / 2 - 10}
                    y={(BASE_Y + topY) / 2 - 12}
                    fontSize="13"
                    fontWeight="600"
                    fill={strokeFor("hypotenuse")}
                    textAnchor="end"
                >
                    {labelFor("hypotenuse")}
                </text>
            </svg>

            <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-sm text-slate-600">Which ratio do you need?</span>
                {(Object.keys(RATIO_SIDES) as RatioName[]).map((ratio) => (
                    <Button
                        key={ratio}
                        variant={choice === ratio ? "default" : "outline"}
                        onClick={() => setChoice(ratio)}
                    >
                        {ratio}
                    </Button>
                ))}
                <Button
                    variant="ghost"
                    onClick={() => {
                        setIndex((index + 1) % SCENARIOS.length);
                        setChoice(null);
                    }}
                >
                    Another problem
                </Button>
            </div>

            {choice && (
                <div
                    className={`mt-3 rounded-md p-3 text-sm ${
                        isCorrect
                            ? "bg-emerald-50 text-emerald-800"
                            : "bg-amber-50 text-amber-800"
                    }`}
                >
                    {isCorrect
                        ? `Yes. ${scenario.why}`
                        : `${choice} lights up the ${RATIO_SIDES[choice][0]} and the ${RATIO_SIDES[choice][1]}. One of those is neither the side you know nor the side you want, so look again at which two sides the problem gives you.`}
                </div>
            )}
        </div>
    );
};

const NamingSidesPractice = () => (
    <div className="space-y-4">
        <PracticeQuestion
            questionId="naming-sides-ladder"
            prompt="A 4.5 m ladder leans against a wall, meeting the ground at 62°. You want the distance from the wall to the foot of the ladder. Which ratio does that problem need?"
            options={[
                {
                    id: "sine",
                    label: "Sine",
                    feedback:
                        "Sine pairs the opposite side with the hypotenuse, and the distance along the ground is not opposite the 62° angle. Try that pairing on the triangle above.",
                },
                {
                    id: "cosine",
                    label: "Cosine",
                    correct: true,
                    feedback:
                        "Correct. The ladder is the hypotenuse and the ground distance sits next to the 62° angle, so it is the adjacent side — that pair is cosine.",
                },
                {
                    id: "tangent",
                    label: "Tangent",
                    feedback:
                        "Tangent never involves the hypotenuse, but the 4.5 m ladder is the hypotenuse here. Press tangent above and check which two sides light up.",
                },
            ]}
        />
        <PracticeQuestion
            questionId="naming-sides-switch-angle"
            prompt="In one right triangle you stop working from one acute angle and start working from the other. Which side names change?"
            options={[
                {
                    id: "none",
                    label: "None — each side keeps the name it had",
                    feedback:
                        "The names are read from the marked angle, so moving the angle must move at least some of them. Compare the labels for two problems above with different angle positions.",
                },
                {
                    id: "opposite-adjacent",
                    label: "Opposite and adjacent swap; the hypotenuse keeps its name",
                    correct: true,
                    feedback:
                        "Correct. Only the right angle fixes the hypotenuse, so it never moves, while the side facing your angle changes when the angle does.",
                },
                {
                    id: "all-three",
                    label: "All three names change",
                    feedback:
                        "One side is named without reference to your angle at all. Look at which side sits across from the right angle in the triangle above.",
                },
            ]}
        />
    </div>
);

export const namingSidesFromAngleBlocks: ReactElement[] = [
    <StackLayout key="layout-naming-sides-title" maxWidth="xl">
        <Block id="naming-sides-title" padding="md">
            <EditableH2 id="h2-naming-sides-title" blockId="naming-sides-title">
                Naming Sides from the Angle
            </EditableH2>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-naming-sides-rule" maxWidth="xl">
        <Block id="naming-sides-rule" padding="sm">
            <EditableParagraph id="para-naming-sides-rule" blockId="naming-sides-rule">
                Each ratio compares two sides, and the names of those sides come from the
                angle you are working with, not from the right angle. The opposite side
                faces your angle across the triangle. The adjacent side is the other short
                side, resting against it. The hypotenuse is always the one across from the
                right angle.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-naming-sides-ratios" maxWidth="xl">
        <Block id="naming-sides-ratios" padding="lg">
            <FormulaBlock latex="\sin\theta = \frac{\text{opposite}}{\text{hypotenuse}} \qquad \cos\theta = \frac{\text{adjacent}}{\text{hypotenuse}} \qquad \tan\theta = \frac{\text{opposite}}{\text{adjacent}}" />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-naming-sides-visual" maxWidth="xl">
        <Block id="naming-sides-visual" padding="sm" hasVisualization>
            <RatioPicker />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-naming-sides-strategy" maxWidth="xl">
        <Block id="naming-sides-strategy" padding="sm">
            <EditableParagraph id="para-naming-sides-strategy" blockId="naming-sides-strategy">
                Name two sides before you choose: the one you know and the one you want.
                Pressing a ratio above lights up the two sides it names, so the right choice
                is the button that lights up exactly that pair.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-naming-sides-practice-heading" maxWidth="xl">
        <Block id="naming-sides-practice-heading" padding="sm">
            <EditableH3
                id="h3-naming-sides-practice-heading"
                blockId="naming-sides-practice-heading"
            >
                Check your thinking
            </EditableH3>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-naming-sides-practice" maxWidth="xl">
        <Block id="naming-sides-practice" padding="sm">
            <NamingSidesPractice />
        </Block>
    </StackLayout>,
];
