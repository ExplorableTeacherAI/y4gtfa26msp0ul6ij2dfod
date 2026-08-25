import { type ReactElement } from "react";

// Initialize variables and their colors from this file's variable definitions
import { useVariableStore, initializeVariableColors } from "@/stores";
import { getDefaultValues, variableDefinitions } from "./variables";

import { findingMissingSideBlocks } from "./sections/FindingMissingSide";
import { ratioStaysTheSameBlocks } from "./sections/RatioStaysTheSame";
import { namingSidesFromAngleBlocks } from "./sections/NamingSidesFromAngle";
import { multiplyOrDivideBlocks } from "./sections/MultiplyOrDivide";
import { wrappingUpBlocks } from "./sections/WrappingUp";

useVariableStore.getState().initialize(getDefaultValues());
initializeVariableColors(variableDefinitions);

export const blocks: ReactElement[] = [
    ...findingMissingSideBlocks,
    ...ratioStaysTheSameBlocks,
    ...namingSidesFromAngleBlocks,
    ...multiplyOrDivideBlocks,
    ...wrappingUpBlocks,
];
