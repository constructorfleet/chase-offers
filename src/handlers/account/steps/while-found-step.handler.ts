import { Logger } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { WebDriver } from "selenium-webdriver";
import { VariableMap } from "src/common";
import {
  CredentialConfigs,
  StepConfigs,
  WhileFoundStep,
  WhileFoundStepConfig,
} from "src/config";
import { SelectorFactory } from "./selectors/selector.providers";
import { StepHandler } from "./step.handler";
import { RegisterStep, StepCreator, StepCreatorKey } from "./step.providers";

@RegisterStep(WhileFoundStep)
export class WhileFoundStepHandler extends StepHandler<WhileFoundStepConfig> {
  private readonly logger: Logger = new Logger(
    `${WhileFoundStepHandler.name} - ${this.name}`
  );

  constructor(
    stepConfig: WhileFoundStepConfig,
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
    this.logger.log(`Handling while found selector...`);
    const stepCreator = this.moduleRef.get<
      StepCreator<StepHandler<StepConfigs>>
    >(StepCreatorKey, {
      strict: false,
    });
    const subSteps = this.stepConfig.whileFound.map((step) =>
      stepCreator(step as StepConfigs)
    );
    try {
      let i = 0;
      while (
        (variableMap = await this.selector.handle(
          driver,
          variableMap,
          credentials,
          this.timeout
        ))
      ) {
        if (variableMap["error"] === "not_found") {
          delete variableMap["error"];
          return variableMap;
        }
        this.logger.log(`Handling while found steps...`);
        variableMap[this.stepConfig.indexVariable] = ++i;
        for (const step of subSteps) {
          variableMap = await step.run(driver, variableMap, credentials);
        }
      }
      return variableMap;
    } catch (e) {
      this.logger.error(`Error: ${e}`);
      throw new Error(e);
    }
  }
}
