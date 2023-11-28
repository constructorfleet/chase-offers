import { WebElement } from "selenium-webdriver";
import { Select, SelectorConfig } from "src/config";

export type VariableMap = Record<string, any>;

export type SelectedElements<
  SelectorConfigType extends SelectorConfig<Select>,
  SelectOption = SelectorConfigType["select"],
> = SelectOption extends "first" ? WebElement : WebElement[];

export type SelectorResult<
  SelectorConfigType extends SelectorConfig<Select>,
  Elements = SelectedElements<SelectorConfigType>,
> = {
  variableMap: VariableMap;
  elements: Elements;
};

export const isRecord = (
  test: Record<string, unknown> | unknown
): test is Record<string, unknown> => typeof test === "object";
