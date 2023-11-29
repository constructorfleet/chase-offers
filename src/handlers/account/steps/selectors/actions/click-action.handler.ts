import { Logger } from "@nestjs/common";
import { WebElement } from "selenium-webdriver";
import { ClickActionConfig } from "src/config";
import { ActionHandler } from "./action.handler";
import { RegisterAction } from "./action.providers";

@RegisterAction(ClickActionConfig)
export class ClickActionHandler extends ActionHandler<ClickActionConfig> {
  private readonly logger: Logger = new Logger(ClickActionHandler.name);
  public readonly select: "first";

  constructor(config: ClickActionConfig) {
    super(config);
  }

  async handle(element: WebElement[]): Promise<void> {
    this.logger.log(`Clicking ${element}`);
    await element[0].click();
  }
}
