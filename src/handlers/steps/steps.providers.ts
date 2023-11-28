import { ClassProvider, Type, ValueProvider } from "@nestjs/common";
import {
  ForEachStepConfig,
  SingleStepConfig,
  StepConfigs,
  WhileFoundStepConfig,
} from "src/config";
import { ForEachStepHandler } from "./for-each-step.handler";
import { SingleStepHandler } from "./single-step.handler";
import { StepHandler } from "./step.handler";
import { WhileFoundStepHandler } from "./while-found-step.handler";

const getStepHandlerFromConfig = (
  stepConfig: StepConfigs
): Type<StepHandler<StepConfigs>> => {
  switch (true) {
    case stepConfig instanceof SingleStepConfig:
      return SingleStepHandler;
    case stepConfig instanceof ForEachStepConfig:
      return ForEachStepHandler;
    case stepConfig instanceof WhileFoundStepConfig:
      return WhileFoundStepHandler;
  }
};

export const StepHandlerKey = "Key.Step.Handler";
export const StepConfigKey = "Key.Step.Config";

export const StepProvider = (stepConfig: StepConfigs): ClassProvider => ({
  provide: StepHandlerKey,
  useClass: getStepHandlerFromConfig(stepConfig),
});

export const StepConfigProvider = (stepConfig: StepConfigs): ValueProvider => ({
  provide: StepConfigKey,
  useValue: stepConfig,
});
