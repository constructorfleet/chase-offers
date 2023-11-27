import { Logger } from "@nestjs/common";
import { By, WebDriver, WebElement, until } from "selenium-webdriver";

export type SelectorOptions<ReplacerText extends string = undefined> = {
  optional?: boolean;
  iFrame?: "default" | string;
  timeout?: number;
  templateReplacer?: ReplacerText;
  shadowRoot?: string;
};

export class Selector<ReplacerText extends string = undefined> {
  private readonly logger: Logger;
  private textReplacement?: string = undefined;

  constructor(
    private readonly cssSelector: string,
    private readonly options: SelectorOptions<ReplacerText> = {
      optional: true,
      iFrame: "default",
      timeout: 5000,
    }
  ) {
    this.logger = new Logger(cssSelector);
    this.options.iFrame = this.options.iFrame ?? "default";
    this.options.optional = this.options.optional ?? false;
    this.options.timeout = this.options.timeout ?? 5000;
    this.options.templateReplacer = this.options.templateReplacer ?? undefined;
    this.options.shadowRoot = this.options.shadowRoot ?? undefined;
  }

  replaceWith(textReplacement: string): this {
    this.textReplacement = textReplacement;
    return this;
  }

  async exec(
    driver: WebDriver,
    action: (element: WebElement) => Promise<void> = async (
      element: WebElement
    ) => element.click()
  ): Promise<WebElement | null> {
    if (this.options.templateReplacer && !this.textReplacement) {
      throw new Error("Must provide text replacement for selector");
    }
    let selector = this.cssSelector;
    if (this.options.templateReplacer && this.textReplacement) {
      selector = selector.replace(
        this.options.templateReplacer,
        this.textReplacement
      );
    }
    try {
      await this.switchFrame(driver);
      const element = await this.getElement(driver, selector);
      await action(element);
      return element;
    } catch (e) {
      if (!this.options.optional) {
        throw e;
      }
      return null;
    } finally {
      await driver.switchTo().defaultContent();
    }
  }

  private async switchFrame(driver: WebDriver) {
    this.logger.log(`Switching to frame ${this.options.iFrame}...`);
    if (this.options.iFrame !== "default") {
      await driver.wait(
        until.ableToSwitchToFrame(By.css(this.options.iFrame)),
        this.options.timeout
      );
    } else {
      await driver.switchTo().defaultContent();
    }
  }

  private async getElement(
    driver: WebDriver,
    selector: string
  ): Promise<WebElement> {
    this.logger.log(`Getting element ${selector}...`);
    const element = await driver.wait(
      until.elementLocated(By.css(selector)),
      this.options.timeout
    );
    await driver.wait(until.elementIsVisible(element), this.options.timeout);
    if (this.options.shadowRoot) {
      const shadowRoot = await element.getShadowRoot();
      return await shadowRoot.findElement(By.css(this.options.shadowRoot));
    }
    return element;
  }
}
