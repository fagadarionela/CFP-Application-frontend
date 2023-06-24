import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements AfterViewInit {

  @Input('time') time: number;

  // time: number = 420;
  display: string;
  interval: any;

  @Output('isRunning') isRunning: boolean = false;
  @Output() finishEvaluation = new EventEmitter<void>();

  ngAfterViewInit(): void {
    // console.log(new Date().getTime());
    // // console.log(this.beginDate);
    // // console.log(this.beginDate.getTime(), 'begindate');
    // let begin = new Date().getTime();
    // // let end = new Date(this.beginDate).getTime();
    // let timePassed = begin-end;
    // console.log(begin);
    // console.log(end);
    // console.log(timePassed);
    // console.log(timePassed/1000);
    // if (timePassed > 420000){
    //   this.time = 0;
    // }
    // else{
    //   this.time = 420;
    // }
    // console.log(new Date().getMilliseconds()-this.beginDate.getMilliseconds(),'date');

    if (this.time == 0) {
      console.log('end');
      //update medicalCase
      this.isRunning = false;
      this.finishEvaluation.next();
    }
    this.isRunning = false;
    this.display = this.transform(this.time);
    if (this.time > 0) {
      this.startTimer();
    }
  }

  startTimer() {
    // console.log(this.beginDate);
    this.isRunning = true;
    this.interval = setInterval(() => {
      if (this.time === -1) {
        this.time = 420;
      }

      if (this.time <= 0 && this.isRunning) {
        console.log('end');
        //update medicalCase
        this.isRunning = false;
        this.finishEvaluation.next();
      } else if (this.isRunning) {
        this.time--;
        this.display = this.transform(this.time)
      }
    }, 1000);
  }

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    const seconds = value - minutes * 60;
    if (minutes < 0 || seconds < 0) {
      return '06:59';
    }
    if (minutes < 10) {
      if (seconds < 10) {
        return '0' + minutes + ':0' + seconds;
      }
      return '0' + minutes + ':' + seconds;
    } else {
      if (seconds < 10) {
        return minutes + ':0' + seconds;
      }
      return minutes + ':' + seconds;
    }
  }
}
