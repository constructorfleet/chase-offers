import { Injectable } from "@nestjs/common";
import { Equals } from "class-validator";
import { StepConfig } from "./step.config";

export const SingleStep = "single" as const;
export type SingleStep = typeof SingleStep;

@Injectable()
export class SingleStepConfig extends StepConfig {
  @Equals(SingleStep)
  type: SingleStep = SingleStep;
}
