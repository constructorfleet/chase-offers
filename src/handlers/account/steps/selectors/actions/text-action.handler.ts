import { Logger } from "@nestjs/common";
import { WebElement } from "selenium-webdriver";
import { VariableMap, replaceTemplatedString, setVariable } from "src/common";
import { CredentialConfigs, TextActionConfig } from "src/config";
import { ActionHandler } from "./action.handler";
import { RegisterAction } from "./action.providers";

const removeStartAnchor = (captureGroup: string): string =>
  captureGroup.startsWith("^") ? captureGroup.slice(1) : captureGroup;

const removeEndAnchor = (captureGroup: string): string =>
  captureGroup.endsWith("$")
    ? captureGroup.slice(0, captureGroup.length - 1)
    : captureGroup;

const removeAnchors = (captureGroup: string): string =>
  removeStartAnchor(removeEndAnchor(captureGroup));

const startAnchor = (captureGoup: string): string =>
  captureGoup.startsWith("^") ? "^" : "";

const endAnchor = (captureGroup: string): string =>
  captureGroup.endsWith("$") ? "$" : "";

const regex = (variable: string, captureGroup: string): RegExp =>
  new RegExp(
    `${startAnchor(captureGroup)}(?<${variable}>${removeAnchors(
      captureGroup
    )})${endAnchor(captureGroup)}`
  );
const getGroup = (variable: string, match: RegExpMatchArray): string | null =>
  variable in (match.groups ?? {}) ? match.groups![variable] : null;

@RegisterAction(TextActionConfig)
export class TextActionHandler extends ActionHandler<
  TextActionConfig,
  "first",
  CredentialConfigs
> {
  private readonly logger: Logger = new Logger(TextActionHandler.name);
  public readonly select: "first";
  constructor(config: TextActionConfig) {
    super(config);
  }

  private getVariablePath(variableMap: VariableMap): string[] {
    if (this.config.storeUnder) {
      const storeUnder = replaceTemplatedString(
        this.config.storeUnder,
        variableMap,
        this.config.templateReplacers
      );
      return [...storeUnder.split("."), this.config.variableName];
    }
    return [this.config.variableName];
  }

  protected async handle(
    element: WebElement[],
    variableMap: VariableMap
  ): Promise<VariableMap> {
    this.logger.log(`Getting text`);
    const text = await element[0].getText();
    this.logger.log(`Got text ${text}`);
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
      this.getVariablePath(variableMap).join("."),
      result,
      variableMap
    );
  }
}
