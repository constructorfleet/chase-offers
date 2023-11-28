import { WebElement } from "selenium-webdriver";
import { VariableMap, getVariable } from "src/common";
import {
  CredentialConfigs,
  SendKeysActionConfig,
  SendVariableOption,
} from "src/config";
import { ActionHandler } from "./action.handler";

export class SendKeysActionHandler<
  CredentialsProvider extends CredentialConfigs,
> extends ActionHandler<SendKeysActionConfig, CredentialsProvider> {
  constructor(config: SendKeysActionConfig) {
    super(config);
  }

  protected async handle(
    element: WebElement,
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
    await element.sendKeys(value);
  }
}
