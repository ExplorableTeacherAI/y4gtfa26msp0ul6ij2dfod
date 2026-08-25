import { type ReactElement } from "react";
import { Block } from "@/components/templates";
import { StackLayout } from "@/components/layouts";
import { EditableH1, EditableParagraph, InlineFormula } from "@/components/atoms";

export const findingMissingSideBlocks: ReactElement[] = [
    <StackLayout key="layout-ramp-intro-title" maxWidth="xl">
        <Block id="ramp-intro-title" padding="md">
            <EditableH1 id="h1-ramp-intro-title" blockId="ramp-intro-title">
                Finding a Missing Side
            </EditableH1>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-ramp-intro-hook" maxWidth="xl">
        <Block id="ramp-intro-hook" padding="sm">
            <EditableParagraph id="para-ramp-intro-hook" blockId="ramp-intro-hook">
                At the skate park, a ramp rises from the ground at a steady 30 degrees, and
                the sloped surface you ride down is 5 metres long. How tall is it at the
                top? Running a tape measure straight up through the middle of a solid ramp
                is awkward, and yet those two numbers already fix the answer.
            </EditableParagraph>
        </Block>
    </StackLayout>,

    <StackLayout key="layout-ramp-intro-promise" maxWidth="xl">
        <Block id="ramp-intro-promise" padding="sm">
            <EditableParagraph id="para-ramp-intro-promise" blockId="ramp-intro-promise">
                By the end of this lesson you will find a missing side of a right triangle
                from one angle and one known side, using sine, cosine or tangent. You can
                already spot the right angle and the hypotenuse, write one length over
                another as a decimal, solve something like{" "}
                <InlineFormula latex="\frac{x}{8} = 0.5" />, and get sin, cos and tan from
                a calculator. That is everything you need. What
                is left is choosing which of the three to use, and what to do with it.
            </EditableParagraph>
        </Block>
    </StackLayout>,
];
