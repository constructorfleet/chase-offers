import { Selector } from "./selector";

export const username = new Selector("input[name='userId']", {
  iFrame: "iFrame#logonbox",
  timeout: 10000,
});
export const password = new Selector("input[name='password']", {
  iFrame: "iFrame#logonbox",
  timeout: 10000,
});
export const loginButton = new Selector("button[type='submit']", {
  iFrame: "iFrame#logonbox",
  timeout: 10000,
});
