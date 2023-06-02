import {Component} from '@angular/core';
import {Disease} from "../../models/disease";
import {ClinicalSignService} from "../../services/clinical-sign.service";
import {ClinicalSign} from "../../models/clinical-sign";
import {MethodService} from "../../services/method.service";
import {SignService} from "../../services/sign.service";
import {Method} from "../../models/method";
import {Sign} from "../../models/sign";
import {DifferentialDiagnosis} from "../../models/differential-diagnosis";
import {TherapeuticPlan} from "../../models/therapeutic-plan";
import {DiseaseService} from "../../services/disease.service";
import {SuccessModalComponent} from "../success-modal/success-modal.component";
import {ErrorModalComponent} from "../error-modal/error-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {EducationalTopicService} from "../../services/educational-topic.service";
import {EducationalTopic} from "../../models/educational-topic";

@Component({
  selector: 'app-add-disease-modal',
  templateUrl: './add-disease-modal.component.html',
  styleUrls: ['./add-disease-modal.component.css']
})
export class AddDiseaseModalComponent {

  disease: Disease = new Disease();

  clinicalSigns: ClinicalSign[];
  signs: Sign[];
  methods: Method[];
  educationalTopics: EducationalTopic[];
  clinicalSignVisible: boolean = false;

  constructor(private clinicalSignService: ClinicalSignService, private signService: SignService, private methodService: MethodService,
              private diseaseService: DiseaseService, private educationalTopicService: EducationalTopicService, private dialog: MatDialog) {
    clinicalSignService.getAllClinicalSigns().subscribe(
      (data) => this.clinicalSigns = data
    )
    signService.getAllSigns().subscribe(
      (data) => this.signs = data
    )
    methodService.getAllMethods().subscribe(
      (data) => this.methods = data
    )
    educationalTopicService.getAllEducationalTopics().subscribe(
      (data) => this.educationalTopics = data
    )
    this.disease.educationalTopic = new EducationalTopic('');
    console.log(this.disease, "D");
  }

  addClinicalSign() {
    this.clinicalSignVisible = true;
  }

  addDifferentialDiagnosisAndTherapeuticPlan() {
    this.disease.differentialDiagnosis.push(new DifferentialDiagnosis());
    this.disease.therapeuticPlans.push(new TherapeuticPlan());
  }

  changeTherapeuticPlanName(i: number, name: string) {
    this.disease.therapeuticPlans[i].name = name;
  }

  changeDifferentialDiagnosisName(i: number, name: string) {
    this.disease.differentialDiagnosis[i].name = name;
  }

  addDisease() {
    console.log(this.disease, 'disease');
    this.disease.retinalCondition = true;
    this.diseaseService.addDisease(this.disease).subscribe(() => {
        this.dialog.open(SuccessModalComponent, {data: `Diagnosticul a fost adaugat cu succes!`})
          .afterClosed().subscribe(() => window.location.reload())
      },
      error => {
        console.log(error)
        this.dialog.open(ErrorModalComponent, {data: `A existat o problema la adaugarea diagnosticului!`})
          // .afterClosed().subscribe(() => window.location.reload())
      });
  }
}

