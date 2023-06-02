import {DifferentialDiagnosis} from "./differential-diagnosis";
import {TherapeuticPlan} from "./therapeutic-plan";
import {EducationalTopic} from "./educational-topic";

export class Disease {

  id: string;

  name: string;

  educationalTopic: EducationalTopic;

  clinicalSigns: string[] = [];

  differentialDiagnosis: DifferentialDiagnosis[] = [];

  therapeuticPlans: TherapeuticPlan[] = [];

  retinalCondition: boolean = true;
}
