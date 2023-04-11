export class CustomizedImage {
  id: string
  img: string;
  insertDate: string;

  constructor(img: string, id: string, insertDate: string) {
    this.img = img;
    this.id = id;
    this.insertDate = insertDate;
  }
}
