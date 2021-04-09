import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-reports',
  templateUrl: './uniqueDeliveries.component.html',
  styleUrls: ['./uniqueDeliveries.component.css']
})
export class UniqueDeliveriesComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(private dateAdapter: DateAdapter<any>) {
    this.dateAdapter.setLocale('ru-RU');
  }

  ngOnInit(): void {
  }
}
