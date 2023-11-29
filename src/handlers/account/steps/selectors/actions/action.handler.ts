import { WebElement } from "selenium-webdriver";
import { VariableMap } from "src/common";
import { ActionConfigs, CredentialConfigs, Select } from "src/config";

type SelectElements<Select> = Select extends "first"
  ? WebElement
  : WebElement[];

export abstract class ActionHandler<
  ActionConfig extends ActionConfigs,
  SelectOption extends Select = "first",
  CredentialProvider extends CredentialConfigs = CredentialConfigs,
> {
  public abstract readonly select: SelectOption;

  protected constructor(protected readonly config: ActionConfig) {}

  async execute(
    element: SelectElements<SelectOption>,
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
    element: SelectElements<SelectOption>,
    variableMap: VariableMap,
    credentials: CredentialProvider
  ): Promise<VariableMap | void>;
}
