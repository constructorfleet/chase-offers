import { Logger } from "@nestjs/common";
import { WebElement } from "selenium-webdriver";
import { VariableMap, setVariable } from "src/common";
import { CountActionConfig } from "src/config";
import { ActionHandler } from "./action.handler";
import { RegisterAction } from "./action.providers";

@RegisterAction(CountActionConfig)
export class CountActionHandler extends ActionHandler<
  CountActionConfig,
  "all"
> {
  private readonly logger: Logger = new Logger(CountActionHandler.name);
  public readonly select: "all";
  constructor(config: CountActionConfig) {
    super(config);
  }

  private getVariablePath(): string[] {
    if (this.config.storeUnder) {
      return [...this.config.storeUnder.split("."), this.config.variableName];
    }
    return [this.config.variableName];
  }

  protected async handle(
    element: WebElement[],
    variableMap: VariableMap
  ): Promise<VariableMap> {
    this.logger.log(`Getting element count of ${element}`);
    return setVariable(
      this.getVariablePath().join("."),
      element.length,
      variableMap
    );
  }
}
