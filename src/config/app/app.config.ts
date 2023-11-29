import { ArrayUnique, IsArray, IsNotEmpty, IsString } from "class-validator";
import { AccountType } from "../account";
import { UserType } from "../user";

export class AppConfig {
  @IsString()
  @IsNotEmpty()
  userDataDirectory: string;

  @IsArray()
  @ArrayUnique()
  users: UserType[];

  @IsArray()
  @ArrayUnique()
  accounts: AccountType[];
}
