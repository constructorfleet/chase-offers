import { DynamicModule, Module } from "@nestjs/common";
import { StepConfigs } from "src/config";
import {
  StepConfigKey,
  StepConfigProvider,
  StepHandlerKey,
  StepProvider,
} from "./steps.providers";

@Module({})
export class StepsModule {
  static forConfig(stepConfig: StepConfigs): DynamicModule {
    class StepModule {}
    return {
      module: StepModule,
      providers: [StepProvider(stepConfig), StepConfigProvider(stepConfig)],
      exports: [StepHandlerKey, StepConfigKey],
    };
  }
}
