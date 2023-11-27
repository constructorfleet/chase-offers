import { Selector } from "./selector";

export const signInButton = new Selector("a.signInBtn", {
  optional: true,
  timeout: 10000,
});
