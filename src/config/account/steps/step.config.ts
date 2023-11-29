import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";
import { Steps } from ".";
import { SelectorConfig } from "./selectors/selector.config";

export abstract class StepConfig {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: Steps = "single";

  @IsNumber()
  @IsOptional()
  @Min(1000)
  @Type(() => Number)
  timeout: number = 2000;

  @ValidateNested()
  @Type(() => SelectorConfig)
  selector: SelectorConfig;
}
