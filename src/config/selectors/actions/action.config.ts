import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";
import { VariablePathPattern } from "src/common";
import { Actions, VariableActions } from "./index";

export abstract class ActionConfig<Action extends Actions> {
  @IsEnum(Actions)
  @IsNotEmpty()
  abstract type: Action;
}

export abstract class VariableActionConfig<
  Action extends VariableActions,
> extends ActionConfig<Action> {
  @IsString()
  @IsNotEmpty()
  variableName: string;

  @IsString()
  @IsOptional()
  @Matches(VariablePathPattern)
  storeUnder?: string = undefined;
}
