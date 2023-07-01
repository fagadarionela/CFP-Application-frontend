import {Component, OnInit} from '@angular/core';
import {MedicalCaseFull} from "../../models/medical-case-full";
import {MedicalCaseService} from "../../services/medical-case.service";
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

  resizedImage: string = '';

  role: string = '';

  colors: any;

  drawingSizes = {small: 1, medium: 5}

  message: string;

  constructor(private medicalCaseService: MedicalCaseService, private dialog: MatDialog) {
    this.role = sessionStorage.getItem('role')!;
  }

  async ngOnInit() {
    this.image = this.medicalCase.cfpimageCustomized ? 'data:image/jpeg;base64,' + this.medicalCase.cfpimageCustomized : 'data:image/jpeg;base64,' + this.medicalCase.cfpimage;
    this.resizedImage = await this.resizeBase64Image(this.image, 900, 900);
    if (this.role === 'EXPERT'){
      this.colors = {
        'black': 'black',
        'red': 'red'
      }
    }
    else
    {
      this.colors = {
        'black': 'black',
        'white': 'white',
        'yellow': 'yellow',
        'blue': 'blue',
        'green': 'green',
        'purple': 'purple'
      }
    }
  }

  public save($event: any) {
    let file = new File([$event], "name");
    this.addImage(file);
  }

  reset() {
    this.dialog.closeAll()
  }

  addImage(file: File) {
    const uploadImageData = new FormData();
    uploadImageData.append('image', file);
    uploadImageData.append('id', this.medicalCase.id);
    this.medicalCaseService.addDrawing(uploadImageData).subscribe(
      async (res) => {
        // console.log(res);
        this.message = 'Medical case has been successfully updated!';
        this.medicalCase.cfpimageCustomized = await this.getBase64Image(file);
      },
      (error) => {
        console.log(error);
        this.message = 'There was a problem when updating the medical case!';
      });
  }

  getBase64Image(file: any): any {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        let encoded = reader.result!.toString().replace(/^data:(.*,)?/, '');
        if ((encoded.length % 4) > 0) {
          encoded += '='.repeat(4 - (encoded.length % 4));
        }
        resolve(encoded);
      };
      reader.onerror = error => reject(error);
    });
  }
  resizeBase64Image = (base64: string, width: number, height: number): Promise<string> => {
    // Create a canvas element
    const canvas = document.createElement('canvas') as HTMLCanvasElement;

    // Create an image element from the base64 string
    const image = new Image();
    image.src = base64;

    // Return a Promise that resolves when the image has loaded
    return new Promise((resolve, reject) => {
      image.onload = () => {
        // Calculate the aspect ratio of the image
        const aspectRatio = image.width / image.height;

        // Calculate the best fit dimensions for the canvas
        if (width / height > aspectRatio) {
          canvas.width = height * aspectRatio;
          canvas.height = height;
        } else {
          canvas.width = width;
          canvas.height = width / aspectRatio;
        }

        // Draw the image to the canvas
        canvas.getContext('2d')!.drawImage(image, 0, 0, canvas.width, canvas.height);

        // Resolve the Promise with the resized image as a base64 string
        resolve(canvas.toDataURL());
      };

      image.onerror = reject;
    });
  };

  // async function resizeBase64Image(base64: string, targetWidth: number, targetHeight: number): Promise<string> {
  //   // Decode the base64 image data and save it to a buffer
  //   const imageBuffer = Buffer.from(base64, "base64");
  //
  //   // Use Jimp to load the image from the buffer and resize it
  //   const image = await Jimp.read(imageBuffer);
  //   image.resize(targetWidth, targetHeight);
  //
  //   // Convert the image back to a base64 data URI
  //   const resizedImageBase64 = await image.getBase64Async(Jimp.MIME_PNG);
  //
  //   return resizedImageBase64;
  // }
}
