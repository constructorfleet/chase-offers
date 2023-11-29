import { Equals, IsNotEmpty, IsString } from "class-validator";
import { CredentialsConfig } from "./credentials.config";

export const TOTPCredentials = "totp" as const;
export type TOTPCredentials = typeof TOTPCredentials;
export type TOTPCredentialsProperties = "username" | "password" | "otp";

export class TOTPCredentialsConfig extends CredentialsConfig<TOTPCredentialsProperties> {
  @Equals(TOTPCredentials)
  type: TOTPCredentials = TOTPCredentials;

  @IsString()
  @IsNotEmpty()
  totpSecret: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  async otp(): Promise<string> {
    return "";
  }

  async get(credential: TOTPCredentialsProperties): Promise<string> {
    switch (credential) {
      case "username":
        return this.username;
      case "password":
        return this.password;
      case "otp":
        return await this.otp();
    }
  }
}
