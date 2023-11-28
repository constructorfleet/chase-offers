import { Equals } from "class-validator";
import { VariableActionConfig } from "./action.config";

export const CountAction = "count" as const;
export type CountAction = typeof CountAction;

export class CountActionConfig extends VariableActionConfig<CountAction> {
  @Equals(CountAction)
  type: CountAction;
}
