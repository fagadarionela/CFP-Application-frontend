import {Component, Inject, OnInit} from '@angular/core';
import {MedicalCase} from "../models/medical-case";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {FormControl, Validators} from "@angular/forms";
import {MedicalCaseService} from "../services/medical-case.service";
import {Disease} from "../utils/disease";
import * as bcrypt from 'bcryptjs';
import {SALT} from "../utils/http-constants";
import {MatDialog} from "@angular/material/dialog";
import {SuccessModalComponent} from "../modals/success-modal/success-modal.component";
import {ErrorModalComponent} from "../modals/error-modal/error-modal.component";

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

  diseases = Object.values(Disease);

  constructor(private httpService: MedicalCaseService, private _adapter: DateAdapter<any>, private dialog: MatDialog,
              @Inject(MAT_DATE_LOCALE) private _locale: string, private medicalCaseService: MedicalCaseService) {
    this.role = sessionStorage.getItem('role')!;
    this._locale = 'ro';
    this._adapter.setLocale(this._locale);
  }

  ngOnInit(): void {
    this.role = sessionStorage.getItem('role')!;
    this._locale = 'ro';
    this._adapter.setLocale(this._locale);
  }

  getErrorMessage(): string {
    if (this.CFPImage.hasError('required')) {
      return 'Trebuie sa introduci o valoare';
    }
    return '';
    // return 'Data nasterii trebuie sa fie in trecut';
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
    medicalCase.encodedInfo = bcrypt.hashSync(this.firstName.value! + this.lastName.value! + this.birthDate.value!, SALT);


    medicalCase.birthDate = new Date(this.birthDate.value!);
    medicalCase.additionalInformation = this.additionalInformation.value!;
    medicalCase.presumptiveDiagnosis = this.presumptiveDiagnosis.value!;

    const uploadImageData = new FormData();
    if (this.selectedFiles) {
      uploadImageData.append('image', this.selectedFiles[0]!, this.selectedFiles[0]!.name);
    }
    uploadImageData.append('medicalCase', JSON.stringify(medicalCase));
    console.log(uploadImageData);

    console.log(medicalCase);
    this.medicalCaseService.addMedicalCase(uploadImageData).subscribe(
      (res) => {
        console.log(res);
        this.dialog.open(SuccessModalComponent, {data: `Cazul medical a fost inserat cu succes!`});
        this.resetFields();
      },
      (error) => {
        console.log(error);
        this.dialog.open(ErrorModalComponent, {data: `A existat o eroare la inserarea cazului!`});
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
    // this.selectedFiles = '';
    this.selectedFileName = "";
    this.previewImage = "";
    this.presumptiveDiagnosis.setValue("");
    this.additionalInformation.setValue("");
  }
}
