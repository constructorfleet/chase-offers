import { Injectable } from "@nestjs/common";
import { ArrayUnique, IsArray, IsNotEmpty, IsString } from "class-validator";
import { AccountType } from "../account";
import { UserType } from "../user";

@Injectable()
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
