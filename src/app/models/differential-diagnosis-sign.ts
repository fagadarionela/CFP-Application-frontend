import {Sign} from "./sign";
import {DifferentialDiagnosisPartial} from "./differential-diagnosis-partial";

export class DifferentialDiagnosisSign {
  id: string;

  differentialDiagnosis: DifferentialDiagnosisPartial;

  sign: Sign;

  constructor(differentialDiagnosis: DifferentialDiagnosisPartial, sign: Sign) {
    this.differentialDiagnosis = differentialDiagnosis;
    this.sign = sign;
  }
}
