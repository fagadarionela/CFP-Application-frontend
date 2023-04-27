import {Component, OnInit} from '@angular/core';
import {MedicalCaseFull} from "../../models/medical-case-full";
import {MedicalCaseService} from "../../services/medical-case.service";
import {SuccessModalComponent} from "../success-modal/success-modal.component";
import {ErrorModalComponent} from "../error-modal/error-modal.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {

  medicalCase: MedicalCaseFull;
  outputQuality: number = 0.8;
  image: string = '';

  colors = {};

  drawingSizes = {small: 1, medium: 5}

  constructor(private medicalCaseService: MedicalCaseService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    let role = sessionStorage.getItem('role');
    this.image = this.medicalCase.cfpimageCustomized ? 'data:image/jpeg;base64,' + this.medicalCase.cfpimageCustomized : 'data:image/jpeg;base64,' + this.medicalCase.cfpimage;
    if (role === 'EXPERT')
      this.colors = {
        'black': 'black',
        'red': 'red'
      }
    else
      this.colors = {
        'black': 'black',
        'white': 'white',
        'yellow': 'yellow',
        'blue': 'blue',
        'green': 'green',
        'purple': 'purple'
      }
  }

  public save($event: any) {
    const uploadImageData = new FormData();
    let file = new File([$event], "name");
    uploadImageData.append('image', file);
    uploadImageData.append('medicalCase', JSON.stringify(this.medicalCase));
    this.medicalCaseService.addDrawing(uploadImageData).subscribe(
      (res) => {
        console.log(res);
        this.dialog.open(SuccessModalComponent, {data: `Cazul medical a fost actualizat cu succes!`})
          .afterClosed().subscribe(() => window.location.reload());
      },
      (error) => {
        console.log(error);
        this.dialog.open(ErrorModalComponent, {data: `A existat o eroare la actualizarea cazului!`})
          .afterClosed().subscribe(() => window.location.reload());
      });
  }

  reset() {
    this.medicalCase.cfpimageCustomized = this.medicalCase.cfpimage;
    this.medicalCaseService.updateMedicalCase(this.medicalCase).subscribe(
      (res) => {
        console.log(res);
        this.dialog.open(SuccessModalComponent, {data: `Cazul medical a fost resetat cu succes!`})
          .afterClosed().subscribe(() => window.location.reload());
      },
      (error) => {
        console.log(error);
        this.dialog.open(ErrorModalComponent, {data: `A existat o eroare la resetarea cazului!`})
          .afterClosed().subscribe(() => window.location.reload());
      });
  }
}
