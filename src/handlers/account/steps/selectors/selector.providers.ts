import { FactoryProvider, Inject } from "@nestjs/common";
import { ActionConfigs, SelectorConfig } from "src/config";
import {
  ActionCreator,
  ActionFactoryProvider,
  ActionHandler,
  SelectorHandler,
} from ".";

const SelectorFactoryKey = "Selector.Factory";
export const InjectSelectorFactory = Inject(SelectorFactoryKey);
export type SelectorFactory = (config: SelectorConfig) => SelectorHandler;

export const SelectorFactoryProvider: FactoryProvider = {
  provide: SelectorFactoryKey,
  inject: [ActionFactoryProvider.provide],
  useFactory:
    (actionFactory: ActionCreator<ActionHandler<ActionConfigs>>) =>
    (config: SelectorConfig) =>
      new SelectorHandler(config, actionFactory),
};
