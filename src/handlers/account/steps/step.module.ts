import { Module } from "@nestjs/common";
import { SelectorModule } from "./selectors";
import { StepFactoryProvider } from "./step.providers";

@Module({
  imports: [SelectorModule],
  providers: [StepFactoryProvider],
  exports: [StepFactoryProvider.provide],
})
export class StepsModule {}
