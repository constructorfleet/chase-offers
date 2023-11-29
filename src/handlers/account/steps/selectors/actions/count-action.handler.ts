import { WebElement } from "selenium-webdriver";
import { VariableMap } from "src/common";
import { CountActionConfig, CredentialConfigs } from "src/config";
import { ActionHandler } from "./action.handler";

export class CountActionHandler extends ActionHandler<
  CountActionConfig,
  "all"
> {
  public readonly select: "all";
  constructor(config: CountActionConfig) {
    super(config);
  }

  protected async handle(
    element: WebElement[],
    variableMap: VariableMap,
    credentials: CredentialConfigs
  ): Promise<VariableMap> {
    return variableMap;
  }
}
