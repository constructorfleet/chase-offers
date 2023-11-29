import { DynamicModule, FactoryProvider, Inject, Module } from "@nestjs/common";
import {
  AccountConfig,
  AccountConfigs,
  AccountType,
  AccountsConfigModule,
  StepConfigs,
} from "src/config";
import { AccountHandler, AccountHandlers } from "./account.handler";
import { StepsModule } from "./steps";
import { StepHandler } from "./steps/step.handler";
import { StepCreator, StepFactoryProvider } from "./steps/step.providers";
const AccountStepsKey = "Account.Steps";
const AccountHandlersKey = "Account.Handlers";
export const InjectSteps = Inject(AccountStepsKey);
export const InjectAccounts = Inject(AccountHandlersKey);
export type AccountHandlerMap = Record<AccountType, AccountHandler>;
const InjectAccountHandlers = Inject(AccountHandlersKey);
type StepsFactory = (config: AccountConfig) => StepHandler<StepConfigs>[];

const stepHandlers: FactoryProvider = {
  provide: AccountStepsKey,
  inject: [StepFactoryProvider.provide],
  useFactory:
    (factory: StepCreator<StepHandler<StepConfigs>>) =>
    (config: AccountConfig) =>
      config.steps.map(factory),
};

const accountHandlers: FactoryProvider = {
  provide: AccountHandlersKey,
  inject: [AccountConfigs, AccountStepsKey],
  useFactory: (
    configs: AccountConfigs,
    stepsFactory: StepsFactory
  ): AccountHandlerMap => {
    return Object.fromEntries(
      configs.map((config) => [
        config.type,
        new AccountHandler(config, stepsFactory(config)),
      ])
    );
  },
};

@Module({})
export class AccountsModule {
  static forRoot(): DynamicModule {
    return {
      module: AccountsModule,
      imports: [AccountsConfigModule, StepsModule.forRoot()],
      providers: [stepHandlers, accountHandlers, AccountHandlers],
      exports: [AccountHandlers],
    };
  }
}
