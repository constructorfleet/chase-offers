import { Inject, Injectable } from "@nestjs/common";
import { WebDriver } from "selenium-webdriver";
import { UserConfig, UserConfigs } from "src/config";
import { InjectWebDriverFactory } from "../browser";
import { WebDriverFactory } from "../browser/browser.providers";

@Injectable()
export class UserHandler {
  private index: number = -1;
  private webDriver: WebDriver | undefined = undefined;

  constructor(
    @InjectWebDriverFactory private readonly driverFactory: WebDriverFactory,
    @Inject(UserConfigs) private readonly userConfigs: UserConfigs
  ) {}

  private get userConfig(): UserConfig | undefined {
    return this.userConfigs.at(this.index);
  }

  get id(): string | undefined {
    return this.userConfig?.id;
  }

  get accounts(): string[] {
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

  hasNext(): boolean {
    return this.userConfigs.length > this.index;
  }
}
