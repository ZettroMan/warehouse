import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DateAdapter} from '@angular/material/core';
import {DeliveryService} from '../../../services/dao/impl/DeliveryService';

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

  constructor(private dateAdapter: DateAdapter<any>,
              private deliveryService: DeliveryService) {
    this.dateAdapter.setLocale('ru-RU');
  }

  ngOnInit(): void {
  }

  toStringDate(stringDate: string): string {
    const dateParts = stringDate.split('.');
    const date = dateParts[2] + '-' + (dateParts[1]) + '-' + dateParts[0];
    return date;
  }

  send(): void {
    const start = this.toStringDate(this.range.controls.start.value.toLocaleString().split(',')[0]);
    const end = this.toStringDate(this.range.controls.end.value.toLocaleString().split(',')[0]);
    console.log(start);
    console.log(end);
    this.deliveryService.findByRange(start, end);
  }
}
