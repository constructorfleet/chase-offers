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
import { UserModule } from "./handlers";

@Module({
  imports: [
    // ConfigurationModule.forRoot()
    AppConfigModule.forRoot("config", "app.yaml"),
    UsersConfigModule.forRoot("config", "users", UserConfigs),
    AccountsConfigModule.forRoot("config", "accounts", AccountConfigs),
    UserModule.forRoot(),
    DiscoveryModule,
  ],
  providers: [AppService],
})
export class AppModule {}
