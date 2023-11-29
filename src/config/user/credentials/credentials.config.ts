import { IsNotEmpty } from "class-validator";
import { Credentials } from ".";

export abstract class CredentialsConfig<Properties extends string> {
  @IsNotEmpty()
  abstract type: Credentials;

  abstract get(credential: Properties): Promise<string>;
}
