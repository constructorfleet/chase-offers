import { Injectable } from "@nestjs/common";
import { Equals, IsOptional } from "class-validator";
import { VariableActionConfig } from "./action.config";

export const CountAction = "count" as const;
export type CountAction = typeof CountAction;

@Injectable()
export class CountActionConfig extends VariableActionConfig<CountAction> {
  @Equals(CountAction)
  type: CountAction;

  @IsOptional()
  // @Matches(VariablePathPattern, { each: true })
  templateReplacers: Map<string, string> = undefined;
}
