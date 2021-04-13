import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DateAdapter} from '@angular/material/core';
import {DeliveryService} from '../../../services/dao/impl/DeliveryService';

export interface ChartObject {
  name: string;
  value: number;
}


@Component({
  selector: 'app-reports',
  templateUrl: './uniqueDeliveries.component.html',
  styleUrls: ['./uniqueDeliveries.component.css']
})
export class UniqueDeliveriesComponent implements OnInit {
  view: any[] = [900, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Дата';
  showYAxisLabel = true;
  yAxisLabel = 'Кол-во поставок';
  legendTitle = 'Даты поставок';
  showDataLabel = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  deliveriesInRange: any[] = [];

  constructor(private dateAdapter: DateAdapter<any>,
              private deliveryService: DeliveryService) {
    this.dateAdapter.setLocale('ru-RU');
  }

  ngOnInit(): void {
  }

  send(): void {
    this.deliveriesInRange = [];
    this.deliveryService.findByDateRange(this.range.controls.start.value, this.range.controls.end.value)
      .subscribe(value => {
        value.forEach(value1 => this.deliveriesInRange.push({
            name: value1.deliveryDate.toString(),
            value: 5
          }
        ));
      }, () => console.log('error'));
  }

  onSelect($event: any): void {
    console.log($event);
  }
}
