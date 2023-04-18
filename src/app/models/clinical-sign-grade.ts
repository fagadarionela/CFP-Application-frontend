import {ClinicalSign} from "./clinical-sign";

export class ClinicalSignGrade {
  id: string;

  clinicalSign: ClinicalSign;

  checked: boolean;

  correct: boolean;

  constructor(clinicalSign: ClinicalSign) {
    this.clinicalSign = clinicalSign;
    this.checked = false;
    this.correct = false;
  }
}
