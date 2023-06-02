import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ResidentService} from "../services/resident.service";
import {Resident} from "../models/resident";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public loggedIn = false;

  public role = '';

  public username = '';

  public resident: Resident;

  constructor(private router: Router, private residentService: ResidentService) {
    this.role = sessionStorage.getItem('role')!;
    this.username = sessionStorage.getItem('username')!;
    if (this.role !== null) {
      this.loggedIn = true;
    }
    if (this.role === 'RESIDENT'){
      residentService.getCurrentResident().subscribe(data => {this.resident = data
      console.log(data)});
    }
  }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role')!;
    this.username = sessionStorage.getItem('username')!;
    if (this.role !== null) {
      this.loggedIn = true;
    }
  }

  goTo(link: string): void {
    this.router.navigate([link]);
  }
}
