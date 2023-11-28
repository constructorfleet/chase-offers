import { Selector } from "./selector";

export const addOffer = new Selector("mds-icon[type='ico_add_circle']", {
  timeout: 2000,
  optional: true,
});
export const offerAmount = new Selector("div[data-testid='offerAmount']", {
  timeout: 2000,
});
export const offerName = new Selector(
  "#content > div > div:nth-child(3) > div > div:nth-child(2) > div > div > div:nth-child(2) > h2",
  {
    timeout: 2000,
  }
);
export const offerExpires = new Selector(
  "#content > div > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > div >div > div:nth-child(2) > span",
  {
    timeout: 2000,
  }
);
export const offerCard = new Selector(
  "#content > div > div:nth-child(3) > div > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(2) > div > div:nth-child(2) > span",
  {
    timeout: 2000,
  }
);
export const backButton = new Selector("#mds-secondary-back-navbar", {
  shadowRoot: "#back-button",
  timeout: 2000,
});
