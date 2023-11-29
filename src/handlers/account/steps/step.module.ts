import { DynamicModule, Module } from "@nestjs/common";
import { SelectorModule } from "./selectors";
import { StepFactoryProvider } from "./step.providers";

@Module({})
export class StepsModule {
  static forRoot(): DynamicModule {
    return {
      module: StepsModule,
      imports: [SelectorModule],
      providers: [StepFactoryProvider],
      exports: [StepFactoryProvider.provide],
    };
  }
}
