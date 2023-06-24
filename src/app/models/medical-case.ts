export class MedicalCase {

  id: string;

  encodedInfo: string;

  additionalInformation: string;

  feedback: string;

  insertDate: Date;

  beginDate: string;

  difficultyScore: number;

  cfpimage: File;

  presumptiveDiagnosis: string;

  residentDiagnosis: string;

  completedByResident: boolean;

  completedByExpert: boolean;

  saved: boolean;

  allocationDate: Date;
}
