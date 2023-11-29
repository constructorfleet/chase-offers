import { WebDriver } from "selenium-webdriver";
import { VariableMap } from "src/common";
import { SingleStepConfig } from "src/config";
import { SelectorFactory } from "./selectors/selector.providers";
import { StepHandler } from "./step.handler";
import { RegisterStep } from "./step.providers";

@RegisterStep(SingleStepConfig)
export class SingleStepHandler extends StepHandler<SingleStepConfig> {
  constructor(stepConfig: SingleStepConfig, selectorFactory: SelectorFactory) {
    super(stepConfig, selectorFactory);
  }
  async run(driver: WebDriver, variableMap: VariableMap): Promise<VariableMap> {
    return variableMap;
  }
}
