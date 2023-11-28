import { Injectable, Scope } from "@nestjs/common";
import { WebDriver } from "selenium-webdriver";
import { VariableMap } from "src/common";
import { ForEachStepConfig } from "src/config";
import { StepHandler } from "./step.handler";

@Injectable({
  scope: Scope.TRANSIENT,
})
export class ForEachStepHandler extends StepHandler<ForEachStepConfig> {
  constructor(stepConfig: ForEachStepConfig) {
    super(stepConfig);
  }

  async run(driver: WebDriver, variableMap: VariableMap): Promise<VariableMap> {
    return variableMap;
  }
}
