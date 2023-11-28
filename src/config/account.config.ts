import { Type } from "class-transformer";
import { IsEnum, IsUrl, ValidateNested } from "class-validator";
import { EnsureArray } from "src/common";
import { ForEachStepConfig, StepConfig, WhileFoundStepConfig } from "./steps";
import { SingleStepConfig } from "./steps/single-step.config";

export const AccountTypes = ["chase", "paypal", "ibotta"] as const;
export type AccountType = (typeof AccountTypes)[number];

export abstract class AccountConfig {
  @IsEnum(AccountTypes)
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
