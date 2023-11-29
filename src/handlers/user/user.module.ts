import { Module } from "@nestjs/common";
import { BrowserModule } from "../browser";
import { AccountsModule } from "./account/account.module";
import { UserHandler } from "./user.handler";
import { User } from "./user.providers";

@Module({
  imports: [BrowserModule, AccountsModule],
  providers: [User, UserHandler],
  exports: [UserHandler],
})
export class UserModule {}
