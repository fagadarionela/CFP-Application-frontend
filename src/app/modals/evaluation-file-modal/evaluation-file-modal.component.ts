import {Component} from '@angular/core';
import {MedicalCaseFull} from "../../models/medical-case-full";

@Component({
  selector: 'app-evaluation-file-modal',
  templateUrl: './evaluation-file-modal.component.html',
  styleUrls: ['./evaluation-file-modal.component.css']
})
export class EvaluationFileModalComponent {

  medicalCase: MedicalCaseFull;

  constructor() {
  }
}
