import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH2, EditableParagraph } from "@/components/atoms";
import { VisualOptionCards } from "@/components/organisms";

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
                Imagine the skate park builds a second ramp with exactly the same 30 degree
                slope, but twice the size. Every length changes, so nothing about the
                triangle is fixed. Except one thing: divide the height by the sloped side
                and both ramps give the same number.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-same-ratio-visual" maxWidth="xl">
        <Block id="same-ratio-visual" padding="sm">
            <VisualOptionCards
                blockId="same-ratio-visual"
                intro="Pick how your students will discover that the ratio depends only on the angle."
                cards={[
                    {
                        id: "resizable-ramp",
                        title: "One skate ramp students resize, with its side ratio shown live",
                        looks: "A right triangle ramp with the 30 degree angle marked, its three side lengths labelled, and the height divided by the slope printed underneath as a decimal.",
                        manipulate: "Drag a handle to make the ramp bigger or smaller, and change the slope angle",
                        reveals: "The side lengths all change, but the printed ratio only moves when the angle moves",
                        recommended: true,
                    },
                    {
                        id: "three-ramps",
                        title: "Three ramps of different sizes but the same slope, side by side",
                        looks: "Three right triangles of increasing size sharing the same marked angle, each with its own side lengths and its own height-over-slope calculation shown below it.",
                        manipulate: "Change the shared slope angle and watch all three calculations update together",
                        reveals: "Different sized triangles with the same angle always produce the same ratio",
                    },
                    {
                        id: "ratio-graph",
                        title: "A graph of the height-to-slope ratio as the angle changes",
                        looks: "A ramp on the left and a curve on the right plotting the ratio against the angle, with a dot marking the current angle.",
                        manipulate: "Sweep the angle and watch the dot travel along the curve",
                        reveals: "Each angle has one ratio of its own, which is exactly what the sine button returns",
                    },
                ]}
            />
        </Block>
    </StackLayout>,

    <StackLayout key="layout-same-ratio-payoff" maxWidth="xl">
        <Block id="same-ratio-payoff" padding="sm">
            <EditableParagraph id="para-same-ratio-payoff" blockId="same-ratio-payoff">
                That fixed number is what a calculator hands back when you press sin 30.
                Sine, cosine and tangent are simply names for three of these ratios. So
                which of the three does a given problem need?
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
