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
  inject: [AppConfig],
  useFactory:
    (appConfig: AppConfig): WebDriverFactory =>
    async (userConfig: UserConfig): Promise<WebDriver> => {
      return new Builder()
        .forBrowser("chrome")
        .setChromeOptions(
          new ChromeOptions()
            .addArguments("--no-sandbox")
            .addArguments(`--user-data-dir=${appConfig.userDataDirectory}`)
            .addArguments(`--profile-directory=${userConfig.id}`)
        )
        .build();
    },
};
