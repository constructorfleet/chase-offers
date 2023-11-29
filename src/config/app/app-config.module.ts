import { DynamicModule, Module } from "@nestjs/common";
import { TypedConfigModule, dotenvLoader, fileLoader } from "nest-typed-config";
import { join as joinPath, resolve } from "path";
import { AppConfig } from "./app.config";

@Module({})
export class AppConfigModule {
  static forRoot(
    appConfigDirectory: string = joinPath(process.cwd(), "config"),
    appConfigFilename = "app.config.yaml",
    envFilePath: string | string[] = ".env"
  ): DynamicModule {
    return {
      global: true,
      module: AppConfigModule,
      imports: [
        TypedConfigModule.forRoot({
          schema: AppConfig,
          load: [
            dotenvLoader({
              envFilePath,
              expandVariables: true,
            }),
            fileLoader({
              absolutePath: resolve(
                joinPath(appConfigDirectory, appConfigFilename)
              ),
              ignoreEnvironmentVariableSubstitution: false,
            }),
          ],
        }),
      ],
      exports: [TypedConfigModule],
    };
  }
}
