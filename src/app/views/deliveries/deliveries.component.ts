import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Delivery} from '../../model/Delivery';
import {DeliveryService} from '../../services/dao/impl/DeliveryService';
import {MatTableDataSource} from '@angular/material/table';
import * as moment from 'moment';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {

  deliveries: Observable<Delivery[]>;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any[]>;
  dataToSend: Observable<Delivery[]>;

  constructor(private ds: DeliveryService) {
  }

  ngOnInit(): void {
    const title = 'Дата прибытия на склад\tПлановое время прибытия на склад\tМарка и номер ТС\tФИО водителя, телефон\tБренд\tВЗ\t' +
      'Тип поставки\tПоставщик\tКомментарий\tМагазин\tКол-во мест\t№ Торг\t№ счет-фактуры';
    this.displayedColumns = title.split('\t');
    this.reloadData();
  }

  private reloadData(): void {
    this.deliveries = this.ds.findAll();
  }

  data(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');
    const rowData = pastedText.split('\n');
    const data = [];

    rowData.forEach(rd => {
      const row = {};
      this.displayedColumns.forEach((a, index) => {
        row[a] = rd.split('\t')[index];
      });
      data.push(row);
    });
    this.dataSource = new MatTableDataSource(data);
  }

  sendDeliveriesEvent(): void {
    // this.ds.addAll(this.tableToDeliveries(this.dataSource));
    this.tableToDeliveries(this.dataSource);
    // console.log(this.dataSource.data.length);
    this.dataSource = null;
    this.reloadData();
  }

  tableToDeliveries(table: MatTableDataSource<any[]>): Delivery[] {
    let result: Delivery[];
    let delivery: Delivery;
    for (let i = 0; i < table.data.length - 1; i++) {
      delivery = null;
      result = null;
      let a: string[][];
      a = table.data[i];
      const b = a.toLocaleString();
      console.log(b);
      // for (let j = 0; j < 13; j++) {
      //   console.log(a[i][j]);
        // delivery.deliveryDate = moment(a[j], 'DD.MM.YYYY').toDate();
        // delivery.deliveryTime = a[j];
        // delivery.carInfo = a[j];
        // delivery.driverInfo = a[j];
        // delivery.brand = a[j];
        // delivery.orderNumber = a[j];
        // delivery.deliveryType = a[j];
        // delivery.sender = a[j];
        // delivery.comment = a[j];
        // delivery.shop = a[j];
        // delivery.numberOfPlaces = a[j];
        // delivery.torgNumber = a[j];
        // delivery.invoice = a[j];
        // console.log(delivery);
      // }
     // result[i] = delivery;
    }
    return null;
  }
}
