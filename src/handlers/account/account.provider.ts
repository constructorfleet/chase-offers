import { Inject, Injectable } from "@nestjs/common";
import { AccountConfig, AccountConfigs, AccountType } from "src/config";

@Injectable()
export class Account {
  constructor(
    @Inject(AccountConfigs) private readonly configs: AccountConfigs
  ) {}

  private get(type: AccountType);
  private get config(): AccountConfig | undefined {
    return this.configs.at(this.index);
  }

  get type(): string {
    return this.config?.type;
  }

  get url(): URL {
    return this.config?.url;
  }
}
