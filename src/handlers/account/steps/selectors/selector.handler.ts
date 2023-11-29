import { Logger } from "@nestjs/common";
import { By, WebDriver, WebElement, until } from "selenium-webdriver";
import { ShadowRootPromise } from "selenium-webdriver/lib/webdriver";
import { replaceTemplatedString } from "src/common";
import { VariableMap } from "src/common/types";
import {
  ActionConfigs,
  CredentialConfigs,
  Select,
  SelectorConfig,
} from "src/config";
import { ActionCreator, ActionHandler, InjectActionFactory } from "./actions";

type SelectorReturn = {
  variableMap: VariableMap;
  elements: WebElement | WebElement[];
};

export class SelectorHandler {
  private readonly logger: Logger = new Logger(SelectorHandler.name);
  private readonly cssSelector: string;
  private readonly isOptional: boolean;
  private readonly select: Select;
  private readonly templateReplacers?: Map<string, string> = undefined;
  private readonly shadowRootSelector?: string = undefined;
  private readonly iFrameSelector: string = "default";
  private readonly actions: ActionHandler<ActionConfigs>[];

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
    this.actions = selectorConfig.actions.map((action) =>
      actionFactory(action as ActionConfigs)
    );
  }

  async handle(
    driver: WebDriver,
    variableMap: VariableMap,
    credentials: CredentialConfigs,
    timeout: number
  ): Promise<VariableMap> {
    this.logger.log(`Replacing selector`);
    let selector = this.cssSelector;
    if (this.templateReplacers && this.templateReplacers.size > 0) {
      this.templateReplacers.forEach((value, key) => {
        selector = selector.replace(key, variableMap[value]);
      });
    }
    try {
      await this.switchFrame(driver, timeout);
      const elements = await this.getElements(driver, variableMap, timeout);
      this.logger.log(`Running actions ${this.actions.length}`);
      for (const action of this.actions) {
        this.logger.log(`Running action ${action}`);
        variableMap = await action.execute(elements, variableMap, credentials);
      }
      return variableMap;
    } catch (e) {
      if (this.isOptional) {
        this.logger.warn(`Optional, got ${e}`);
        variableMap["error"] = "NOT_FOUND";
        return variableMap;
      }
      this.logger.error(e);
      throw e;
    } finally {
      this.logger.log(`Switching to default content`);
      await driver.switchTo().defaultContent();
    }
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
  ): Promise<WebElement[]> {
    const selector = replaceTemplatedString(
      this.cssSelector,
      variableMap,
      this.templateReplacers
    );
    this.logger.debug(
      `Locating ${this.select} using css selector '${selector}...`
    );
    const elements = await driver.wait(
      until.elementsLocated(By.css(selector)),
      timeout
    );
    await driver.wait(until.elementIsVisible(elements[0]), timeout);
    if (this.shadowRootSelector) {
      const shadowElements = await Promise.all(
        elements.map(async (element) =>
          this.getShadowRootElements(
            element.getShadowRoot(),
            this.shadowRootSelector,
            variableMap
          )
        )
      );
      return shadowElements.flat();
    }
    return elements;
  }

  private async getShadowRootElements(
    shadowRoot: ShadowRootPromise,
    cssSelector: string,
    variableMap: VariableMap
  ): Promise<WebElement[]> {
    const selector = replaceTemplatedString(
      cssSelector,
      variableMap,
      this.templateReplacers
    );
    return await (await shadowRoot).findElements(By.css(selector));
  }
}
