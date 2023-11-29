import { Inject, Injectable } from "@nestjs/common";
import { UserConfig, UserConfigs } from "src/config";

@Injectable()
export class User {
  private index: number = 0;
  constructor(@Inject(UserConfigs) private readonly userConfigs: UserConfigs) {}

  private get userConfig(): UserConfig | undefined {
    return this.userConfigs.at(this.index);
  }

  get id(): string | undefined {
    return this.userConfig?.id;
  }

  get accounts(): string[] {
    return this.userConfig?.accounts;
  }

  next(): UserConfig | undefined {
    this.index++;
    return this.userConfig;
  }

  hasNext(): boolean {
    return this.userConfigs.length > this.index;
  }
}
