import { Injectable } from "@nestjs/common";
import { WebDriver } from "selenium-webdriver";
import { InjectWebDriverFactory, WebDriverFactory } from "../browser";
import { User } from "./user.providers";

@Injectable()
export class UserHandler {
  constructor(
    @InjectWebDriverFactory private readonly driverFactory: WebDriverFactory,
    private readonly user: User
  ) {}

  private async getDriver(): Promise<WebDriver> {
    return this.driverFactory(this.user);
  }
}
