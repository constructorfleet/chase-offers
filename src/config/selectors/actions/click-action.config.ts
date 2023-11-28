import { Equals } from "class-validator";
import { ActionConfig } from "./action.config";

export const ClickAction = "click" as const;
export type ClickAction = typeof ClickAction;

export class ClickActionConfig extends ActionConfig<ClickAction> {
  @Equals(ClickAction)
  type: ClickAction;
}
