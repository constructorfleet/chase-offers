import { Inject, Injectable } from "@nestjs/common";
import { AccountConfig, AccountConfigs } from "src/config";

@Injectable()
export class Account {
  private index: number = 0;

  constructor(
    @Inject(AccountConfigs) private readonly configs: AccountConfigs
  ) {}

  private get config(): AccountConfig | undefined {
    return this.configs.at(this.index);
  }

  get type(): string {
    return this.config?.type;
  }

  get url(): URL {
    return this.config?.url;
  }

  next(): AccountConfig | undefined {
    this.index++;
    return this.config;
  }

  hasNext(): boolean {
    return this.configs.length < this.index;
  }
}
