import { Type } from "class-transformer";
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";
import { MapUniqueKeys } from "class-validator-extended";
import { EnsureArray, VariablePathPattern } from "src/common";
import {
  ActionConfig,
  Actions,
  ClickAction,
  ClickActionConfig,
  CountAction,
  CountActionConfig,
  SendKeysAction,
  SendKeysActionConfig,
  TextAction,
  TextActionConfig,
} from "./actions";

const Select = ["first", "all"] as const;

export type Select = (typeof Select)[number];

export class SelectorConfig {
  @IsString()
  @IsNotEmpty()
  cssSelector: string;

  @IsBoolean()
  @IsOptional()
  isOptional: boolean = true;

  @IsEnum(Select)
  @IsNotEmpty()
  select: Select = "first";

  @IsOptional()
  @MapUniqueKeys((key) => key)
  @Matches(VariablePathPattern, { each: true })
  templateReplacers: Map<string, string> = undefined;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  shadowRootCSSSelector: string = undefined;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  iFrameSelector: string = "default";

  @EnsureArray
  @Type(() => ActionConfig, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: ClickActionConfig, name: ClickAction },
        { value: CountActionConfig, name: CountAction },
        { value: SendKeysActionConfig, name: SendKeysAction },
        { value: TextActionConfig, name: TextAction },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  actions: ActionConfig<Actions>[];
}
