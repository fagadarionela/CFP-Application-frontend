import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {MedicalCase} from "../models/medical-case";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {MedicalCaseService} from "../services/medical-case.service";
import {MatDialog} from "@angular/material/dialog";
import {ImageModalComponent} from "../modals/image-modal/image-modal.component";
import {Router} from "@angular/router";
import {Disease} from "../utils/disease";
import {SliderModalComponent} from "../modals/slider-modal/slider-modal.component";
import * as bcrypt from "bcryptjs";
import {SALT} from "../utils/http-constants";
import {formatDate} from "@angular/common";
import {ErrorModalComponent} from "../modals/error-modal/error-modal.component";
import {SuccessModalComponent} from "../modals/success-modal/success-modal.component";

@Component({
  selector: 'app-incomplete-medical-cases',
  templateUrl: './incomplete-medical-cases.component.html',
  styleUrls: ['./incomplete-medical-cases.component.css']
})
export class IncompleteMedicalCasesComponent implements OnInit {

  medicalCases: MedicalCase[] = [];

  role: string = '';

  diseases = Object.values(Disease).filter(x => typeof x === "string");

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  public searchedFirstName = "";

  public searchedLastName = "";

  public searchedBirthDate = "";

  public searchedEncodedInfo = "$2a";

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private medicalCaseService: MedicalCaseService, private _adapter: DateAdapter<any>,
              @Inject(MAT_DATE_LOCALE) private _locale: string, private dialog: MatDialog, private router: Router,
              @Inject(LOCALE_ID) public locale: string) {
    this.role = sessionStorage.getItem('role')!;
    this._locale = 'ro';
    this._adapter.setLocale(this._locale);
  }

  ngOnInit(): void {
    this._locale = 'ro';
    this._adapter.setLocale(this._locale);
    this.role = sessionStorage.getItem('role')!;
    this.searchedFirstName = "";
    this.searchedLastName = "";
    this.searchedBirthDate = "";
    this.searchedEncodedInfo = "$2a";
    if (this.role === 'RESIDENT') {
      this.handlePage(this.currentPage, this.pageSize, this.searchedEncodedInfo);
    }
  }

  getErrorMessage(): string {
    return '';
    // return 'Data nasterii trebuie sa fie in trecut';
  }

  updateMedicalCase(medicalCase: MedicalCase): void {
    this.medicalCaseService.updateMedicalCase(medicalCase).subscribe(
      (res) => {
        console.log(res);
        this.dialog.open(SuccessModalComponent, {data: `Cazul medical a fost salvat cu succes!`});
      },
      (error) => {
        console.log(error);
        this.dialog.open(ErrorModalComponent, {data: `A existat o eroare la salvarea cazului medical!`});
      });
  }

  moveToCompleted(medicalCase: MedicalCase): void {
    this.medicalCaseService.updateMedicalCase(medicalCase).subscribe(
      (res) => {
        console.log(res);
        this.dialog.open(SuccessModalComponent, {data: `Cazul medical a fost salvat cu succes!`});
      },
      (error) => {
        console.log(error);
        this.dialog.open(ErrorModalComponent, {data: `A existat o eroare la salvarea cazului medical!`});
      },
      () => this.medicalCaseService.completeMedicalCase(medicalCase.id).subscribe(
        (res) => {
          console.log(res);
          this.dialog.open(SuccessModalComponent, {data: `Cazul medical a fost salvat cu succes!`});
        },
        (error) => {
          console.log(error);
          this.dialog.open(ErrorModalComponent, {data: `A existat o eroare la salvarea cazului medical!`});
        },
        () => window.location.reload()));
  }

  openImage(image: File) {
    this.dialog.open(ImageModalComponent, {data: `data:image/jpeg;base64,` + image});
  }

  showOtherCases(encodedInfo: string) {
    this.dialog.open(SliderModalComponent, {data: `` + encodedInfo});
  }

  handlePage(page: number, size: number, searchedEncodedInfo: string) {
    this.medicalCaseService.getAllAssignedIncomplete(page, size, searchedEncodedInfo).subscribe(
      response => {
        if (response.error) {
          console.log(response.error);
          this.dialog.open(ErrorModalComponent, {data: `A existat o eroare la inserarea cazului!`});
        } else {
          const {content, totalElements} = response;
          this.totalSize = totalElements;
          this.medicalCases = content;
        }
      },
      error => {
        console.log(error);
        this.dialog.open(ErrorModalComponent, {data: `A existat o eroare la inserarea cazului!`});
      }
    );
  }

  searchMedicalCases() {
    this.searchedEncodedInfo = bcrypt.hashSync(this.searchedFirstName + this.searchedLastName + this.searchedBirthDate, SALT);
    console.log(this.searchedEncodedInfo);
    if (this.searchedLastName === '' || this.searchedFirstName === '' || this.searchedBirthDate === ''){
      this.searchedEncodedInfo = "$2a"
    }
    this.handlePage(this.currentPage, this.pageSize, this.searchedEncodedInfo);
  }

  // openImage(image: File) {
  //   this.dialog.open(ImageModalComponent, {data: `data:image/jpeg;base64,` + image});
  // }

  // handlePageEvent(e: PageEvent) {
  //   this.pageEvent = e;
  //   this.length = e.length;
  //   this.pageSize = e.pageSize;
  //   this.pageIndex = e.pageIndex;
  // }
  formatDate(insertDate: Date) {
    return formatDate(insertDate, 'yyyy-MM-dd hh:mm:ss', this.locale)
  }
}
