import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppConfig } from "./app.config";
import { AppService } from "./app.service";

@Module({
  imports: [ConfigModule.forFeature(AppConfig)],
  providers: [AppService],
})
export class AppModule {}

/**
 * import { Module } from "@nestjs/common";
import { TypedConfigModule, dotenvLoader, fileLoader } from "nest-typed-config";
import { AppService } from "./app.service";
import { RootConfig } from "./config";

@Module({
  imports: [
    TypedConfigModule.forRoot({
      schema: RootConfig,
      load: [
        fileLoader({
          absolutePath: "./config.yaml",
          ignoreEnvironmentVariableSubstitution: false,
        }),
        dotenvLoader({
          envFilePath: "./.env",
          expandVariables: true,
        }),
      ],
    }),
  ],
  providers: [AppService],
})
export class AppModule {}

 */
