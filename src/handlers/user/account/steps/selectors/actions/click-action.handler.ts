import { WebElement } from "selenium-webdriver";
import { ClickActionConfig } from "src/config";
import { ActionHandler } from "./action.handler";

export class ClickActionHandler extends ActionHandler<ClickActionConfig> {
  constructor(config: ClickActionConfig) {
    super(config);
  }

  async handle(element: WebElement): Promise<void> {
    await element.click();
  }
}
