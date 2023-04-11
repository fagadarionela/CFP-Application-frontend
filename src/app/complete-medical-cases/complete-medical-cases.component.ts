import {Component, Inject, OnInit} from '@angular/core';
import {MedicalCase} from "../models/medical-case";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {FormControl, Validators} from "@angular/forms";
import {MedicalCaseService} from "../services/medical-case.service";
import {ImageModalComponent} from "../modals/image-modal/image-modal.component";
import {MatDialog} from "@angular/material/dialog";
import * as bcrypt from "bcryptjs";
import {SALT} from "../utils/http-constants";

@Component({
  selector: 'app-complete-medical-cases',
  templateUrl: './complete-medical-cases.component.html',
  styleUrls: ['./complete-medical-cases.component.css']
})
export class CompleteMedicalCasesComponent implements OnInit {

  medicalCases: MedicalCase[] = [];

  role: string = '';

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public searchedDiagnostic = "";

  constructor(private httpService: MedicalCaseService, private _adapter: DateAdapter<any>,
              @Inject(MAT_DATE_LOCALE) private _locale: string, private medicalCaseService: MedicalCaseService, private dialog: MatDialog) {
    this.role = sessionStorage.getItem('role')!;
    this._locale = 'ro';
    this._adapter.setLocale(this._locale);
    this.searchedDiagnostic = "";
  }

  ngOnInit(): void {
    this._locale = 'ro';
    this._adapter.setLocale(this._locale);
    this.role = sessionStorage.getItem('role')!;
    this.searchedDiagnostic = "";
    if (this.role === 'RESIDENT') {
      this.handlePage(this.currentPage, this.pageSize, this.searchedDiagnostic);
    }
  }

  openImage(image: File){
    this.dialog.open(ImageModalComponent, {data: `data:image/jpeg;base64,` + image});
  }

  handlePage(page: number, size: number, searchedDiagnostic: string) {
    this.medicalCaseService.getAllAssigendComplete(page, size, searchedDiagnostic).subscribe(
      response => {
        if (response.error) {
          console.log(response.error);
        } else {
          const {content, totalElements} = response;
          this.totalSize = totalElements;
          this.medicalCases = content;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  searchMedicalCases() {
    console.log(this.searchedDiagnostic);
    this.handlePage(this.currentPage, this.pageSize, this.searchedDiagnostic);
  }
}
