import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  currentDateTime : Date;

  constructor() { }

  ngOnInit(): void {
    const observable = interval(1000);
    observable.subscribe(() => {
      this.currentDateTime = new Date();
    });
  }

}
