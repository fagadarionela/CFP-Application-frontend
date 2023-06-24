import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../services/user.service";
import {ErrorModalComponent} from "../modals/error-modal/error-modal.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  hide: any = true;

  constructor(public userServive: UserService, public router: Router, public dialog: MatDialog) {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
    sessionStorage.setItem('tab', String(0));
  }

  public loginUser(loginFormValue: any) {
    this.userServive.login({
      "username": loginFormValue.username,
      "password": loginFormValue.password
    }).subscribe(res => {
        let role = res['authorities'][0]['authority'].split(/_(.+)/)[1];
        if (role === 'OPERATOR') {
          this.router.navigate(['medical-cases/insert']);
        } else if (role === 'ADMIN') {
          this.router.navigate(['users']);
        } else {
          this.router.navigate(['medical-cases/incomplete']);
        }

        sessionStorage.setItem('username', res['name']);
        sessionStorage.setItem('role', role);
      },
      (error: any) => {
        this.dialog.open(ErrorModalComponent, {data: `There was an error when trying to login!`});
      });

  }

}

