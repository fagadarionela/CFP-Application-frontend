import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public loggedIn = false;

  public role = '';

  public username = '';

  constructor(private router: Router) {
    this.role = sessionStorage.getItem('role')!;
    this.username = sessionStorage.getItem('username')!;
    if (this.role !== null) {
      this.loggedIn = true;
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
