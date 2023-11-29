import { Inject, Injectable } from "@nestjs/common";
import { WebDriver } from "selenium-webdriver";
import { VariableMap } from "src/common";
import {
  CredentialConfigs,
  UserAccountConfig,
  UserConfig,
  UserConfigs,
} from "src/config";
import { AccountHandlers } from "../account";
import { InjectWebDriverFactory } from "../browser";
import { WebDriverFactory } from "../browser/browser.providers";

@Injectable()
export class UserHandler {
  private index: number = -1;
  private webDriver: WebDriver | undefined = undefined;

  constructor(
    @InjectWebDriverFactory private readonly driverFactory: WebDriverFactory,
    private readonly accountMap: AccountHandlers,
    @Inject(UserConfigs)
    private readonly userConfigs: UserConfigs
  ) {}

  private get userConfig(): UserConfig | undefined {
    return this.userConfigs.at(this.index);
  }

  get id(): string | undefined {
    return this.userConfig?.id;
  }

  get accounts(): UserAccountConfig[] {
    return this.userConfig?.accounts;
  }

  get driver(): WebDriver | undefined {
    return this.webDriver;
  }

  async next(): Promise<boolean> {
    if (this.webDriver) {
      await this.webDriver?.close();
    }
    this.index++;
    if (this.index >= this.userConfigs.length) {
      return false;
    }
    this.webDriver = await this.driverFactory(this.userConfig);
    return true;
  }

  async handle(variableMap: VariableMap = {}): Promise<VariableMap> {
    try {
      const accounts = this.accounts.map((account) => ({
        handler: this.accountMap.for(account),
        credentials: account.credentials,
      }));
      for (const account of accounts) {
        variableMap = await account.handler.handle(
          this.driver,
          variableMap,
          account.credentials as CredentialConfigs
        );
      }
      return variableMap;
    } catch (e) {
      console.error(e);
      return variableMap;
    } finally {
      await this.webDriver.close();
    }
  }

  hasNext(): boolean {
    return this.userConfigs.length > this.index;
  }
}
