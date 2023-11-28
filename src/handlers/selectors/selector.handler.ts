// import { Logger } from "@nestjs/common";
// import { By, WebDriver, until } from "selenium-webdriver";
// import {
//   SelectedElements,
//   SelectorResult,
//   VariableMap,
// } from "src/common/types";

// export class SelectorHandler<
//   SelectorConfigType extends SelectorConfigs,
//   SelectOption = SelectorConfigType["select"],
//   SelectorReturnType = SelectorResult<SelectorConfigType>,
//   Elements = SelectedElements<SelectorConfigType>,
// > {
//   protected readonly logger: Logger;
//   protected readonly cssSelector: string;
//   protected readonly isOptional: boolean;
//   protected readonly select: SelectOption;
//   protected readonly templateReplacers?: Map<string, string> = undefined;
//   protected readonly shadowRootSelector?: string = undefined;
//   protected readonly iFrameSelector: string = "default";

//   protected constructor(selectorConfig: SelectorConfigType) {
//     this.cssSelector = selectorConfig.cssSelector;
//     this.isOptional = selectorConfig.isOptional;
//     this.select = selectorConfig.select as SelectOption;
//     this.templateReplacers = selectorConfig.templateReplacers;
//     this.shadowRootSelector = selectorConfig.shadowRootCSSSelector;
//     this.iFrameSelector = selectorConfig.iFrameSelector;
//   }

//   async handle(
//     driver: WebDriver,
//     variableMap: VariableMap,
//     timeout: number
//   ): Promise<SelectorReturnType> {
//     try {
//       await this.switchFrame(driver, timeout);
//       const elements = await this.getElements(driver, variableMap, timeout);
//       return {
//         variableMap: await this.doAction(elements, variableMap),
//         elements,
//       } as SelectorReturnType;
//     } catch (e) {
//     } finally {
//       await driver.switchTo().defaultContent();
//     }
//   }

//   private replaceTemplatedString(
//     templatedString: string,
//     variableMap: VariableMap
//   ): string {
//     return Object.entries(this.templateReplacers ?? {}).reduce(
//       (result, [replacer, variableName]) => {
//         return result.replace(replacer, variableMap[variableName].toString());
//       },
//       templatedString
//     );
//   }

//   private async switchFrame(driver: WebDriver, timeout: number) {
//     this.logger.debug(`Switching to frame ${this.iFrameSelector}...`);
//     if (this.iFrameSelector !== "default") {
//       await driver.wait(
//         until.ableToSwitchToFrame(By.css(this.iFrameSelector)),
//         timeout
//       );
//     } else {
//       await driver.switchTo().defaultContent();
//     }
//   }

//   private async getElements(
//     driver: WebDriver,
//     variableMap: VariableMap,
//     timeout: number
//   ): Promise<Elements> {
//     const selector = this.replaceTemplatedString(this.cssSelector, variableMap);
//     this.logger.debug(
//       `Locating ${this.select} using css selector '${selector}...`
//     );
//     if (this.select === "first") {
//       const element = await driver.wait(
//         until.elementLocated(By.css(selector)),
//         timeout
//       );
//       await driver.wait(until.elementIsVisible(element), timeout);
//       return element as Elements;
//     }
//     const elements = await driver.wait(
//       until.elementsLocated(By.css(selector)),
//       timeout
//     );
//     await driver.wait(until.elementIsVisible(elements[0]));
//     return elements as Elements;
//   }

//   protected abstract doAction(
//     elements: Elements,
//     variableMap: VariableMap
//   ): Promise<VariableMap>;
// }
