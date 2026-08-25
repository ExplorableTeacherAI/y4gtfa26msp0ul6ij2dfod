import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { FormulaBlock } from "@/components/molecules";
import { VisualOptionCards } from "@/components/organisms";

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
        <Block id="naming-sides-visual" padding="sm">
            <VisualOptionCards
                blockId="naming-sides-visual"
                intro="Pick how your students will practise naming the sides and choosing the ratio."
                cards={[
                    {
                        id: "switch-the-angle",
                        title: "A triangle where students switch which angle is marked and see the labels move",
                        looks: "A right triangle with one angle marked. The three sides carry the labels opposite, adjacent and hypotenuse, colour coded to match.",
                        manipulate: "Tap the other angle to mark it instead, and reshape the triangle by dragging a corner",
                        reveals: "Opposite and adjacent swap places when the marked angle changes, while the hypotenuse never moves",
                        recommended: true,
                    },
                    {
                        id: "pick-the-ratio",
                        title: "A triangle where students choose the ratio that matches the known and wanted sides",
                        looks: "A right triangle with one side length given and one side marked with a question mark, plus three buttons for sine, cosine and tangent.",
                        manipulate: "Choose which ratio fits, then see the matching pair of sides light up on the triangle",
                        reveals: "The correct ratio is the one naming exactly the side you know and the side you want",
                    },
                    {
                        id: "rotating-triangle",
                        title: "The same triangle shown in different rotations with the labels following the angle",
                        looks: "One right triangle drawn four times at different tilts, each with the same angle marked and its sides named.",
                        manipulate: "Step through the rotations and check the naming each time",
                        reveals: "Side names depend on the marked angle, not on which side happens to look flat or upright",
                    },
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-naming-sides-strategy" maxWidth="xl">
        <Block id="naming-sides-strategy" padding="sm">
            <EditableParagraph id="para-naming-sides-strategy" blockId="naming-sides-strategy">
                To choose a ratio, name two sides: the one you know and the one you want. If
                that pair is the opposite and the hypotenuse, the ratio is sine. Write the
                equation down before touching the calculator.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
