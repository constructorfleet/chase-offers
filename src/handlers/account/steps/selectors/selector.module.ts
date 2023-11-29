import { Module } from "@nestjs/common";
import { ActionsModule } from "./actions";
import { SelectorFactoryProvider } from "./selector.providers";

@Module({
  imports: [ActionsModule],
  providers: [SelectorFactoryProvider],
  exports: [SelectorFactoryProvider.provide],
})
export class SelectorModule {}
