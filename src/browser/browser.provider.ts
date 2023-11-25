import { FactoryProvider } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { Builder, WebDriver } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";
import { BrowserConfig } from "./browser.config";


const chromeOptions = new Options();
chromeOptions.addArguments('--no-sandbox');

export const WebDriverFactory: FactoryProvider = {
    provide: WebDriver,
    inject: [BrowserConfig.KEY],
    useFactory: async (config: ConfigType<typeof BrowserConfig>): Promise<WebDriver> => {
        return await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(chromeOptions)
            .build();
    }
}