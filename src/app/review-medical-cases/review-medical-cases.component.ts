import {Component, Inject, OnInit} from '@angular/core';
import {MedicalCase} from "../models/medical-case";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {MedicalCaseService} from "../services/medical-case.service";

@Component({
  selector: 'app-review-medical-cases',
  templateUrl: './review-medical-cases.component.html',
  styleUrls: ['./review-medical-cases.component.css']
})
export class ReviewMedicalCasesComponent implements OnInit {

  medicalCases: MedicalCase[] = [];

  role: string = '';

  constructor(private httpService: MedicalCaseService, private _adapter: DateAdapter<any>,
              @Inject(MAT_DATE_LOCALE) private _locale: string, private medicalCaseService: MedicalCaseService) {
    this.role = sessionStorage.getItem('role')!;
    this._locale = 'ro';
    this._adapter.setLocale(this._locale);
  }

  ngOnInit(): void {
    this._locale = 'ro';
    this._adapter.setLocale(this._locale);
    this.role = sessionStorage.getItem('role')!;
    if (this.role === 'EXPERT') {
      this.httpService.getAllCompletedMedicalCases().subscribe(data => {
        console.log(data);
        this.medicalCases = data;
      });
    }
  }
}
