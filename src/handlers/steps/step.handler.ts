import { WebDriver } from "selenium-webdriver";
import { VariableMap } from "src/common/types";
import { StepConfig } from "../../config/steps/index";

export abstract class StepHandler<StepConfigType extends StepConfig> {
  protected readonly timeout: number;
  protected readonly name: string;
  // protected readonly selectorHandler: SelectorHandler;

  constructor(stepConfig: StepConfigType) {
    this.timeout = stepConfig.timeout;
    this.name = stepConfig.name;
  }

  abstract run(
    driver: WebDriver,
    variableMap: VariableMap
  ): Promise<VariableMap>;
}
