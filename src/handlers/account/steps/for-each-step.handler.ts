import { WebDriver } from "selenium-webdriver";
import { VariableMap } from "src/common";
import { ForEachStepConfig } from "src/config";
import { SelectorFactory } from "./selectors/selector.providers";
import { StepHandler } from "./step.handler";
import { RegisterStep } from "./step.providers";

@RegisterStep(ForEachStepConfig)
export class ForEachStepHandler extends StepHandler<ForEachStepConfig> {
  constructor(stepConfig: ForEachStepConfig, selectorFactory: SelectorFactory) {
    super(stepConfig, selectorFactory);
  }

  async run(driver: WebDriver, variableMap: VariableMap): Promise<VariableMap> {
    return variableMap;
  }
}
