import { FactoryProvider, Inject } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { ClassConstructor } from "class-transformer";
import { StepConfigs, Steps } from "src/config";
import { SelectorFactory, SelectorFactoryProvider } from "./selectors";
import { StepHandler } from "./step.handler";

// type StepConfigHandler = Record<
//   Steps,
//   ClassConstructor<StepHandler<StepConfigs>>
// >;

export type StepCreator<HandlerType extends StepHandler<StepConfigs>> = (
  config: StepConfigs
) => HandlerType;

export const stepConfigHandlers: Record<
  Steps,
  ClassConstructor<StepHandler<StepConfigs>>
> = {} as Record<Steps, ClassConstructor<StepHandler<StepConfigs>>>;

// const findHandlerFor = (
//   config: StepConfigs
// ): StepConfigHandler | undefined =>
//   stepConfigHandlers[config.type];

export const RegisterStep =
  <Config extends StepConfigs, T extends ClassConstructor<StepHandler<Config>>>(
    stepConfigType: Steps
  ): ((handlerConstructor: T) => void) =>
  (handlerConstructor: T) => {
    stepConfigHandlers[stepConfigType] = handlerConstructor;
    //   configType: stepConfigType,
    //   handlerConstructor,
    // });
  };

export const StepCreatorKey = "Step.Factory";
export const InjectStepFactory = Inject(StepCreatorKey);
export const StepFactoryProvider: FactoryProvider = {
  provide: StepCreatorKey,
  inject: [SelectorFactoryProvider.provide, ModuleRef],
  useFactory:
    (
      selectorFactory: SelectorFactory,
      moduleRef: ModuleRef
    ): StepCreator<StepHandler<StepConfigs>> =>
    (config: StepConfigs): StepHandler<StepConfigs> => {
      const constructor = stepConfigHandlers[config.type];
      if (!constructor) {
        throw new Error(
          `Unable to find handler for step config: ${config.type}`
        );
      }
      return new constructor(config, selectorFactory, moduleRef);
    },
};
