import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { EnsureUniqueArray } from "src/common";
import { AccountConfig } from "./account.config";
import { UserConfig } from "./user.config";

export class RootConfig {
  @IsString()
  @IsNotEmpty()
  userDataDirectory: string;

  @EnsureUniqueArray<UserConfig>((userConfig) => userConfig.id)
  @ValidateNested()
  @Type(() => UserConfig)
  users: UserConfig[];

  @EnsureUniqueArray<AccountConfig>((accountConfig) => accountConfig.type)
  @ValidateNested()
  @Type(() => AccountConfig)
  accounts: AccountConfig[];
}
