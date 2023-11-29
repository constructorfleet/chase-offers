import { WebDriver } from "selenium-webdriver";
import { VariableMap } from "src/common/types";
import { StepConfig } from "../../../config/account/steps/index";
import { SelectorFactory } from "./selectors/selector.providers";

export abstract class StepHandler<StepConfigType extends StepConfig> {
  protected readonly timeout: number;
  protected readonly name: string;

  constructor(
    protected readonly stepConfig: StepConfigType,
    private readonly electorFactory: SelectorFactory
  ) {
    this.timeout = stepConfig.timeout;
    this.name = stepConfig.name;
  }

  abstract run(
    driver: WebDriver,
    variableMap: VariableMap
  ): Promise<VariableMap>;
}
