import { Selector } from "./selector";

export const addOffer = new Selector("mds-icon[type='ico_add_circle']", {
  timeout: 2000,
  optional: true,
});
export const backButton = new Selector("#mds-secondary-back-navbar", {
  shadowRoot: "#back-button",
  timeout: 2000,
});
