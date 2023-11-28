import { WebElement } from "selenium-webdriver";
import { VariableMap, setVariable } from "src/common";
import { CredentialConfigs, TextActionConfig } from "src/config";
import { ActionHandler } from "./action.handler";

const regex = (variable: string, captureGroup: string): RegExp =>
  new RegExp(`(?:<${variable}>${captureGroup})`);
const getGroup = (variable: string, match: RegExpMatchArray): string | null =>
  variable in (match.groups ?? {}) ? match.groups![variable] : null;

export class TextActionHandler extends ActionHandler<
  TextActionConfig,
  CredentialConfigs,
  VariableMap
> {
  constructor(config: TextActionConfig) {
    super(config);
  }

  private getVariablePath(): string[] {
    return [
      ...(this.config.storeUnder ?? "").split("."),
      this.config.variableName,
    ];
  }

  protected async handle(
    element: WebElement,
    variableMap: VariableMap
  ): Promise<VariableMap> {
    const text = await element.getText();
    const result = Object.entries(this.config.regexCaptureGroups || {}).reduce(
      (result: Record<string, unknown>, [variable, captureGroup]) => {
        result[variable] = getGroup(
          variable,
          text.match(regex(variable, captureGroup))
        );
        return result;
      },
      {} as Record<string, unknown>
    );

    return setVariable(
      this.getVariablePath().join("."),
      this.config.variableName,
      variableMap
    );
  }
}
