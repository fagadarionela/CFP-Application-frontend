import {Component, Inject, OnInit} from '@angular/core';
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {MedicalCaseService} from "../services/medical-case.service";
import {ImageModalComponent} from "../modals/image-modal/image-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {MedicalCaseFull} from "../models/medical-case-full";
import {EvaluationFileModalComponent} from "../modals/evaluation-file-modal/evaluation-file-modal.component";

@Component({
  selector: 'app-complete-medical-cases',
  templateUrl: './complete-medical-cases.component.html',
  styleUrls: ['./complete-medical-cases.component.css']
})
export class CompleteMedicalCasesComponent implements OnInit {

  medicalCases: MedicalCaseFull[] = [];

  role: string = '';

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  public searchedDiagnostic = "";

  constructor(private httpService: MedicalCaseService, private _adapter: DateAdapter<any>,
              @Inject(MAT_DATE_LOCALE) private locale: string, private medicalCaseService: MedicalCaseService, private dialog: MatDialog) {
    this.role = sessionStorage.getItem('role')!;
    this.locale = 'ro';
    this._adapter.setLocale(this.locale);
    this.searchedDiagnostic = "";
  }

  ngOnInit(): void {
    this.locale = 'ro';
    this._adapter.setLocale(this.locale);
    this.role = sessionStorage.getItem('role')!;
    this.searchedDiagnostic = "";
    if (this.role === 'RESIDENT') {
      this.handlePage(this.currentPage, this.pageSize, this.searchedDiagnostic);
    }
  }

  openImage(image: File) {
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

  openEvaluationFile(medicalCase: MedicalCaseFull) {
    const activeModal = this.dialog.open(EvaluationFileModalComponent);
    activeModal.componentInstance.medicalCase = medicalCase;
  }
}
