import { DiscoveryService } from "@golevelup/nestjs-discovery";
import { Injectable, Logger } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { By, WebDriver, WebElement, until } from "selenium-webdriver";
import { AppConfig } from "./app.config";
import { AppConfig as RootConfig } from "./config";
import { UserHandler } from "./handlers/user/user.handler";
import { selectors } from "./selector";

type OfferDetails = {
  storeName: string;
  offerAmount: number;
  offerUnit: string;
  offerType: string;
};

@Injectable()
export class AppService {
  private readonly logger: Logger = new Logger(AppService.name);
  private readonly appConfig: ConfigType<typeof AppConfig> = {
    username: process.env.CHASE_USERNAME,
    password: process.env.CHASE_PASSWORD,
    userId: process.env.USER_ID,
  };
  private driver: WebDriver;
  constructor(
    // @Inject(AppConfig.KEY)
    private readonly config: RootConfig,
    private readonly users: UserHandler,
    private readonly discover: DiscoveryService
  ) {
    this.logger.log(users);
  }

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
    await selectors.account.offers.exec(this.driver);
  }
  async run() {
    while (await this.users.next()) {
      console.dir(await this.users.handle(), { depth: 10 });
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
