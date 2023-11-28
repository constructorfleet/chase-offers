export * from "./action.config";
export * from "./click-action.config";
export * from "./count-action.config";
export * from "./sendkeys-action.config";
export * from "./text-action.config";

import { ClickAction, ClickActionConfig } from "./click-action.config";
import { CountAction, CountActionConfig } from "./count-action.config";
import { SendKeysAction, SendKeysActionConfig } from "./sendkeys-action.config";
import { TextAction, TextActionConfig } from "./text-action.config";

export type ActionConfigs =
  | ClickActionConfig
  | CountActionConfig
  | SendKeysActionConfig
  | TextActionConfig;
export type VariableActionConfigs = CountActionConfig | TextActionConfig;
export const Actions = [
  ClickAction,
  CountAction,
  SendKeysAction,
  TextAction,
] as const;
export const VariableActions = [CountAction, TextAction] as const;
export type Actions = (typeof Actions)[number];
export type VariableActions = (typeof VariableActions)[number];
