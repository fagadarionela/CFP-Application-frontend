import {Component} from '@angular/core';
import {ChartConfiguration, ChartData} from "chart.js";
import {MedicalCaseFull} from "../models/medical-case-full";
import {MedicalCaseService} from "../services/medical-case.service";
import {DiseaseService} from "../services/disease.service";
import {Disease} from "../models/disease";
import {NgChartsModule} from "ng2-charts";

@Component({
  selector: 'app-medical-cases-chart',
  templateUrl: './medical-cases-chart.component.html',
  styleUrls: ['./medical-cases-chart.component.css']
})
export class MedicalCasesChartComponent {

  medicalCases: MedicalCaseFull[];
  diseases: Disease[];

  chartData: any[] = [];

  chartDataStacked: any[] = [];

  chartLabels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'November',
    'December'
  ];

  chartLabelsStaked: any[] = [];

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: false,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y:
        {
          position: 'left',
          min: 0.0,
          max: 10.0
        }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true
        },
      }
    }
  };

  public barChartDataDiagnostics: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {data: [], label: 'Incorrect'},
      {data: [], label: 'Correct'}
    ]
  };
  public barChartDataCompleteIncomplete: ChartConfiguration<'bar'>['data'] = {
    labels: ['Medical cases assigned to resident'],
    datasets: [
      {data: [], label: 'Incomplete'},
      {data: [], label: 'In progress'},
      {data: [], label: 'Complete'}
    ]
  };

  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{data: []}]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true
        },
      }
    }
  };

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'left',
        labels: {
          usePointStyle: true
        },
      }
    }
  };
  constructor(private medicalCaseService: MedicalCaseService, private diseaseService: DiseaseService) {
    for (let i = 29; i >= 0; i--) {
      var date = new Date(new Date().setDate(new Date().getDate() - i));
      let month = date.getMonth() + 1;
      let monthStr = '' + month;
      let day = date.getDate();
      let dayStr = '' + day;
      if (month < 10) {
        monthStr = '0' + month;
      }
      if (day < 10) {
        dayStr = '0' + day;
      }
      this.chartLabelsStaked.push(dayStr + '.' + monthStr)
    }
    this.diseaseService.getAllDiseases().subscribe(
      (data) => {
        this.diseases = data;
        this.medicalCaseService.getAllAssigned().subscribe(
          (data) => {
            this.medicalCases = data;

            let incorrectDiagnosis = new Map<string, number>();
            let correctDiagnosis = new Map<string, number>();
            let gradesMonthly: Array<Map<string, number>> = new Array<Map<string, number>>();
            let numberOfCasesMonthly: Array<Map<string, number>> = new Array<Map<string, number>>();
            let numberOfCasesDaily: Array<Map<string, number>> = new Array<Map<string, number>>();
            for (let i = 0; i < 12; i++) {
              gradesMonthly.push(new Map<string, number>());
              numberOfCasesMonthly.push(new Map<string, number>());
            }
            let today = new Date();
            for (let i = 29; i >= 0; i--) {
              numberOfCasesDaily.push(new Map<string, number>());
            }
            let numberOfCompleteCases = 0;
            let numberOfInProgressCases = 0;
            let numberOfIncompleteCases = 0;
            this.medicalCases.forEach(medicalCase => {
                if (medicalCase.completedByResident) {
                  if (medicalCase.completedByExpert) {
                    numberOfCompleteCases++;
                    let month = new Date(medicalCase.beginDate).getMonth();

                    const MS_PER_DAY: number = 1000 * 60 * 60 * 24;
                    const start: number = new Date(medicalCase.beginDate).getTime();
                    const end: number = today.getTime();
                    const daysBetweenDates: number = Math.round((end - start) / MS_PER_DAY);
                    if (daysBetweenDates <= 29) {
                      // console.log(daysBetweenDates)
                      // console.log(gradesDaily[daysBetweenDates])
                      let numberOfCasesDailyElement = numberOfCasesDaily[daysBetweenDates];
                      if (numberOfCasesDailyElement.get(medicalCase.correctDiagnosis) === undefined) {
                        numberOfCasesDailyElement.set(medicalCase.correctDiagnosis, 1);
                      } else {
                        numberOfCasesDailyElement.set(medicalCase.correctDiagnosis, numberOfCasesDailyElement.get(medicalCase.correctDiagnosis)! + 1);
                      }
                    }
                    let gradesMonthlyElement = gradesMonthly[month];
                    let numberOfCasesMonthlyElement = numberOfCasesMonthly[month];
                    if (gradesMonthlyElement.get(medicalCase.correctDiagnosis) === undefined) {
                      gradesMonthlyElement.set(medicalCase.correctDiagnosis, medicalCase.grade);
                      numberOfCasesMonthlyElement.set(medicalCase.correctDiagnosis, 1);
                    } else {
                      gradesMonthlyElement.set(medicalCase.correctDiagnosis, gradesMonthlyElement.get(medicalCase.correctDiagnosis)! + medicalCase.grade);
                      numberOfCasesMonthlyElement.set(medicalCase.correctDiagnosis, numberOfCasesMonthlyElement.get(medicalCase.correctDiagnosis)! + 1);
                    }
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
              this.barChartDataDiagnostics.labels?.push(disease.name);
              this.pieChartData.labels?.push(disease.name);
              let numberOfCorrectDiagnosis = correctDiagnosis.get(disease.name)!;
              let numberOfIncorrectDiagnosis = incorrectDiagnosis.get(disease.name)!;
              let totalNumberOfCasesPerDiagnosis = numberOfCorrectDiagnosis + numberOfIncorrectDiagnosis;
              this.pieChartData.datasets[0].data.push(totalNumberOfCasesPerDiagnosis);
              this.barChartDataDiagnostics.datasets[1].data.push(numberOfCorrectDiagnosis);
              this.barChartDataDiagnostics.datasets[0].data.push(numberOfIncorrectDiagnosis);
            });
            this.barChartDataCompleteIncomplete.datasets[2].data.push(numberOfCompleteCases);
            this.barChartDataCompleteIncomplete.datasets[1].data.push(numberOfInProgressCases);
            this.barChartDataCompleteIncomplete.datasets[0].data.push(numberOfIncompleteCases);
            for (let i = 0; i < 12; i++) {
              let gradesMonthlyElement = gradesMonthly[i];
              let numberOfCasesMonthlyElement = numberOfCasesMonthly[i];
              for (let disease of this.diseases) {
                if (gradesMonthlyElement.get(disease.name) === undefined) {
                  gradesMonthlyElement.set(disease.name, 0);
                } else {
                  let grade = gradesMonthlyElement.get(disease.name)! / numberOfCasesMonthlyElement.get(disease.name)!;
                  gradesMonthlyElement.set(disease.name, Number(grade.toFixed(2)));
                }
              }
            }
            this.diseases.forEach(disease => {
              let data: number[] = [];
              let dataStacked: number[] = [];
              for (let i = 0; i < 12; i++) {
                if (gradesMonthly[i].get(disease.name) === undefined) {
                  // this.chartData[i].data.push(0);
                  data.push(0)
                } else {
                  data.push(gradesMonthly[i].get(disease.name)!)
                }

              }
              for (let i = 29; i >= 0; i--) {
                console.log(numberOfCasesDaily[i],i)
                if (numberOfCasesDaily[i].get(disease.name) === undefined) {
                  dataStacked.push(0);
                } else {
                  dataStacked.push(numberOfCasesDaily[i].get(disease.name)!)
                }
              }
              this.chartData.push({data: data, label: disease.name})
              this.chartDataStacked.push({data: dataStacked, label: disease.name, stack: 'a' })
            })
          }
        );
      });
    console.log(this.chartDataStacked)
  }

  ngOnInit() {
  }
}
