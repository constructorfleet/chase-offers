import { Injectable, Scope } from "@nestjs/common";
import { WebDriver } from "selenium-webdriver";
import { VariableMap } from "src/common";
import { SingleStepConfig } from "../../config/steps/single-step.config";
import { StepHandler } from "./step.handler";

@Injectable({
  scope: Scope.TRANSIENT,
})
export class SingleStepHandler extends StepHandler<SingleStepConfig> {
  constructor(stepConfig: SingleStepConfig) {
    super(stepConfig);
  }
  async run(driver: WebDriver, variableMap: VariableMap): Promise<VariableMap> {
    return variableMap;
  }
}
