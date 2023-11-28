import { Type } from "class-transformer";
import {
  ArrayMinSize,
  ArrayUnique,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from "class-validator";
import { AccountConfig } from "./account.config";
import { UserConfig } from "./user.config";

export class RootConfig {
  @IsString()
  @IsNotEmpty()
  userDataDirectory: string;

  @ArrayUnique<UserConfig>((userConfig) => userConfig.id)
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => UserConfig)
  users: UserConfig[];

  @ArrayUnique<AccountConfig>((accountConfig) => accountConfig.type)
  @ArrayMinSize(1)
  @ValidateNested()
  @Type(() => AccountConfig)
  accounts: AccountConfig[];
}
