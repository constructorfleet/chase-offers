import { Injectable, Scope } from "@nestjs/common";
import { WebDriver } from "selenium-webdriver";
import { VariableMap } from "src/common";
import { WhileFoundStepConfig } from "src/config";
import { StepHandler } from "./step.handler";

@Injectable({
  scope: Scope.TRANSIENT,
})
export class WhileFoundStepHandler extends StepHandler<WhileFoundStepConfig> {
  constructor(stepConfig: WhileFoundStepConfig) {
    super(stepConfig);
  }

  async run(driver: WebDriver, variableMap: VariableMap): Promise<VariableMap> {
    return variableMap;
  }
}
