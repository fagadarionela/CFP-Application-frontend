import {DifferentialDiagnosisSign} from "./differential-diagnosis-sign";

export class DifferentialDiagnosisGrade {
  id: string;

  differentialDiagnosisSign: DifferentialDiagnosisSign;

  checked: boolean;

  correct: boolean;

  constructor(differentialDiagnosisSign: DifferentialDiagnosisSign) {
    this.differentialDiagnosisSign = differentialDiagnosisSign;
    this.checked = false;
    this.correct = false;
  }
}
