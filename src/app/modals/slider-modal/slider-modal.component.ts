import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CustomizedImage} from "../../models/customized-image";
import {MedicalCaseService} from "../../services/medical-case.service";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-slider-modal',
  templateUrl: './slider-modal.component.html',
  styleUrls: ['./slider-modal.component.css']
})
export class SliderModalComponent implements OnInit {

  images: Array<CustomizedImage> = [];

  customOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      }
    },
    nav: true
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: string, private httpService: MedicalCaseService,
              @Inject(LOCALE_ID) public locale: string) {
  }

  ngOnInit(): void {
    this.httpService.getAllMedicalCasesAssignedTo(this.data).subscribe(medicalCases => {
      if (medicalCases.length < 3){
        this.images.push(new CustomizedImage('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==', "1", "- no previous medical cases -"));
      }
      medicalCases.forEach(medicalCase => {
        console.log(medicalCase);
        this.images.push(new CustomizedImage('data:image/jpeg;base64,' + medicalCase.cfpimage, "2", formatDate(medicalCase.insertDate, 'yyyy-MM-dd HH:mm:ss', this.locale)))
      });
      this.images.sort((a, b) => (a.insertDate < b.insertDate ? -1 : 1))
      console.log(this.images.length)
    })
  }

}
