import {Account} from "./account";

export class Resident {

  id: string;

  account: Account;

  grade: number;

  constructor(account: Account) {
    this.account = account;
  }
}
