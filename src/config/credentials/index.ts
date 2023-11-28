export * from "./basic-credentials.config";
export * from "./credentials.config";
export * from "./totp-credentials.config";

import {
  BasicCredentials,
  BasicCredentialsConfig,
} from "./basic-credentials.config";

import {
  TOTPCredentials,
  TOTPCredentialsConfig,
} from "./totp-credentials.config";

export const Credentials = [BasicCredentials, TOTPCredentials] as const;
export type Credentials = (typeof Credentials)[number];
export type CredentialConfigs = BasicCredentialsConfig | TOTPCredentialsConfig;
export type CredentialKeys =
  | keyof BasicCredentialsConfig
  | keyof TOTPCredentialsConfig;
