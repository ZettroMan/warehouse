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

  send(): void {
    this.deliveryService.findByDateRange(this.range.controls.start.value, this.range.controls.end.value)
      .subscribe(value => console.log(value), () => console.log('error'), () => console.log('xz'));
  }
}
