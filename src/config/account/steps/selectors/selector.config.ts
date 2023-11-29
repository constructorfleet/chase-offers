import { Injectable } from "@nestjs/common";
import { Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
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

@Injectable()
export class SelectorConfig {
  @IsString()
  @IsNotEmpty()
  cssSelector: string;

  @IsBoolean()
  @IsOptional()
  isOptional: boolean = false;

  @IsEnum(Select)
  @IsNotEmpty()
  select: Select = "first";

  @IsOptional()
  // @Matches(VariablePathPattern, { each: true })
  templateReplacers: Map<string, string> = undefined;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  shadowRootCSSSelector: string = undefined;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  iFrameSelector: string = "default";

  @IsArray()
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
    keepDiscriminatorProperty: true,
  })
  actions: ActionConfig<Actions>[];
}
