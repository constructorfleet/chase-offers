import { Logger } from "@nestjs/common";
import { WebDriver } from "selenium-webdriver";
import { VariableMap } from "src/common";
import { CredentialConfigs, SingleStep, SingleStepConfig } from "src/config";
import { SelectorFactory } from "./selectors/selector.providers";
import { StepHandler } from "./step.handler";
import { RegisterStep } from "./step.providers";

@RegisterStep(SingleStep)
export class SingleStepHandler extends StepHandler<SingleStepConfig> {
  private readonly logger: Logger = new Logger(
    `${SingleStepHandler.name} - ${this.name}`
  );

  constructor(stepConfig: SingleStepConfig, selectorFactory: SelectorFactory) {
    super(stepConfig, selectorFactory);
  }
  async run(
    driver: WebDriver,
    variableMap: VariableMap,
    credentials: CredentialConfigs
  ): Promise<VariableMap> {
    this.logger.log(`Handling selector...`);
    return await this.selector.handle(
      driver,
      variableMap,
      credentials,
      this.timeout
    );
  }
}
