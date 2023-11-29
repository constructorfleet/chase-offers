import { WebElement } from "selenium-webdriver";
import { ClickActionConfig } from "src/config";
import { ActionHandler } from "./action.handler";
import { RegisterAction } from "./action.providers";

@RegisterAction(ClickActionConfig)
export class ClickActionHandler extends ActionHandler<ClickActionConfig> {
  public readonly select: "first";

  constructor(config: ClickActionConfig) {
    super(config);
  }

  async handle(element: WebElement): Promise<void> {
    await element.click();
  }
}
