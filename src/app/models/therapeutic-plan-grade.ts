import {TherapeuticPlanMethod} from "./therapeutic-plan-method";

export class TherapeuticPlanGrade {
  id: string;

  therapeuticPlanMethod: TherapeuticPlanMethod;

  checked: boolean;

  correct: boolean;

  constructor(therapeuticPlanMethod: TherapeuticPlanMethod) {
    this.therapeuticPlanMethod = therapeuticPlanMethod;
    this.checked = false;
    this.correct = false;
  }
}
