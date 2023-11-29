import { DiscoveryModule } from "@golevelup/nestjs-discovery";
import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import {
  AccountConfigs,
  AccountsConfigModule,
  AppConfigModule,
  UserConfigs,
  UsersConfigModule,
} from "./config";

@Module({
  imports: [
    AppConfigModule.forRoot("config", "app.config.yaml"),
    UsersConfigModule.forRoot("config", "users", UserConfigs),
    AccountsConfigModule.forRoot("config", "accounts", AccountConfigs),
    DiscoveryModule,
  ],
  providers: [AppService],
})
export class AppModule {}
