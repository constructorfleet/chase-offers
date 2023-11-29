import { IsNotEmpty, IsOptional, IsString, Matches } from "class-validator";
import { VariablePathPattern, VariableSegmentPattern } from "src/common";
import { Actions, VariableActions } from "./index";

export abstract class ActionConfig<Action extends Actions> {
  @IsNotEmpty()
  abstract type: Action;
}

export abstract class VariableActionConfig<
  Action extends VariableActions,
> extends ActionConfig<Action> {
  @IsString()
  @IsNotEmpty()
  @Matches(VariableSegmentPattern)
  variableName: string;

  @IsString()
  @IsOptional()
  @Matches(VariablePathPattern)
  storeUnder?: string = undefined;
}
