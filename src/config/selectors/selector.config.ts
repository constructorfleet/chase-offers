import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from "class-validator";
import { MapUniqueKeys } from "class-validator-extended";
import { VariablePathPattern } from "src/common";
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

export class SelectorConfig<SelectOption extends Select = "all"> {
  @IsString()
  @IsNotEmpty()
  cssSelector: string;

  @IsBoolean()
  @IsOptional()
  isOptional: boolean = true;

  @IsEnum(Select)
  @IsNotEmpty()
  select: SelectOption;

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

  @IsArray({ each: true })
  @ArrayMinSize(1)
  @IsNotEmpty()
  @ValidateNested()
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
  })
  actions: ActionConfig<Actions>[];
}
