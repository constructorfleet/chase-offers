import { Injectable } from "@nestjs/common";
import { Transform, Type } from "class-transformer";
import {
  Equals,
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

@Injectable()
export class ForEachStepConfig extends StepConfig {
  @Equals(ForEachStep)
  type: ForEachStep = ForEachStep;

  @ValidateNested()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @Type(() => StepConfig, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: SingleStepConfig, name: "single" },
        { value: ForEachStepConfig, name: "forEach" },
        { value: WhileFoundStepConfig, name: "whileFound" },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  forEach: StepConfig[];

  @IsString()
  @IsNotEmpty()
  @Matches(VariablePathPattern)
  indexVariable: string;
}
