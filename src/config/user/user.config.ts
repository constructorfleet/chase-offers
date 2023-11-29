import { Type } from "class-transformer";
import {
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from "class-validator";
import { AccountType } from "../account/account.config";
import {
  BasicCredentialsConfig,
  CredentialsConfig,
  TOTPCredentialsConfig,
} from "./credentials";

export type UserType = string;

export class UserAccountConfig {
  @IsString()
  @IsNotEmpty()
  type: AccountType;

  @Type(() => CredentialsConfig, {
    discriminator: {
      property: "type",
      subTypes: [
        { value: BasicCredentialsConfig, name: "basic" },
        { value: TOTPCredentialsConfig, name: "totp" },
      ],
    },
    keepDiscriminatorProperty: true,
  })
  @ValidateNested()
  credentials: CredentialsConfig<string>;
}

export class UserConfig {
  @IsString()
  @IsNotEmpty()
  id: UserType;

  @IsArray()
  @ArrayUnique((config) => config.type)
  accounts: AccountType[];
}
