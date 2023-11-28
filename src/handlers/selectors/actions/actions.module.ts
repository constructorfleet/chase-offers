import { DynamicModule, Module } from "@nestjs/common";
import { ActionConfigs } from "src/config";
import {
  ActionConfigProvider,
  ActionHandlerKey,
  ActionHandlerProvider,
} from "./actions.providers";

@Module({})
export class ActionsModule {
  static forConfig(actionConfig: ActionConfigs): DynamicModule {
    class ActionModule {}
    return {
      module: ActionModule,
      providers: [
        ActionHandlerProvider(actionConfig),
        ActionConfigProvider(actionConfig),
      ],
      exports: [ActionHandlerKey],
    };
  }
}
