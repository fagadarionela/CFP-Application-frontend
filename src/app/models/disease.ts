import {DifferentialDiagnosis} from "./differential-diagnosis";
import {TherapeuticPlan} from "./therapeutic-plan";

export class Disease {

  id: string;

  name: string;

  clinicalSigns: string[];

  differentialDiagnosis: DifferentialDiagnosis[];

  therapeuticPlans: TherapeuticPlan[];
}
