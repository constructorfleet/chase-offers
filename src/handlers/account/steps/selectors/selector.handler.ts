import { Logger } from "@nestjs/common";
import { By, WebDriver, WebElement, until } from "selenium-webdriver";
import { VariableMap } from "src/common/types";
import { ActionConfigs, Select, SelectorConfig } from "src/config";
import { ActionCreator, ActionHandler, InjectActionFactory } from "./actions";

type SelectorReturn = {
  variableMap: VariableMap;
  elements: WebElement | WebElement[];
};

export class SelectorHandler {
  private readonly logger: Logger;
  private readonly cssSelector: string;
  private readonly isOptional: boolean;
  private readonly select: Select;
  private readonly templateReplacers?: Map<string, string> = undefined;
  private readonly shadowRootSelector?: string = undefined;
  private readonly iFrameSelector: string = "default";

  constructor(
    selectorConfig: SelectorConfig,
    @InjectActionFactory
    private readonly actionFactory: ActionCreator<ActionHandler<ActionConfigs>>
  ) {
    this.cssSelector = selectorConfig.cssSelector;
    this.isOptional = selectorConfig.isOptional;
    this.select = selectorConfig.select;
    this.templateReplacers = selectorConfig.templateReplacers;
    this.shadowRootSelector = selectorConfig.shadowRootCSSSelector;
    this.iFrameSelector = selectorConfig.iFrameSelector;
  }

  async handle(
    driver: WebDriver,
    variableMap: VariableMap,
    timeout: number
  ): Promise<SelectorReturn> {
    try {
      await this.switchFrame(driver, timeout);
      const elements = await this.getElements(driver, variableMap, timeout);
      return {
        variableMap, //await this.doAction(elements, variableMap),
        elements,
      };
    } catch (e) {
    } finally {
      await driver.switchTo().defaultContent();
    }
  }

  private replaceTemplatedString(
    templatedString: string,
    variableMap: VariableMap
  ): string {
    return Object.entries(this.templateReplacers ?? {}).reduce(
      (result, [replacer, variableName]) => {
        return result.replace(replacer, variableMap[variableName].toString());
      },
      templatedString
    );
  }

  private async switchFrame(driver: WebDriver, timeout: number) {
    this.logger.debug(`Switching to frame ${this.iFrameSelector}...`);
    if (this.iFrameSelector !== "default") {
      await driver.wait(
        until.ableToSwitchToFrame(By.css(this.iFrameSelector)),
        timeout
      );
    } else {
      await driver.switchTo().defaultContent();
    }
  }

  private async getElements(
    driver: WebDriver,
    variableMap: VariableMap,
    timeout: number
  ): Promise<WebElement | WebElement[]> {
    const selector = this.replaceTemplatedString(this.cssSelector, variableMap);
    this.logger.debug(
      `Locating ${this.select} using css selector '${selector}...`
    );
    if (this.select === "first") {
      const element = await driver.wait(
        until.elementLocated(By.css(selector)),
        timeout
      );
      await driver.wait(until.elementIsVisible(element), timeout);
      return element;
    }
    const elements = await driver.wait(
      until.elementsLocated(By.css(selector)),
      timeout
    );
    await driver.wait(until.elementIsVisible(elements[0]));
    return elements;
  }

  // protected abstract doAction(
  //   elements: Elements,
  //   variableMap: VariableMap
  // ): Promise<VariableMap>;
}
