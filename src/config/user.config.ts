import { Type } from "class-transformer";
import {
  ArrayMinSize,
  ArrayUnique,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from "class-validator";
import { AccountConfig, AccountType, AccountTypes } from "./account.config";
import {
  BasicCredentialsConfig,
  CredentialsConfig,
  TOTPCredentialsConfig,
} from "./credentials";

export class UserAccountConfig {
  @IsEnum(AccountTypes)
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
  id: string;

  @ArrayUnique<AccountConfig>((account) => account.type)
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => UserAccountConfig)
  accounts: UserAccountConfig[];
}
