import { Module } from "@nestjs/common";
import { AppConfigModule, UsersConfigModule } from "src/config";
import {
  WebDriverFactoryKey,
  WebDriverFactoryProvider,
} from "./browser.providers";

@Module({
  imports: [AppConfigModule, UsersConfigModule],
  providers: [WebDriverFactoryProvider],
  exports: [WebDriverFactoryKey],
})
export class BrowserModule {}
