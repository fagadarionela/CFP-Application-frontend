import {Account} from "./account";

export class Resident {

  id: string;

  account: Account;

  constructor(account: Account) {
    this.account = account;
  }
}
