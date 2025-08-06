export enum ValidationStateEnum {
  Valid = "valid",
  Invalid = "invalid",
}

export type ValidationState =
  | ValidationStateEnum.Invalid
  | ValidationStateEnum.Valid;
