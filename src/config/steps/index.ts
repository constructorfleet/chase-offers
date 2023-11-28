export * from "./for-each-step.config";
export * from "./single-step.config";
export * from "./step.config";
export * from "./while-found-step.config";

import { ForEachStep, ForEachStepConfig } from "./for-each-step.config";
import { SingleStep, SingleStepConfig } from "./single-step.config";
import {
  WhileFoundStep,
  WhileFoundStepConfig,
} from "./while-found-step.config";

export const Steps = [ForEachStep, SingleStep, WhileFoundStep] as const;
export type Steps = (typeof Steps)[number];
export type StepConfigs =
  | ForEachStepConfig
  | WhileFoundStepConfig
  | SingleStepConfig;
