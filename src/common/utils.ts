import { VariableMap, isRecord } from "./types";

type TransformFn<TResult> = (value: string) => TResult;

const defaultTransformFn = <TResult>(value: string) => value as TResult;

const getNestedProperty = (
  source: Record<string, unknown>,
  path: string[]
): unknown | null =>
  path.reduce((source: Record<string, unknown> | null, segment: string) => {
    if (source !== null && source instanceof Object && segment in source) {
      return source[segment];
    }
    return null;
  }, source);

const setNestedProperty = (
  source: Record<string, Record<string, unknown> | unknown>,
  path: string[],
  value: unknown
): Record<string, unknown> => {
  const [segment, remainder] = [path[0], path.slice(1)];
  if (remainder.length === 0) {
    source[segment] = value;
  } else {
    const next = source[segment];
    if (isRecord(next)) {
      source[segment] = setNestedProperty(next, remainder, value);
    } else {
      source[segment] = setNestedProperty({}, remainder, value);
    }
  }
  return source;
};

export const getVariable = <TResult = string>(
  variablePath: string,
  variableMap: VariableMap,
  transformFn: TransformFn<TResult> = defaultTransformFn
): TResult | null => {
  const result = getNestedProperty(variableMap, variablePath.split("."));
  if (result === null) {
    return null;
  }
  return transformFn(result.toString());
};

export const setVariable = (
  variablePath: string,
  value: unknown,
  variableMap: VariableMap
): VariableMap =>
  setNestedProperty(variableMap, variablePath.split("."), value);
