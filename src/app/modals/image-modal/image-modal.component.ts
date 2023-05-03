import {Component, OnInit} from '@angular/core';
import {MedicalCaseFull} from "../../models/medical-case-full";
import {MedicalCaseService} from "../../services/medical-case.service";
import {SuccessModalComponent} from "../success-modal/success-modal.component";
import {ErrorModalComponent} from "../error-modal/error-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {

  medicalCase: MedicalCaseFull;
  outputQuality: number = 0.8;
  image: string = '';

  role: string = '';

  colors = {};

  drawingSizes = {small: 1, medium: 5}

  constructor(private medicalCaseService: MedicalCaseService, private dialog: MatDialog) {
    this.role = sessionStorage.getItem('role')!;
  }

  ngOnInit(): void {
    this.image = this.medicalCase.cfpimageCustomized ? 'data:image/jpeg;base64,' + this.medicalCase.cfpimageCustomized : 'data:image/jpeg;base64,' + this.medicalCase.cfpimage;
    console.log(this.image);
    if (this.role === 'EXPERT')
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
    let file = new File([$event], "name");
    this.addImage(file);
  }

  reset() {
    this.dialog.closeAll()
  }

  addImage(file: File){
    const uploadImageData = new FormData();
    uploadImageData.append('image', file);
    uploadImageData.append('id', this.medicalCase.id);
    this.medicalCaseService.addDrawing(uploadImageData).subscribe(
      (res) => {
        console.log(res);
        this.dialog.open(SuccessModalComponent, {data: `Cazul medical a fost actualizat cu succes!`})
          .afterClosed().subscribe(() => this.dialog.closeAll());
      },
      (error) => {
        console.log(error);
        this.dialog.open(ErrorModalComponent, {data: `A existat o eroare la actualizarea cazului!`})
          .afterClosed().subscribe(() => this.dialog.closeAll());
      });
  }
}
