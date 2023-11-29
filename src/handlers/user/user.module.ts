import { Module } from "@nestjs/common";
import { AccountsModule } from "../account/account.module";
import { BrowserModule } from "../browser";
import { UserHandler } from "./user.handler";

@Module({
  imports: [BrowserModule, AccountsModule],
  providers: [UserHandler],
  exports: [UserHandler],
})
export class UserModule {}
