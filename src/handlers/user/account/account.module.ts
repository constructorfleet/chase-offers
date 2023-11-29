import { Module } from "@nestjs/common";
import { AccountsConfigModule } from "src/config";
import { AccountHandler } from "./account.handler";
import { Account } from "./account.provider";

@Module({
  imports: [AccountsConfigModule],
  providers: [Account, AccountHandler],
  export: [AccountHandler],
})
export class AccountsModule {}
