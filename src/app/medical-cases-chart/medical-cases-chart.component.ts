import {Component} from '@angular/core';
import {ChartConfiguration} from "chart.js";
import {MedicalCaseFull} from "../models/medical-case-full";
import {MedicalCaseService} from "../services/medical-case.service";
import {DiseaseService} from "../services/disease.service";

@Component({
  selector: 'app-medical-cases-chart',
  templateUrl: './medical-cases-chart.component.html',
  styleUrls: ['./medical-cases-chart.component.css']
})
export class MedicalCasesChartComponent {

  medicalCases: MedicalCaseFull[];
  diseases: string[];

  public barChartDataDiagnostics: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {data: [], label: 'Incorect'},
      {data: [], label: 'Corect'}
    ]
  };
  public barChartDataCompleteIncomplete: ChartConfiguration<'bar'>['data'] = {
    labels: ['Cazuri medicale'],
    datasets: [
      {data: [], label: 'Incomplete'},
      {data: [], label: 'In progres'},
      {data: [], label: 'Complete'}
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  constructor(private medicalCaseService: MedicalCaseService, private diseaseService: DiseaseService) {
    this.diseaseService.getAllDiseases().subscribe(
      (data) => {
        this.diseases = data;
        this.medicalCaseService.getAllAssigned().subscribe(
          (data) => {
            this.medicalCases = data;

            let incorrectDiagnosis = new Map<string, number>();
            let correctDiagnosis = new Map<string, number>();
            let numberOfCompleteCases = 0;
            let numberOfInProgressCases = 0;
            let numberOfIncompleteCases = 0;
            this.medicalCases.forEach(medicalCase => {
                if (medicalCase.completedByResident) {
                  if (medicalCase.completedByExpert) {
                    numberOfCompleteCases++;
                  } else {
                    numberOfInProgressCases++;
                  }
                } else {
                  numberOfIncompleteCases++;
                }
                if (medicalCase.correctDiagnosis != medicalCase.residentDiagnosis) {
                  let numberOfCases = incorrectDiagnosis.get(medicalCase.correctDiagnosis);
                  if (numberOfCases != undefined) {
                    incorrectDiagnosis.set(medicalCase.correctDiagnosis, numberOfCases + 1);
                  } else {
                    incorrectDiagnosis.set(medicalCase.correctDiagnosis, 1);
                  }
                } else {
                  let numberOfCases = correctDiagnosis.get(medicalCase.correctDiagnosis);
                  if (numberOfCases != undefined) {
                    correctDiagnosis.set(medicalCase.correctDiagnosis, numberOfCases + 1);
                  } else {
                    correctDiagnosis.set(medicalCase.correctDiagnosis, 1);
                  }
                }
              }
            );
            this.diseases.forEach(disease => {
              this.barChartDataDiagnostics.labels?.push(disease);
              let numberOfCorrectDiagnosis = correctDiagnosis.get(disease);
              let numberOfIncorrectDiagnosis = incorrectDiagnosis.get(disease);
              this.barChartDataDiagnostics.datasets[1].data.push(numberOfCorrectDiagnosis != undefined ? numberOfCorrectDiagnosis : 0);
              this.barChartDataDiagnostics.datasets[0].data.push(numberOfIncorrectDiagnosis != undefined ? numberOfIncorrectDiagnosis : 0);
            });
            this.barChartDataCompleteIncomplete.datasets[2].data.push(numberOfCompleteCases);
            this.barChartDataCompleteIncomplete.datasets[1].data.push(numberOfInProgressCases);
            this.barChartDataCompleteIncomplete.datasets[0].data.push(numberOfIncompleteCases);
          }
        );
      });

  }

  ngOnInit() {

  }
}
