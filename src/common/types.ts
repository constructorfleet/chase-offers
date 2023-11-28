export type VariableMap = Record<string, any>;

export const isRecord = (
  test: Record<string, unknown> | unknown
): test is Record<string, unknown> => typeof test === "object";
