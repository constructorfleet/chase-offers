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
import { ForEachStepConfig } from "./for-each-step.config";
import { SingleStepConfig } from "./single-step.config";
import { StepConfig } from "./step.config";

export const WhileFoundStep = "whileFound" as const;
export type WhileFoundStep = typeof WhileFoundStep;

export class WhileFoundStepConfig extends StepConfig {
  @Equals(WhileFoundStep)
  type: WhileFoundStep = WhileFoundStep;

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
  whileFound: StepConfig[];

  @IsString()
  @IsNotEmpty()
  @Matches(VariablePathPattern)
  indexVariable: string;
}
