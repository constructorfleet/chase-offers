import { Injectable } from "@nestjs/common";
import { Equals, IsOptional } from "class-validator";
import { VariableActionConfig } from "./action.config";

export const TextAction = "text" as const;
export type TextAction = typeof TextAction;

@Injectable()
export class TextActionConfig extends VariableActionConfig<TextAction> {
  @Equals(TextAction)
  type: TextAction;

  @IsOptional()
  regexCaptureGroups?: Map<string, string>;

  @IsOptional()
  // @Matches(VariablePathPattern, { each: true })
  templateReplacers: Map<string, string> = undefined;
}
