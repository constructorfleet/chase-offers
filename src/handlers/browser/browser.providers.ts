import { FactoryProvider, Inject } from "@nestjs/common";
import { Builder, WebDriver } from "selenium-webdriver";
import { Options as ChromeOptions } from "selenium-webdriver/chrome";
import { AppConfig, UserConfig } from "src/config";

export const BrowserOptionsKey = "Browser.Options";
export const BrowserOptions: FactoryProvider = {
  provide: BrowserOptionsKey,
  inject: [AppConfig],
  useFactory: (appConfig: AppConfig): ChromeOptions =>
    new ChromeOptions()
      .addArguments("--no-sandbox")
      .addArguments(`--user-data-dir=${appConfig.userDataDirectory}`),
};

export const WebDriverFactoryKey = "Browser.Driver.Factory";
export const InjectWebDriverFactory = Inject(WebDriverFactoryKey);
export type WebDriverFactory = (userConfig: UserConfig) => Promise<WebDriver>;
export const WebDriverFactoryProvider: FactoryProvider = {
  provide: WebDriverFactoryKey,
  inject: [BrowserOptions.provide],
  useFactory:
    async (options: ChromeOptions): Promise<WebDriverFactory> =>
    (userConfig: UserConfig): Promise<WebDriver> =>
      new Builder()
        .forBrowser("chrome")
        .setChromeOptions(
          options.addArguments(`--profile-directory=${userConfig.id}`)
        )
        .build(),
};
