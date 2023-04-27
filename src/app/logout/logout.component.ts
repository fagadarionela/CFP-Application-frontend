import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {SuccessModalComponent} from "../modals/success-modal/success-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {ErrorModalComponent} from "../modals/error-modal/error-modal.component";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(public userServive: UserService, private router: Router, private dialog: MatDialog) {
  }


  ngOnInit(): void {
    this.logOut();
  }

  logOut(): void {
    let succesMessage: string;
    let errorMessage: string;

    succesMessage = `Te-ai delogat cu succes!`;
    errorMessage = `Ceva a mers prost!`;

    this.userServive.logout().subscribe(() => {
        this.dialog.open(SuccessModalComponent, {data: succesMessage})
          .afterClosed().subscribe(() => {
          sessionStorage.removeItem('role');
          sessionStorage.removeItem('username');
          this.router.navigate(['/login']).then(() => window.location.reload());
        })
      },
      error => {
        console.log(error)
        this.dialog.open(ErrorModalComponent, {data: errorMessage})
      });
  }
}
