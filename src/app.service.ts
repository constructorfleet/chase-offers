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

type OfferDetails = {
  storeName: string;
  offerAmount: number;
  offerUnit: string;
  offerType: string;
};

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

  async getOfferDetails(): Promise<OfferDetails> {
    const storeElement = await selectors.offers.offerName.exec(this.driver);
    const offerElement = await selectors.offers.offerAmount.exec(this.driver);
    const storeName = await storeElement.getText();
    const offer = await offerElement.getText();
    const offerAmount = Number.parseInt(
      offer.match(/(?<amount>\d+)/).groups!["amount"]
    );
    const offerUnit = offer.match(/(?<unit>[\$%])/).groups!["unit"];
    const offerType = offer.match(/%? (?<type>[a-zA-Z].+)$/).groups!["type"];
    return {
      storeName,
      offerAmount,
      offerType,
      offerUnit,
    };
  }

  async addOffers(): Promise<OfferDetails[]> {
    const newOffers: OfferDetails[] = [];
    let offerButton: WebElement | null;
    while (
      (offerButton = await selectors.offers.addOffer.exec(this.driver)) !== null
    ) {
      const offerDetails = await this.getOfferDetails();
      newOffers.push(offerDetails);
      await selectors.offers.backButton.exec(this.driver);
    }
    return newOffers;
  }

  async processCards(): Promise<Record<string, OfferDetails[]>> {
    console.log("Waiting for card dropdown selector...");
    const newOffers: Record<string, OfferDetails[]> = {};
    let cardCount = 0;
    let cardIndex = 0;
    do {
      const dropdown = await selectors.account.cardSelect.exec(this.driver);
      const elements = await dropdown.findElements(By.css("mds-select-option"));
      cardCount = elements.length;
      const cardText = await selectors.account.cardSelectOption
        .replaceWith(`${cardIndex + 1}`)
        .exec(this.driver, async (element: WebElement) => {
          const text = await element.getText();
          await element.click();
          return text;
        });
      const card = cardText.match(/^(?<card>[^,]+)/).groups!["card"];
      newOffers[card] = await this.addOffers();
      cardIndex++;
    } while (cardIndex < cardCount);

    return newOffers;
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
      const newOffers = await this.processCards();
      console.dir(newOffers, { depth: 5 });
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
