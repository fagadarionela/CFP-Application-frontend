import {DifferentialDiagnosisGrade} from "./differential-diagnosis-grade";
import {TherapeuticPlanGrade} from "./therapeutic-plan-grade";
import {ClinicalSignGrade} from "./clinical-sign-grade";
import {Resident} from "./resident";

export class MedicalCaseFull {

  id: string;

  encodedInfo: string;

  birthDate: Date;

  additionalInformation: string;

  insertDate: Date;

  difficultyScore: number;

  cfpimage: File;

  presumptiveDiagnosis: string;

  residentDiagnosis: string;

  clinicalSignGrades: ClinicalSignGrade[] = [];

  differentialDiagnosisGrades: DifferentialDiagnosisGrade[] = [];

  therapeuticPlanGrades: TherapeuticPlanGrade[] = [];

  saved: boolean;

  resident: Resident;

  score: number;

  completedByResident: boolean;

  completedByExpert: boolean;

  correctDiagnosis: boolean;
}
