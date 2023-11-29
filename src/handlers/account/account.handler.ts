import { Injectable, Logger } from "@nestjs/common";
import { WebDriver } from "selenium-webdriver";
import { VariableMap } from "src/common";
import {
  AccountConfig,
  AccountType,
  CredentialConfigs,
  StepConfigs,
} from "src/config";
import { AccountHandlerMap, InjectAccounts } from "./account.module";
import { StepHandler } from "./steps";

@Injectable()
export class AccountHandlers {
  constructor(@InjectAccounts private readonly handlerMap: AccountHandlerMap) {}

  for({ type }: { type: AccountType }): AccountHandler | undefined {
    return this.handlerMap[type];
  }
}

@Injectable()
export class AccountHandler {
  private readonly logger: Logger = new Logger(AccountHandler.name);
  constructor(
    private readonly config: AccountConfig,
    private readonly steps: StepHandler<StepConfigs>[]
  ) {}

  async handle(
    driver: WebDriver,
    variableMap: VariableMap,
    credentials: CredentialConfigs
  ): Promise<VariableMap> {
    this.logger.log(`Handling account ${this.config.type}`);
    await driver.get(this.config.url.toString());
    for (const step of this.steps) {
      variableMap = await step.run(driver, variableMap, credentials);
    }
    return variableMap;
  }
}
