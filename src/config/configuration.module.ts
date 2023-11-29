import { DynamicModule, Module } from "@nestjs/common";
import { join as joinPath, resolve } from "path";
import { AccountConfigs, AccountsConfigModule } from "./account";
import { AppConfig, AppConfigModule } from "./app";
import { ConfigurationModuleOptions } from "./configuration.types";
import { UserConfigs, UsersConfigModule } from "./user";

@Module({})
export class ConfigurationModule {
  static forRoot({
    configDirectory = resolve(joinPath(process.cwd(), "config")),
    appConfigFile = "app.yaml",
    userConfigDirectory = "users",
    accountConfigDirectory = "accounts",
    userConfigsToken = UserConfigs,
    accountConfigsToken = AccountConfigs,
    envFilePaths = resolve(joinPath(process.cwd(), ".env")),
  }: ConfigurationModuleOptions): DynamicModule {
    return {
      global: true,
      module: ConfigurationModule,
      imports: [
        AppConfigModule.forRoot(configDirectory, appConfigFile, envFilePaths),
        UsersConfigModule.forRoot(
          configDirectory,
          userConfigDirectory,
          userConfigsToken
        ),
        AccountsConfigModule.forRoot(
          configDirectory,
          accountConfigDirectory,
          accountConfigsToken
        ),
      ],
      exports: [AppConfig, userConfigsToken, accountConfigsToken],
    };
  }
}
