import { Module } from "@nestjs/common";
import { ActionFactoryProvider } from "./action.providers";

@Module({
  providers: [ActionFactoryProvider],
  exports: [ActionFactoryProvider.provide],
})
export class ActionsModule {}
