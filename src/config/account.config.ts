import { Type } from "class-transformer";
import { IsArray, IsEnum, IsUrl, ValidateNested } from "class-validator";
import { ForEachStepConfig, StepConfig, WhileFoundStepConfig } from "./steps";
import { SingleStepConfig } from "./steps/single-step.config";

export const AccountTypes = ["chase", "paypal", "ibotta"] as const;
export type AccountType = (typeof AccountTypes)[number];

export abstract class AccountConfig {
  @IsEnum(AccountTypes)
  type: AccountType;

  @IsUrl()
  url: URL;

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
  steps: StepConfig[];
}
