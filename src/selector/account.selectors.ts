import { Selector } from "./selector";

export const offers = new Selector(
  "div[data-testid='offer-carousel-header-container']",
  {
    timeout: 120000,
  }
);
export const cardSelect = new Selector("#select-credit-card-account", {
  timeout: 10000,
});
export const cardSelectOption = new Selector<"{index}">(
  "#select-credit-card-account > mds-select-option:nth-child({index})",
  {
    templateReplacer: "{index}",
    timeout: 10000,
  }
);
