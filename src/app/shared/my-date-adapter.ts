import {NativeDateAdapter} from "@angular/material/core";
import moment from "moment";

export class MyDateAdapter extends NativeDateAdapter {
  override format(date: Date, displayFormat: Object): string {

    if (displayFormat == "input") {
      // console.log(date);
      // console.log(displayFormat)
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      return this._to2digit(day) + '/' + this._to2digit(month) + '/' + year;
    } else {
      return date.toDateString();
    }
  }

  private _to2digit(n: number) {
    return ('00' + n).slice(-2);
  }

  override parse(value: any): Date | null {
    const date = moment(value, 'DD/MM/YYYY');
    return date.isValid() ? date.toDate() : null;
  }
}
