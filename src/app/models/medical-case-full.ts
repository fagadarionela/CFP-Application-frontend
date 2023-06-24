import {DifferentialDiagnosisGrade} from "./differential-diagnosis-grade";
import {TherapeuticPlanGrade} from "./therapeutic-plan-grade";
import {ClinicalSignGrade} from "./clinical-sign-grade";
import {Resident} from "./resident";

export class MedicalCaseFull {

  id: string;

  encodedInfo: string;

  birthDate: Date;

  additionalInformation: string;

  feedback: string;

  insertDate: Date;

  difficultyScore: number;

  cfpimage: File;

  cfpimageCustomized: any;

  presumptiveDiagnosis: string;

  residentDiagnosis: string;

  clinicalSignGrades: ClinicalSignGrade[] = [];

  differentialDiagnosisGrades: DifferentialDiagnosisGrade[] = [];

  therapeuticPlanGrades: TherapeuticPlanGrade[] = [];

  resident: Resident;

  score: number;

  completedByResident: boolean;

  completedByExpert: boolean;

  correctDiagnosis: string;

  saved: boolean;

  grade: number;

  allocationDate: Date;

  beginDate: string;
}
