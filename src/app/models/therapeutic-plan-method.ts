import {Method} from "./method";
import {TherapeuticPlanPartial} from "./therapeutic-plan-partial";

export class TherapeuticPlanMethod {
  id: string;

  therapeuticPlan: TherapeuticPlanPartial;

  method: Method;

  constructor(therapeuticPlan: TherapeuticPlanPartial, method: Method) {
    this.therapeuticPlan = therapeuticPlan;
    this.method = method;
  }
}
