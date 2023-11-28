import { ClassProvider, Type, ValueProvider } from "@nestjs/common";
import { VariableMap } from "src/common";
import {
  ActionConfigs,
  ClickActionConfig,
  CredentialConfigs,
  TextActionConfig,
} from "src/config";
import { ActionHandler } from "./action.handler";
import { ClickActionHandler } from "./click-action.handler";
import { SendKeysActionHandler } from "./sendkeys-action.handler";
import { TextActionHandler } from "./text-action.handler";

export const ActionConfigKey = "Key.Action.Config";
export const ActionHandlerKey = "Key.Action.Handler";

const getActionHandlerFromConfig = (
  actionConfig: ActionConfigs
): Type<
  ActionHandler<ActionConfigs, CredentialConfigs, VariableMap | void>
> => {
  switch (true) {
    case actionConfig instanceof ClickActionConfig:
      return ClickActionHandler;
    case actionConfig instanceof TextActionConfig:
      return TextActionHandler;
    case actionConfig instanceof SendKeysActionHandler:
      return SendKeysActionHandler;
    // case actionConfig instanceof
  }
};

export const ActionHandlerProvider = (
  actionConfig: ActionConfigs
): ClassProvider => ({
  provide: ActionHandlerKey,
  useClass: getActionHandlerFromConfig(actionConfig),
});

export const ActionConfigProvider = (
  actionConfig: ActionConfigs
): ValueProvider => ({
  provide: ActionConfigKey,
  useValue: actionConfig,
});
