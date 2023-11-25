import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { WebDriver } from "selenium-webdriver";
import { BrowserConfig } from "./browser.config";
import { WebDriverFactory } from "./browser.provider";

@Module({
  imports: [ConfigModule.forFeature(BrowserConfig)],
  providers: [WebDriverFactory],
  exports: [WebDriver],
})
export class BrowserModule { }