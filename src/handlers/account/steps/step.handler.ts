import { WebDriver } from "selenium-webdriver";
import { VariableMap } from "src/common/types";
import { CredentialConfigs } from "src/config";
import { StepConfig } from "../../../config/account/steps/index";
import { SelectorHandler } from "./selectors";
import { SelectorFactory } from "./selectors/selector.providers";

export abstract class StepHandler<StepConfigType extends StepConfig> {
  protected readonly timeout: number;
  protected readonly name: string;
  protected readonly selector: SelectorHandler = this.selectorFactory(
    this.stepConfig.selector
  );

  constructor(
    protected readonly stepConfig: StepConfigType,
    protected readonly selectorFactory: SelectorFactory
  ) {
    this.timeout = stepConfig.timeout;
    this.name = stepConfig.name;
  }

  abstract run(
    driver: WebDriver,
    variableMap: VariableMap,
    credentials: CredentialConfigs
  ): Promise<VariableMap>;
}
