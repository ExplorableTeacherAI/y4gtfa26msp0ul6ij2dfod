import { useState } from "react";
import { Button, RadioGroup, RadioGroupItem } from "@/components/atoms";

export interface PracticeOption {
    id: string;
    label: string;
    correct?: boolean;
    feedback: string;
}

interface PracticeQuestionProps {
    questionId: string;
    prompt: string;
    options: PracticeOption[];
}

/** A single multiple-choice practice item with per-option feedback. */
export const PracticeQuestion = ({
    questionId,
    prompt,
    options,
}: PracticeQuestionProps) => {
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
                        htmlFor={`${questionId}-${option.id}`}
                        className="flex cursor-pointer items-center gap-2 text-slate-700"
                    >
                        <RadioGroupItem value={option.id} id={`${questionId}-${option.id}`} />
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
