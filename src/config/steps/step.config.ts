import { Type } from "class-transformer";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";
import { Steps } from ".";
import { Select, SelectorConfig } from "../selectors/selector.config";

export abstract class StepConfig {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Steps)
  @IsNotEmpty()
  abstract type: Steps;

  @IsNumber()
  @IsOptional()
  @Min(1000)
  @Type(() => Number)
  timeout: number = 10000;

  @ValidateNested()
  @Type(() => SelectorConfig)
  selector: SelectorConfig<Select>;
}
