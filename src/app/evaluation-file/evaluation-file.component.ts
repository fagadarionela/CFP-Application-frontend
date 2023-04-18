import {Component, Inject, Input, LOCALE_ID, ViewEncapsulation} from '@angular/core';
import {MedicalCaseFull} from "../models/medical-case-full";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-evaluation-file',
  templateUrl: './evaluation-file.component.html',
  styleUrls: ['./evaluation-file.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EvaluationFileComponent {
  @Input('medicalCase') medicalCase: MedicalCaseFull;

  currentDate: string = formatDate(new Date(), 'yyyy-MM-dd', this.locale);
  resident: string = '';

  role: string = '';

  constructor(@Inject(LOCALE_ID) public locale: string) {
  }

  ngOnInit() {
    this.role = sessionStorage.getItem('role')!;
    this.resident = sessionStorage.getItem('username')!;
    console.log(this.medicalCase)
    this.medicalCase.clinicalSignGrades.sort((a, b) => (a.clinicalSign.name < b.clinicalSign.name ? -1 : 1));
    this.medicalCase.differentialDiagnosisGrades.sort((a, b) => (a.differentialDiagnosisSign.sign.name < b.differentialDiagnosisSign.sign.name ? -1 : 1)).sort((a, b) => (a.differentialDiagnosisSign.differentialDiagnosis.name < b.differentialDiagnosisSign.differentialDiagnosis.name ? -1 : 1));

    this.medicalCase.therapeuticPlanGrades.sort((a, b) => (a.therapeuticPlanMethod.method.name < b.therapeuticPlanMethod.method.name ? -1 : 1))
      .sort((a, b) => (a.therapeuticPlanMethod.therapeuticPlan.name < b.therapeuticPlanMethod.therapeuticPlan.name ? -1 : 1));

  }

  changeWrong() {
    this.medicalCase.correctDiagnosis = !this.medicalCase.correctDiagnosis;
    if (!this.medicalCase.correctDiagnosis) {
      this.medicalCase.clinicalSignGrades.forEach(clinicalSignGrade => clinicalSignGrade.correct = false);
      this.medicalCase.differentialDiagnosisGrades.forEach(clinicalSignGrade => clinicalSignGrade.correct = false);
      this.medicalCase.therapeuticPlanGrades.forEach(clinicalSignGrade => clinicalSignGrade.correct = false);
      this.medicalCase.score = 0;
    } else {
      this.medicalCase.score = -1;
    }
  }

  changeCorrect() {
    this.medicalCase.correctDiagnosis = !this.medicalCase.correctDiagnosis;
    if (this.medicalCase.correctDiagnosis) {
      this.medicalCase.score = 0;
    } else {
      this.medicalCase.score = -1;
    }

  }


  changeAndIncrementScore(correct: boolean): boolean {
    if (!correct) {
      this.medicalCase.score = this.medicalCase.score + 1;
    } else {
      this.medicalCase.score = this.medicalCase.score - 1;
    }
    return !correct;
  }
}