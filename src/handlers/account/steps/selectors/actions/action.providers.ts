import { FactoryProvider, Inject, Type } from "@nestjs/common";
import { ClassConstructor } from "class-transformer";
import { ActionConfigs, Select } from "src/config";
import { ActionHandler } from ".";

type ActionConfigHandler<
  Config extends ActionConfigs,
  SelectOption extends Select,
> = {
  configType: Type<Config>;
  handlerConstructor: ClassConstructor<ActionHandler<Config, SelectOption>>;
};

export type ActionCreator<
  HandlerType extends ActionHandler<ActionConfigs, Select>,
> = (config: ActionConfigs) => HandlerType;

const actionConfigHandlers: ActionConfigHandler<ActionConfigs, Select>[] = [];

const findHandlerFor = (
  config: ActionConfigs
): ActionConfigHandler<ActionConfigs, Select> | undefined =>
  actionConfigHandlers.find((item) => config instanceof item.configType);

export const RegisterAction =
  <
    Config extends ActionConfigs,
    T extends ClassConstructor<ActionHandler<Config, Select>>,
  >(
    actionConfigType: Type<Config>
  ): ((handlerConstructor: T) => void) =>
  (handlerConstructor: T) => {
    actionConfigHandlers.push({
      configType: actionConfigType,
      handlerConstructor,
    });
  };
const ActionFactoryKey = "Action.Factory";
export const InjectActionFactory = Inject(ActionFactoryKey);
export const ActionFactoryProvider: FactoryProvider = {
  provide: ActionFactoryKey,
  useFactory:
    (): ActionCreator<ActionHandler<ActionConfigs, Select>> =>
    (config: ActionConfigs): ActionHandler<ActionConfigs, Select> => {
      const constructor = findHandlerFor(config)?.handlerConstructor;
      if (!constructor) {
        throw new Error(
          `Unable to find handler for action config: ${config.type}`
        );
      }
      return new constructor(config);
    },
};
