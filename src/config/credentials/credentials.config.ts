import { IsEnum, IsNotEmpty } from "class-validator";
import { Credentials } from ".";

export abstract class CredentialsConfig<Properties extends string> {
  @IsEnum(Credentials)
  @IsNotEmpty()
  abstract type: Credentials;

  abstract get(credential: Properties): Promise<string>;
}
