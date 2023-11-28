import { Equals, IsNotEmpty, IsString } from "class-validator";
import { CredentialsConfig } from "./credentials.config";

export const BasicCredentials = "basic" as const;
export type BasicCredentials = typeof BasicCredentials;
export type BasicCredentialsProperties = "username" | "password";

export class BasicCredentialsConfig extends CredentialsConfig<BasicCredentialsProperties> {
  @Equals(BasicCredentials)
  type: BasicCredentials = BasicCredentials;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  async get(credential: BasicCredentialsProperties): Promise<string> {
    switch (credential) {
      case "username":
        return this.username;
      case "password":
        return this.password;
    }
  }
}
