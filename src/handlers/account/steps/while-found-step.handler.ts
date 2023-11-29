import { WebDriver } from "selenium-webdriver";
import { VariableMap } from "src/common";
import { WhileFoundStepConfig } from "src/config";
import { SelectorFactory } from "./selectors/selector.providers";
import { StepHandler } from "./step.handler";
import { RegisterStep } from "./step.providers";

@RegisterStep(WhileFoundStepConfig)
export class WhileFoundStepHandler extends StepHandler<WhileFoundStepConfig> {
  constructor(
    stepConfig: WhileFoundStepConfig,
    selectorFactory: SelectorFactory
  ) {
    super(stepConfig, selectorFactory);
  }

  async run(driver: WebDriver, variableMap: VariableMap): Promise<VariableMap> {
    return variableMap;
  }
}
