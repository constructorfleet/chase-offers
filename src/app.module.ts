import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypedConfigModule, dotenvLoader, fileLoader } from "nest-typed-config";
import { AppConfig } from "./app.config";
import { AppService } from "./app.service";
import { RootConfig } from "./config";

@Module({
  imports: [
    ConfigModule.forFeature(AppConfig),
    TypedConfigModule.forRoot({
      schema: RootConfig,
      load: [
        dotenvLoader({
          envFilePath: "./.env",
          expandVariables: true,
        }),
        fileLoader({
          absolutePath: "./config.yaml",
          ignoreEnvironmentVariableSubstitution: false,
        }),
      ],
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
