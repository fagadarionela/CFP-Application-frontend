import {Component, OnInit} from '@angular/core';
import {MedicalCase} from "../models/medical-case";
import {FormControl, Validators} from "@angular/forms";
import {MedicalCaseService} from "../services/medical-case.service";
import * as bcrypt from 'bcryptjs';
import {SALT} from "../utils/http-constants";
import {MatDialog} from "@angular/material/dialog";
import {SuccessModalComponent} from "../modals/success-modal/success-modal.component";
import {ErrorModalComponent} from "../modals/error-modal/error-modal.component";
import {DiseaseService} from "../services/disease.service";
import {Disease} from "../models/disease";
import {SystemService} from "../services/system.service";

@Component({
  selector: 'app-insert-medical-cases',
  templateUrl: './insert-medical-cases.component.html',
  styleUrls: ['./insert-medical-cases.component.css']
})
export class InsertMedicalCasesComponent implements OnInit {

  role = '';
  firstName = new FormControl('');
  lastName = new FormControl('');
  birthDate = new FormControl('');
  CFPImage = new FormControl('', [Validators.required]);
  presumptiveDiagnosis = new FormControl('');
  additionalInformation = new FormControl('');

  selectedFiles?: FileList;
  selectedFileName: string = '';
  previewImage: string = '';

  presumptiveDiagnosisModality: string = 'withModel';

  diseases: Disease[] = [];

  today = new Date();

  started: boolean;

  constructor(private dialog: MatDialog, private medicalCaseService: MedicalCaseService, private systemService: SystemService, private diseasesService: DiseaseService) {
    this.role = sessionStorage.getItem('role')!;
  }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role')!;
    this.diseasesService.getAllDiseases().subscribe(data => {
      this.diseases = data.sort((a, b) => (a.name.charAt(0) < b.name.charAt(0) ? -1 : 1))
    });
    this.systemService.getAllTempMedicalCases().subscribe((data) => this.started = data > 0);
  }

  getErrorMessage(): string {
    if (this.CFPImage.hasError('required')) {
      return 'Trebuie sa introduci o valoare';
    }
    return '';
  }

  selectFiles(event: any): void {
    this.selectedFileName = '';
    this.selectedFiles = event.target.files;

    this.previewImage = '';
    if (this.selectedFiles && this.selectedFiles[0]) {
      console.log(this.selectedFiles[0])
      const reader = new FileReader();

      reader.onload = (e: any) => {
        console.log(e.target.result);
        this.previewImage = e.target.result;
      };

      reader.readAsDataURL(this.selectedFiles[0]);

      this.selectedFileName = this.selectedFiles[0].name;
      console.log(this.previewImage)
    }
  }

  addMedicalCase(): void {
    let medicalCase: MedicalCase = new MedicalCase();
    console.log(this.birthDate.value, 'birthdate');
    medicalCase.encodedInfo = bcrypt.hashSync(this.firstName.value! + this.lastName.value! + this.birthDate.value!, SALT);

    medicalCase.additionalInformation = this.additionalInformation.value!;
    medicalCase.presumptiveDiagnosis = this.presumptiveDiagnosis.value!;

    const uploadImageData = new FormData();
    if (this.selectedFiles) {
      console.log(this.selectedFiles[0]!, this.selectedFiles[0]!.name)
      uploadImageData.append('image', this.selectedFiles[0]!, this.selectedFiles[0]!.name);
    }
    uploadImageData.append('medicalCase', JSON.stringify(medicalCase));
    console.log(uploadImageData, 'imageData');

    console.log(medicalCase);
    this.medicalCaseService.addMedicalCase(uploadImageData).subscribe(
      (res) => {
        console.log(res);
        this.dialog.open(SuccessModalComponent, {data: `Cazul medical a fost asignat rezidentului: ` + res.resident.account.username + `!`})
          .afterClosed().subscribe(() => window.location.reload());
        this.resetFields();
      },
      (error) => {
        console.log(error);
        this.dialog.open(ErrorModalComponent, {data: `A existat o eroare la inserarea cazului!`})
          .afterClosed().subscribe(() => window.location.reload());
      });
  }

  getNumberOfRows(presumptiveDiagnosisModality: string) {
    if (presumptiveDiagnosisModality === 'withModel') {
      return 7;
    }
    return 4;
  }

  resetFields(): void {
    this.firstName.setValue("");
    this.lastName.setValue("");
    this.birthDate.setValue("");
    this.CFPImage.setValue("");
    this.selectedFileName = "";
    this.previewImage = "";
    this.presumptiveDiagnosis.setValue("");
    this.additionalInformation.setValue("");
  }

  automaticallyAddMedicalCases() {
    this.systemService.getImages().subscribe(()=> this.started = true);
  }

  stopAutomaticallyAddMedicalCases(){
    this.systemService.deleteTempMedicalCases().subscribe(()=> this.started = false);
  }
}
