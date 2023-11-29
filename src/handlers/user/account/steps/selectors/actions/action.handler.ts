import { WebElement } from "selenium-webdriver";
import { VariableMap } from "src/common";
import { ActionConfigs, CredentialConfigs } from "src/config";

export abstract class ActionHandler<
  ActionConfig extends ActionConfigs,
  CredentialProvider extends CredentialConfigs = CredentialConfigs,
  ActionResult extends VariableMap | void = void,
> {
  protected constructor(protected readonly config: ActionConfig) {}

  async execute(
    element: WebElement,
    variableMap: VariableMap,
    credentials: CredentialProvider
  ): Promise<VariableMap> {
    const result = await this.handle(element, variableMap, credentials);
    if (result instanceof Object) {
      return result;
    }
    return variableMap;
  }

  protected abstract handle(
    element: WebElement,
    variableMap: VariableMap,
    credentials: CredentialProvider
  ): Promise<ActionResult>;
}
