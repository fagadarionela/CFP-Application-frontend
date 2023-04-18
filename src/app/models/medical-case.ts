export class MedicalCase {

  id: string;

  encodedInfo: string;

  birthDate: Date;

  additionalInformation: string;

  insertDate: Date;

  difficultyScore: number;

  cfpimage: File;

  presumptiveDiagnosis: string;

  residentDiagnosis: string;

  completedByResident: boolean;

  completedByExpert: boolean;
}