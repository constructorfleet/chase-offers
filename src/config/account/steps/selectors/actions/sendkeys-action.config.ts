import { Injectable } from "@nestjs/common";
import {
  Equals,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  ValidateIf,
} from "class-validator";
import { VariablePathPattern } from "src/common";
import { ActionConfig } from "./action.config";

export const SendVariableOption = "variable" as const;
export const SendCredentialOption = "credential" as const;
export const SendKeysAction = "sendKeys" as const;
export const SendKeysOptions = [
  "username",
  "password",
  "otp",
  SendVariableOption,
] as const;
export type SendKeysAction = typeof SendKeysAction;
export type SendKeysOption = (typeof SendKeysOptions)[number];

@Injectable()
export class SendKeysActionConfig extends ActionConfig<SendKeysAction> {
  @Equals(SendKeysAction)
  type: SendKeysAction;

  @IsEnum(SendKeysOptions)
  @IsNotEmpty()
  send: SendKeysOption;

  @ValidateIf((config) => config.send === SendVariableOption)
  @IsString()
  @IsNotEmpty()
  @Matches(VariablePathPattern)
  variablePath: string;
}
