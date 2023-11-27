import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { Builder, By, WebDriver, WebElement, until } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome";
import { AppConfig } from "./app.config";
import { selectors } from "./selector";

const chromeOptions = new Options();
chromeOptions.addArguments("--no-sandbox");
chromeOptions.addArguments("--user-data-dir=/Users/tglenn/.webdriver");
chromeOptions.addArguments("--profile-directory=ajanis");

const sleep = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });

@Injectable()
export class AppService {
  private driver: WebDriver;
  constructor(
    @Inject(AppConfig.KEY)
    private readonly appConfig: ConfigType<typeof AppConfig>
  ) {}

  async enterCredentials() {
    await selectors.auth.username.exec(this.driver, (element: WebElement) =>
      element.sendKeys(this.appConfig.username)
    );
    await selectors.auth.password.exec(this.driver, (element: WebElement) =>
      element.sendKeys(this.appConfig.password)
    );
    await selectors.auth.loginButton.exec(this.driver);
  }

  async authenticate() {
    console.log("Authenticating...");
    await selectors.preAuth.signInButton.exec(this.driver);
    await this.enterCredentials();
  }

  async addOffers() {
    let offerButton: WebElement | null;
    while (
      (offerButton = await selectors.offers.addOffer.exec(this.driver)) !== null
    ) {
      await selectors.offers.backButton.exec(this.driver);
    }
  }

  async processCards() {
    console.log("Waiting for card dropdown selector...");
    let cardCount = 0;
    let cardIndex = 0;
    do {
      const dropdown = await selectors.account.cardSelect.exec(this.driver);
      cardCount = await dropdown
        .findElements(By.css("mds-select-option"))
        .then((elements) => {
          return elements.length;
        });
      await selectors.account.cardSelectOption
        .replaceWith(`${cardIndex + 1}`)
        .exec(this.driver);
      await this.addOffers();
      cardIndex++;
    } while (cardIndex < cardCount);
  }

  async navigateToOffers() {
    console.log("Waiting for offers button...");
    await selectors.account.offers.exec(this.driver);
  }

  async run() {
    try {
      this.driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions)
        .build();
      console.log("Running...");
      await this.driver.navigate().to("https://chase.com");
      await this.authenticate();
      await this.navigateToOffers();
      await this.processCards();
    } finally {
      await this.driver.close();
    }
  }

  async safeFindElement(selector: string): Promise<WebElement | null> {
    try {
      return await this.driver.findElement(By.css(selector));
    } catch (e) {
      return null;
    }
  }

  async safeWaitForElement(
    selector: string,
    timeout: number
  ): Promise<WebElement | null> {
    try {
      const element = await this.driver.wait(
        until.elementLocated(By.css(selector)),
        timeout
      );
      await this.driver.wait(until.elementIsVisible(element), timeout);
      return element;
    } catch (e) {
      return null;
    }
  }

  getHello(): string {
    return "Hello World!";
  }
}
