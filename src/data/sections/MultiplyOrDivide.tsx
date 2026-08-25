import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph, InlineFormula } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

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
                of two places. In <InlineFormula latex="\sin 30^\circ = \frac{h}{5}" /> the
                unknown sits on top, so you multiply. In{" "}
                <InlineFormula latex="\sin 30^\circ = \frac{2}{L}" /> it sits underneath, so
                you divide.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-multiply-divide-visual" maxWidth="xl">
        <Block id="multiply-divide-visual" padding="sm">
            <VisualOptionCards
                blockId="multiply-divide-visual"
                intro="Pick how your students will see when to multiply and when to divide."
                cards={[
                    {
                        id: "unknown-position",
                        title: "A ramp problem where students move the unknown between the two positions",
                        looks: "A right triangle with one length given and one unknown, next to the equation it produces, with the unknown highlighted on top of or underneath the fraction.",
                        manipulate: "Switch which side is unknown, then choose multiply or divide and see the answer drawn on the triangle",
                        reveals: "Dividing when the unknown is on top produces a side far longer than the hypotenuse, which the triangle cannot fit",
                        targetsMisconception: "Students always divide, even when the unknown side needs multiplying",
                        recommended: true,
                    },
                    {
                        id: "answer-check",
                        title: "A checker that draws both answers on the triangle so students judge which is possible",
                        looks: "One right triangle with two candidate lengths drawn on it, one from multiplying and one from dividing, each labelled with its value.",
                        manipulate: "Change the given side and angle, then decide which drawn length could be a real side",
                        reveals: "Only one of the two results gives a triangle that closes, and the hypotenuse is always the longest side",
                        targetsMisconception: "Students always divide, even when the unknown side needs multiplying",
                    },
                    {
                        id: "rearrange-steps",
                        title: "A step-by-step rearranger that shows the equation being solved line by line",
                        looks: "The chosen ratio equation with the unknown highlighted, and the rearranging shown one move at a time down the screen.",
                        manipulate: "Step forward through the rearrangement, or restart with the unknown in the other position",
                        reveals: "The operation is decided by where the unknown sits, not by habit",
                        targetsMisconception: "Students always divide, even when the unknown side needs multiplying",
                    },
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-multiply-divide-warning" maxWidth="xl">
        <Block id="multiply-divide-warning" padding="sm">
            <EditableParagraph id="para-multiply-divide-warning" blockId="multiply-divide-warning">
                The two equations look almost the same, so reaching for division every time
                is an easy habit to fall into. Write the equation first, find the unknown,
                then decide.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
