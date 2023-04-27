import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Account} from "../../models/account";
import {ResidentService} from "../../services/resident.service";
import {Resident} from "../../models/resident";
import {UserService} from "../../services/user.service";
import {SuccessModalComponent} from "../success-modal/success-modal.component";
import {ErrorModalComponent} from "../error-modal/error-modal.component";

@Component({
  selector: 'app-add-account-modal',
  templateUrl: './add-account-modal.component.html',
  styleUrls: ['./add-account-modal.component.css']
})
export class AddAccountModalComponent implements OnInit {

  account: Account = new Account();

  accounts = ['RESIDENT', 'EXPERT', 'OPERATOR'];

  constructor(private residentService: ResidentService, private userService: UserService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  addAccount() {
    if (this.account.role === 'RESIDENT') {
      this.residentService.addResident(new Resident(this.account)).subscribe(
        () => this.dialog.open(SuccessModalComponent, {data: `Utilizatorul a fost adaugat cu succes!`})
          .afterClosed().subscribe(() => window.location.reload()),
        (error) => {
          console.log(error);
          this.dialog.open(ErrorModalComponent, {data: `A existat o eroare la adaugarea utilizatorului!`})
            .afterClosed().subscribe(() => window.location.reload())
        }
      );
    } else {
      this.userService.insertUser(this.account).subscribe(
        () => this.dialog.open(SuccessModalComponent, {data: `Utilizatorul a fost adaugat cu succes!`})
          .afterClosed().subscribe(() => window.location.reload()),
        (error) => {
          console.log(error);
          this.dialog.open(ErrorModalComponent, {data: `A existat o eroare la adaugarea utilizatorului!`})
            .afterClosed().subscribe(() => window.location.reload())
        }
      )
    }
  }
}
