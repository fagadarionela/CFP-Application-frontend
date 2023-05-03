import {Component} from '@angular/core';
import {ChartConfiguration, ChartData} from "chart.js";
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

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{data: []}]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    }
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
                if (correctDiagnosis.get(medicalCase.correctDiagnosis) === undefined) {
                  correctDiagnosis.set(medicalCase.correctDiagnosis, 0);
                }
                if (incorrectDiagnosis.get(medicalCase.correctDiagnosis) === undefined) {
                  incorrectDiagnosis.set(medicalCase.correctDiagnosis, 0);
                }
                console.log(medicalCase);
                if (medicalCase.correctDiagnosis != medicalCase.residentDiagnosis) {
                  let numberOfCases = incorrectDiagnosis.get(medicalCase.correctDiagnosis)!;
                  incorrectDiagnosis.set(medicalCase.correctDiagnosis, numberOfCases + 1);
                } else {
                  let numberOfCases = correctDiagnosis.get(medicalCase.correctDiagnosis)!;
                  correctDiagnosis.set(medicalCase.correctDiagnosis, numberOfCases + 1);
                }
              }
            );
            this.diseases.forEach(disease => {
              this.barChartDataDiagnostics.labels?.push(disease);
              this.pieChartData.labels?.push(disease);
              let numberOfCorrectDiagnosis = correctDiagnosis.get(disease)!;
              let numberOfIncorrectDiagnosis = incorrectDiagnosis.get(disease)!;
              let totalNumberOfCasesPerDiagnosis = numberOfCorrectDiagnosis + numberOfIncorrectDiagnosis;
              this.pieChartData.datasets[0].data.push(totalNumberOfCasesPerDiagnosis);
              this.barChartDataDiagnostics.datasets[1].data.push(numberOfCorrectDiagnosis);
              this.barChartDataDiagnostics.datasets[0].data.push(numberOfIncorrectDiagnosis);
            });
            console.log(this.pieChartData)
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
