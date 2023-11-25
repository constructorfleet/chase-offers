import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Builder, By, WebDriver, WebElement } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import { AppConfig } from './app.config';
import { addOfferSelector, backButtonSelector, backNavSelector, cardSelectSelector, logInButtonSelector, offersSelector, passwordSelector, rememberMeSelector, signInButtonSelector, usernameSelector, } from './app.const';

const chromeOptions = new Options();
chromeOptions.addArguments('--no-sandbox --headless');

@Injectable()
export class AppService {
  private driver: WebDriver;
  constructor(
    @Inject(AppConfig.KEY) private readonly appConfig: ConfigType<typeof AppConfig>,) {
    // private readonly driver: WebDriver,) {
  }

  async authenticate() {
    console.log("Authenticating...");
    const signInButton = await this.safeFindElement(signInButtonSelector);
    if (signInButton !== null) {
      await signInButton.click()
    }

    const userNameElement = await this.driver.findElement(By.css(usernameSelector));
    const passwordElement = await this.driver.findElement(By.css(passwordSelector));
    const rememberMeElement = await this.driver.findElement(By.css(rememberMeSelector));
    const loginElement = await this.driver.findElement(By.css(logInButtonSelector));
    await userNameElement.sendKeys(this.appConfig.username);
    await passwordElement.sendKeys(this.appConfig.password);
    await rememberMeElement.click();
    await loginElement.click()
  }

  async addOffer(buttonElement: WebElement) {
    await buttonElement.click();
    const backNav = await this.driver.findElement(By.css(backNavSelector));
    const shadow = await backNav.getShadowRoot();
    const backButton = await shadow.findElement(By.css(backButtonSelector));
    await backButton.click();
  }

  async addOffers() {
    let offerButton: WebElement | null = null;
    while ((offerButton = await this.safeFindElement(addOfferSelector)) !== null) {
      await this.addOffer(offerButton);
    }
  }

  async processCards() {
    const dropdown = await this.driver.findElement(By.css(cardSelectSelector));
    let cardCount = 0;
    let cardIndex = 0;
    do {
      dropdown.click();
      cardCount = await dropdown.findElements(By.css("mds-select-option"))
        .then((elements) => {
          return elements.length;
        });
      const cardOption = await this.driver.findElement(By.css(`#select-credit-card-account > mds-select-option:nth-child(${cardIndex + 1})`));
      await cardOption.click();
    } while (cardIndex < cardCount);
  }

  async navigateToOffers() {
    const offers = await this.driver.findElement(By.css(offersSelector));
    await offers.click();
  }

  async run() {
    this.driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(chromeOptions)
      .build();
    console.log("Running...");
    await this.driver.navigate().to("https://chase.com");
    await this.authenticate();
    // await this.navigateToOffers();
    // await this.processCards();
  }

  async safeFindElement(selector: string): Promise<WebElement | null> {
    try {
      return await this.driver.findElement(By.css(selector));
    } catch (e) {
      return null;
    }
  }

  getHello(): string {
    return 'Hello World!';
  }
}
