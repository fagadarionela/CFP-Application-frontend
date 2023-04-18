import {Component, Inject, LOCALE_ID, OnInit, ViewEncapsulation} from '@angular/core';
import {MedicalCase} from "../models/medical-case";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {MedicalCaseService} from "../services/medical-case.service";
import {MatDialog} from "@angular/material/dialog";
import {ImageModalComponent} from "../modals/image-modal/image-modal.component";
import {Router} from "@angular/router";
import {SliderModalComponent} from "../modals/slider-modal/slider-modal.component";
import * as bcrypt from "bcryptjs";
import {SALT} from "../utils/http-constants";
import {formatDate} from "@angular/common";
import {ErrorModalComponent} from "../modals/error-modal/error-modal.component";
import {SuccessModalComponent} from "../modals/success-modal/success-modal.component";
import {DiseaseService} from "../services/disease.service";
import {MedicalCaseFull} from "../models/medical-case-full";
import {DifferentialDiagnosisSign} from "../models/differential-diagnosis-sign";
import {DifferentialDiagnosisPartial} from "../models/differential-diagnosis-partial";
import {Sign} from "../models/sign";
import {DifferentialDiagnosisGrade} from "../models/differential-diagnosis-grade";
import {TherapeuticPlanGrade} from "../models/therapeutic-plan-grade";
import {TherapeuticPlanMethod} from "../models/therapeutic-plan-method";
import {TherapeuticPlanPartial} from "../models/therapeutic-plan-partial";
import {Method} from "../models/method";
import {ClinicalSign} from "../models/clinical-sign";
import {ClinicalSignGrade} from "../models/clinical-sign-grade";

@Component({
  selector: 'app-medical-cases',
  templateUrl: './medical-cases.component.html',
  styleUrls: ['./medical-cases.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MedicalCasesComponent implements OnInit {

  medicalCases: MedicalCaseFull[] = [];

  role: string = '';

  diseases: string[] = [];

  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;

  public searchedFirstName = "";

  public searchedLastName = "";

  public searchedBirthDate = "";

  public searchedEncodedInfo = "$2a";

  constructor(private medicalCaseService: MedicalCaseService, private _adapter: DateAdapter<any>,
              @Inject(MAT_DATE_LOCALE) private _locale: string, private dialog: MatDialog, private router: Router,
              @Inject(LOCALE_ID) public locale: string, private diseasesService: DiseaseService) {
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

    this.handlePage(this.currentPage, this.pageSize, this.searchedEncodedInfo);
    if (this.role === 'RESIDENT') {
      this.diseasesService.getAllDiseases().subscribe(data => {
        this.diseases = data.sort((a, b) => (a.charAt(0) < b.charAt(0) ? -1 : 1))
        console.log(data);
      });
    }
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
    if (this.role === 'RESIDENT') {
      medicalCase.completedByResident = true;
    } else if (this.role === 'EXPERT') {
      medicalCase.completedByExpert = true;
    }
    this.medicalCaseService.updateMedicalCase(medicalCase).subscribe(
      (res) => {
        console.log(res);
        this.dialog.open(SuccessModalComponent, {data: `Cazul medical a fost salvat cu succes!`});
      },
      (error) => {
        console.log(error);
        this.dialog.open(ErrorModalComponent, {data: `A existat o eroare la salvarea cazului medical!`});
      },
      () => window.location.reload());
  }

  openImage(image: File) {
    this.dialog.open(ImageModalComponent, {data: `data:image/jpeg;base64,` + image});
  }

  showOtherCases(encodedInfo: string) {
    this.dialog.open(SliderModalComponent, {data: `` + encodedInfo});
  }

  handlePage(page: number, size: number, searchedEncodedInfo: string) {
    if (this.role === "EXPERT") {
      this.medicalCaseService.getAllCompletedMedicalCases(page, size, searchedEncodedInfo).subscribe(
        response => {
          if (response.error) {
            console.log(response.error);
            this.dialog.open(ErrorModalComponent, {data: `A existat o eroare!`});
          } else {
            const {content, totalElements} = response;
            this.totalSize = totalElements;
            this.medicalCases = content;
            this.medicalCases.forEach(medicalCase => {
              if (medicalCase.residentDiagnosis != null) {
                medicalCase.saved = true;
              }
            })
          }
        },
        error => {
          console.log(error);
          this.dialog.open(ErrorModalComponent, {data: `A existat o eroare!`});
        }
      );
    }
    if (this.role === "RESIDENT") {
      console.log('aici')
      this.medicalCaseService.getAllAssignedIncomplete(page, size, searchedEncodedInfo).subscribe(
        response => {
          if (response.error) {
            console.log(response.error);
            this.dialog.open(ErrorModalComponent, {data: `A existat o eroare!`});
          } else {
            const {content, totalElements} = response;
            this.totalSize = totalElements;
            this.medicalCases = content;
            this.medicalCases.forEach(medicalCase => {
              if (medicalCase.residentDiagnosis != null) {
                medicalCase.saved = true;
              }
            })
          }
        },
        error => {
          console.log(error);
          this.dialog.open(ErrorModalComponent, {data: `A existat o eroare!`});
        }
      );
    }

  }

  searchMedicalCases() {
    this.searchedEncodedInfo = bcrypt.hashSync(this.searchedFirstName + this.searchedLastName + this.searchedBirthDate, SALT);
    if (this.searchedLastName === '' || this.searchedFirstName === '' || this.searchedBirthDate === '') {
      this.searchedEncodedInfo = "$2a"
    }
    this.handlePage(this.currentPage, this.pageSize, this.searchedEncodedInfo);
  }

  formatDate(insertDate: Date) {
    return formatDate(insertDate, 'yyyy-MM-dd HH:mm:ss', this.locale)
  }

  getDiseaseByName(medicalCase: MedicalCaseFull) {
    this.diseasesService.getDiseaseByName(medicalCase.residentDiagnosis).subscribe(
      data => {
        for (var differentialDiagnosis of data.differentialDiagnosis) {
          for (var signName of differentialDiagnosis.signs) {
            medicalCase.differentialDiagnosisGrades.push(new DifferentialDiagnosisGrade(new DifferentialDiagnosisSign(new DifferentialDiagnosisPartial(differentialDiagnosis.name), new Sign(signName))));
          }
        }
        for (var therapeuticPlan of data.therapeuticPlans) {
          for (var methodName of therapeuticPlan.methods) {
            medicalCase.therapeuticPlanGrades.push(new TherapeuticPlanGrade(new TherapeuticPlanMethod(new TherapeuticPlanPartial(therapeuticPlan.name), new Method(methodName))));
          }
        }
        for (var clinicalSign of data.clinicalSigns) {
          medicalCase.clinicalSignGrades.push(new ClinicalSignGrade(new ClinicalSign(clinicalSign)));
        }
      });
  }

}
