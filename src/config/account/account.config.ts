import { Injectable } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsUrl, ValidateNested } from "class-validator";
import { EnsureArray } from "src/common";
import { ForEachStepConfig, StepConfig, WhileFoundStepConfig } from "./steps";
import { SingleStepConfig } from "./steps/single-step.config";

export type AccountType = string;

@Injectable()
export class AccountConfig {
  @IsString()
  @IsNotEmpty()
  type: AccountType;

  @IsUrl()
  url: URL;

  @EnsureArray
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
    keepDiscriminatorProperty: true,
  })
  steps: StepConfig[];
}
