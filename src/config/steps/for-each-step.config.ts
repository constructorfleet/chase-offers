import { Type } from "class-transformer";
import {
  Equals,
  IsArray,
  IsNotEmpty,
  IsString,
  Matches,
  ValidateNested,
} from "class-validator";
import { VariablePathPattern } from "src/common";
import { SingleStepConfig } from "./single-step.config";
import { StepConfig } from "./step.config";
import { WhileFoundStepConfig } from "./while-found-step.config";

export const ForEachStep = "forEach" as const;
export type ForEachStep = typeof ForEachStep;

export class ForEachStepConfig extends StepConfig {
  @Equals(ForEachStep)
  type: ForEachStep = ForEachStep;

  @IsArray({ each: true })
  @ValidateNested()
  @Type(() => StepConfig, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: SingleStepConfig, name: "single" },
        { value: ForEachStepConfig, name: "forEach" },
        { value: WhileFoundStepConfig, name: "whileFound" },
      ],
    },
  })
  forEach: StepConfig[];

  @IsString()
  @IsNotEmpty()
  @Matches(VariablePathPattern)
  indexVariable: string;
}
