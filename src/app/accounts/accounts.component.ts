import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UserService} from "../services/user.service";
import {Account} from "../models/account";
import {MatDialog} from "@angular/material/dialog";
import {AddAccountModalComponent} from "../modals/add-account-modal/add-account-modal.component";
import {SuccessModalComponent} from "../modals/success-modal/success-modal.component";
import {ErrorModalComponent} from "../modals/error-modal/error-modal.component";
import {SystemService} from "../services/system.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements AfterViewInit {
  displayedColumns: string[] = ['username', 'role', 'star'];
  dataSource: MatTableDataSource<Account>;

  currentUsername: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  started: boolean;

  constructor(private userService: UserService, private dialog: MatDialog, private systemService: SystemService) {
    this.userService.getAllUsers().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.log(error);
      }
    );
    this.systemService.getAllTempMedicalCases().subscribe((data) => this.started = data > 0);
  }

  ngAfterViewInit() {
    this.currentUsername = sessionStorage.getItem('username')!;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog() {
    this.dialog.open(AddAccountModalComponent);
  }

  deleteUser(username: string) {
    //console.log(username);
    this.userService.deleteUser(username).subscribe(
      () => this.dialog.open(SuccessModalComponent, {data: `The user was successfully created!`})
        .afterClosed().subscribe(() => window.location.reload()),
      (error) => {
        console.log(error);
        this.dialog.open(ErrorModalComponent, {data: `There was an error when creating the user!`})
          .afterClosed().subscribe(() => window.location.reload())
      }
    )
  }

  automaticallyAddMedicalCases() {
    this.systemService.getImages().subscribe(()=> this.started = true);
  }

  stopAutomaticallyAddMedicalCases(){
    this.systemService.deleteTempMedicalCases().subscribe(()=> this.started = false);
  }
}
