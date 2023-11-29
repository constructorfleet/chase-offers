import { Logger } from "@nestjs/common";
import { WebElement } from "selenium-webdriver";
import { VariableMap, getVariable } from "src/common";
import {
  CredentialConfigs,
  SendKeysActionConfig,
  SendVariableOption,
} from "src/config";
import { ActionHandler } from "./action.handler";
import { RegisterAction } from "./action.providers";

@RegisterAction(SendKeysActionConfig)
export class SendKeysActionHandler<
  CredentialsProvider extends CredentialConfigs,
> extends ActionHandler<SendKeysActionConfig, "first", CredentialsProvider> {
  private readonly logger: Logger = new Logger(SendKeysActionHandler.name);
  public readonly select: "first";

  constructor(config: SendKeysActionConfig) {
    super(config);
  }

  protected async handle(
    element: WebElement[],
    variableMap: VariableMap,
    credentials: CredentialsProvider
  ): Promise<void> {
    let value: string = undefined;
    if (this.config.send === SendVariableOption) {
      value = getVariable(this.config.variablePath, variableMap);
    } else {
      // @ts-ignore
      value = await credentials.get(this.config.send);
    }
    this.logger.log(`Sending keys ${value}`);
    await element[0].sendKeys(value);
  }
}
