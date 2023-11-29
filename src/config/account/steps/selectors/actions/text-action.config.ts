import { Injectable } from "@nestjs/common";
import { Equals, IsOptional, IsString } from "class-validator";
import { MapUniqueKeys } from "class-validator-extended";
import { VariableActionConfig } from "./action.config";

export const TextAction = "text" as const;
export type TextAction = typeof TextAction;

@Injectable()
export class TextActionConfig extends VariableActionConfig<TextAction> {
  @Equals(TextAction)
  type: TextAction;

  @IsString()
  @IsOptional()
  @MapUniqueKeys<string>((key) => key)
  regexCaptureGroups?: Map<string, string>;
}
