import { Logger } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { WebDriver } from "selenium-webdriver";
import { VariableMap } from "src/common";
import {
  CredentialConfigs,
  ForEachStep,
  ForEachStepConfig,
  StepConfigs,
} from "src/config";
import { SelectorFactory } from "./selectors/selector.providers";
import { StepHandler } from "./step.handler";
import { RegisterStep, StepCreator, StepCreatorKey } from "./step.providers";

@RegisterStep(ForEachStep)
export class ForEachStepHandler extends StepHandler<ForEachStepConfig> {
  private readonly logger: Logger = new Logger(
    `${ForEachStepHandler.name} - ${this.name}`
  );

  constructor(
    stepConfig: ForEachStepConfig,
    selectorFactory: SelectorFactory,
    private readonly moduleRef: ModuleRef
  ) {
    super(stepConfig, selectorFactory);
  }

  async run(
    driver: WebDriver,
    variableMap: VariableMap,
    credentials: CredentialConfigs
  ): Promise<VariableMap> {
    this.logger.log(`Handling selector...`);
    const stepCreator = this.moduleRef.get<
      StepCreator<StepHandler<StepConfigs>>
    >(StepCreatorKey, {
      strict: false,
    });
    const subSteps = this.stepConfig.forEach.map((step) =>
      stepCreator(step as StepConfigs)
    );
    variableMap = await this.selector.handle(
      driver,
      variableMap,
      credentials,
      this.timeout
    );
    const loopCount = variableMap[this.stepConfig.loopCountVariable];
    this.logger.log(`Handling for each ${loopCount}...`);
    for (let i = 0; i < loopCount; i++) {
      variableMap[this.stepConfig.indexVariable] = i + 1;
      for (const step of subSteps) {
        variableMap = await step.run(driver, variableMap, credentials);
      }
    }
    return variableMap;
  }
}
