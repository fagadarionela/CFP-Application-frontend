import {Component, Inject, LOCALE_ID, OnInit, QueryList, ViewChildren, ViewEncapsulation} from '@angular/core';
import {MedicalCaseService} from "../services/medical-case.service";
import {MatDialog} from "@angular/material/dialog";
import {ImageModalComponent} from "../modals/image-modal/image-modal.component";
import {Router} from "@angular/router";
import {SliderModalComponent} from "../modals/slider-modal/slider-modal.component";
import * as bcrypt from "bcryptjs";
import {AUTOMATIC_PATH, PATH, SALT} from "../utils/http-constants";
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
import {EvaluationFileComponent} from "../evaluation-file/evaluation-file.component";
import {Disease} from "../models/disease";
import {TimerComponent} from "../timer/timer.component";
import moment from "moment";

@Component({
  selector: 'app-medical-cases',
  templateUrl: './medical-cases.component.html',
  styleUrls: ['./medical-cases.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MedicalCasesComponent implements OnInit {

  medicalCases: MedicalCaseFull[] = [];

  role: string = '';

  diseases: Disease[] = [];

  public pageSize = 5;
  public currentPage = 0;
  public totalSize = 0;

  public searchedFirstName = "";

  public searchedLastName = "";

  public searchedBirthDate = "";

  public searchedEncodedInfo = "$2a";

  @ViewChildren('timerComponent') timerComponents: QueryList<TimerComponent>;

  @ViewChildren(EvaluationFileComponent) evaluationFileComponents: QueryList<EvaluationFileComponent>;

  constructor(private medicalCaseService: MedicalCaseService, private dialog: MatDialog, private router: Router,
              @Inject(LOCALE_ID) public locale: string, private diseasesService: DiseaseService) {
    this.role = sessionStorage.getItem('role')!;
  }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role')!;
    this.searchedFirstName = "";
    this.searchedLastName = "";
    this.searchedBirthDate = "";
    this.searchedEncodedInfo = "$2a";

    this.handlePage(this.currentPage, this.pageSize, this.searchedEncodedInfo);
    if (this.role === 'RESIDENT' || this.role === 'EXPERT') {
      this.diseasesService.getAllDiseases().subscribe(data => {
        this.diseases = data.sort((a, b) => (a.name.charAt(0) < b.name.charAt(0) ? -1 : 1))
      });
    }
  }

  getPath(medicalCase: MedicalCaseFull) {
    if (medicalCase.cfpimageName === undefined || medicalCase.cfpimageName === null || medicalCase.cfpimageName === "") {
      return PATH + "noimage.png";
    }

    return medicalCase.automaticCase? AUTOMATIC_PATH + this.sanitize(medicalCase.presumptiveDiagnosis) + '/' + medicalCase.cfpimageName: PATH + medicalCase.cfpimageName;
  }

  sanitize(path: string) {
    return path.replaceAll('+', '%2B');
  }

  updateMedicalCase(medicalCase: MedicalCaseFull): void {
    medicalCase.saved = true;
    let cfpImage = medicalCase.cfpimage;
    let cfpImageCustomized = medicalCase.cfpimageCustomized;

    medicalCase.cfpimage = null;
    medicalCase.cfpimageCustomized = null;
    this.medicalCaseService.updateMedicalCase(medicalCase).subscribe(
      (res) => {
        // console.log(res);
        this.dialog.open(SuccessModalComponent, {data: `The medical case was saved!`})
          .afterClosed().subscribe(() => window.location.reload());
      },
      (error) => {
        console.log(error);
        this.dialog.open(ErrorModalComponent, {data: `There was a problem when saving the case!`})
          .afterClosed().subscribe(() => this.dialog.closeAll());
      });
    medicalCase.cfpimage = cfpImage;
    medicalCase.cfpimageCustomized = cfpImageCustomized;
  }

  moveToCompleted(medicalCase: MedicalCaseFull): void {
    if (this.role === 'RESIDENT') {
      medicalCase.completedByResident = true;
    } else if (this.role === 'EXPERT') {
      medicalCase.completedByExpert = true;
    }
    this.updateMedicalCase(medicalCase);
    // window.location.reload();
  }

  markAllAsCorrect(medicalCase: MedicalCaseFull): void {
    medicalCase.clinicalSignGrades.forEach(clinicalSignGrade => clinicalSignGrade.correct = true);
    if (!medicalCase.automaticCase) {
      medicalCase.differentialDiagnosisGrades.forEach(clinicalSignGrade => clinicalSignGrade.correct = true);
      medicalCase.therapeuticPlanGrades.forEach(clinicalSignGrade => clinicalSignGrade.correct = true);
      medicalCase.score = medicalCase.clinicalSignGrades.length + medicalCase.differentialDiagnosisGrades.length + medicalCase.therapeuticPlanGrades.length;
    } else {
      medicalCase.score = medicalCase.clinicalSignGrades.length;
    }
  }

  openImage(medicalCase: MedicalCaseFull) {
    const activeModal = this.dialog.open(ImageModalComponent);
    activeModal.componentInstance.medicalCase = medicalCase;
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
            this.dialog.open(ErrorModalComponent, {data: `There was an error!`});
          } else {
            const {content, totalElements} = response;
            this.totalSize = totalElements;
            this.medicalCases = content;
          }
        },
        error => {
          console.log(error);
          this.dialog.open(ErrorModalComponent, {data: `There was an error!`});
        }
      );
    }
    if (this.role === "RESIDENT") {
      // console.log('aici')
      this.medicalCaseService.getAllAssignedIncomplete(page, size, searchedEncodedInfo).subscribe(
        response => {
          if (response.error) {
            this.dialog.open(ErrorModalComponent, {data: `There was an error!`});
          } else {
            const {content, totalElements} = response;
            this.totalSize = totalElements;
            this.medicalCases = content;
            // console.log(content)
          }
        },
        error => {
          console.log(error);
          this.dialog.open(ErrorModalComponent, {data: `There was an error!`});
        }
      );
    }

  }

  searchMedicalCases() {
    // console.log(this.searchedFirstName);
    // console.log(this.searchedLastName);
    // console.log(this.searchedBirthDate);

    this.searchedEncodedInfo = bcrypt.hashSync(this.searchedFirstName + this.searchedLastName + this.searchedBirthDate, SALT);
    console.log(this.searchedEncodedInfo);
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
        medicalCase.clinicalSignGrades.length = 0;
        medicalCase.differentialDiagnosisGrades.length = 0;
        medicalCase.therapeuticPlanGrades.length = 0;
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
        medicalCase.clinicalSignGrades.sort((a, b) => (a.clinicalSign.name < b.clinicalSign.name ? -1 : 1));
        // TODO
        medicalCase.differentialDiagnosisGrades.sort((a, b) => (a.differentialDiagnosisSign.sign.name < b.differentialDiagnosisSign.sign.name ? -1 : 1)).sort((a, b) => (a.differentialDiagnosisSign.differentialDiagnosis.name < b.differentialDiagnosisSign.differentialDiagnosis.name ? -1 : 1));

        medicalCase.therapeuticPlanGrades.sort((a, b) => (a.therapeuticPlanMethod.method.name < b.therapeuticPlanMethod.method.name ? -1 : 1))
          .sort((a, b) => (a.therapeuticPlanMethod.therapeuticPlan.name < b.therapeuticPlanMethod.therapeuticPlan.name ? -1 : 1));
      });
  }

  checkCorrectDiagnosis(medicalCase: MedicalCaseFull, position: number) {
    let evaluationFile = this.evaluationFileComponents.get(position);
    if (medicalCase.residentDiagnosis === medicalCase.correctDiagnosis) {
      evaluationFile ? evaluationFile.correctDiagnosis = true : undefined;
      medicalCase.score = 0;
    } else {
      evaluationFile ? evaluationFile.correctDiagnosis = false : undefined;
      evaluationFile?.initFields();
      medicalCase.score = 0;
    }
  }

  openMedicalCase(mep: any, position: number, medicalCase: MedicalCaseFull) {
    let timerComponent = this.timerComponents.get(position);
    let cfpImage = medicalCase.cfpimage;
    let cfpImageCustomized = medicalCase.cfpimageCustomized;

    medicalCase.cfpimage = null;
    medicalCase.cfpimageCustomized = null;

    if (timerComponent?.isRunning == false) {
      medicalCase.beginDate = new Date().toISOString();
      this.medicalCaseService.updateMedicalCase(medicalCase).subscribe(
        (res) => {
          // console.log(res);
          timerComponent?.startTimer();
        },
        (error) => {
          console.log(error);
        });
    }
    medicalCase.cfpimage = cfpImage;
    medicalCase.cfpimageCustomized = cfpImageCustomized;
    mep.expanded = !mep.expanded;
  }

  getRemainingTime(beginDate: string) {
    if (beginDate == null) {
      return -1;
    }
    let begin = new Date().getTime();// - 60*60*3*
    let end = moment.utc(beginDate).toDate().getTime(); //+ 60*60*3 * 1000;

    let timePassed = begin - end;
    if (timePassed > 420000) {
      return 0;
    } else {
      return Math.floor((420000 - timePassed) / 1000);
    }
  }
}
