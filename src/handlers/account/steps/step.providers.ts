import { FactoryProvider, Inject, Type } from "@nestjs/common";
import { ClassConstructor } from "class-transformer";
import { StepConfigs } from "src/config";
import { SelectorFactory, SelectorFactoryProvider } from "./selectors";
import { StepHandler } from "./step.handler";

type StepConfigHandler<Config extends StepConfigs> = {
  configType: Type<Config>;
  handlerConstructor: ClassConstructor<StepHandler<Config>>;
};

export type StepCreator<HandlerType extends StepHandler<StepConfigs>> = (
  config: StepConfigs
) => HandlerType;

const stepConfigHandlers: StepConfigHandler<StepConfigs>[] = [];

const findHandlerFor = (
  config: StepConfigs
): StepConfigHandler<StepConfigs> | undefined =>
  stepConfigHandlers.find((item) => config instanceof item.configType);

export const RegisterStep =
  <Config extends StepConfigs, T extends ClassConstructor<StepHandler<Config>>>(
    stepConfigType: Type<Config>
  ): ((handlerConstructor: T) => void) =>
  (handlerConstructor: T) => {
    stepConfigHandlers.push({
      configType: stepConfigType,
      handlerConstructor,
    });
  };

const StepFactoryKey = "Step.Factory";
export const InjectStepFactory = Inject(StepFactoryKey);
export const StepFactoryProvider: FactoryProvider = {
  provide: StepFactoryKey,
  inject: [SelectorFactoryProvider.provide],
  useFactory:
    (selectorFactory: SelectorFactory): StepCreator<StepHandler<StepConfigs>> =>
    (config: StepConfigs): StepHandler<StepConfigs> => {
      const constructor = findHandlerFor(config)?.handlerConstructor;
      if (!constructor) {
        throw new Error(
          `Unable to find handler for step config: ${config.type}`
        );
      }
      return new constructor(config, selectorFactory);
    },
};
