import { Injectable } from "@nestjs/common";
import { Account } from "./account.provider";

@Injectable()
export class AccountHandler {
  constructor(private readonly account: Account) {}
}
