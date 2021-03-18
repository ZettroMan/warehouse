import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Delivery} from '../../model/Delivery';
import {DeliveryService} from '../../services/dao/impl/DeliveryService';
import {MatTableDataSource} from '@angular/material/table';
import {DeliveryDto} from '../../model/DeliveryDto';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {

  deliveries: Observable<Delivery[]>;
  displayedColumns: string[];
  dataSource: MatTableDataSource<any[]>;
  dataToSend: DeliveryDto[];
  stringRows: string[];

  constructor(private ds: DeliveryService) {}

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
    this.stringRows = [];
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
    this.stringRows = rowData;
    this.dataSource = new MatTableDataSource(data);
  }

  sendDeliveriesEvent(): void {
    console.log(this.tableToDeliveries(this.stringRows));
    const delivery: Delivery[] = [];
    // console.log(this.dataToSend.length);
    for (let i = 0; i < this.dataToSend.length; i++) {
      delivery.push(this.dataToSend[i].buildDelivery(this.dataToSend[i]));
    }
    console.log(delivery);
    this.ds.add(delivery[0]);
    this.dataSource = null;
    this.reloadData();
  }

  tableToDeliveries(data: string[]): DeliveryDto[] {
    this.dataToSend = [];
    for (let i = 0; i < data.length - 1; i++) {
      const delivery: DeliveryDto = new DeliveryDto();
      // Разбиваем строковое значение даты по точкам и указываем значения явно в объект Date
      const rowData = data[i].split('\t');
      // const date: Date = new Date();
      // // const partsOfDate = data[0].split('.');
      // // date.setDate(Number(partsOfDate[0]));
      // // date.setMonth(Number(partsOfDate[1]));
      // // date.setFullYear(Number(partsOfDate[2]));
      // console.log(date);
      delivery.deliveryDate = rowData[0];
      // Закончили с датой, заполняем остальные поля
      delivery.deliveryTime = rowData[1];
      delivery.carInfo = rowData[2];
      delivery.driverInfo = rowData[3];
      delivery.brand = rowData[4];
      delivery.orderNumber = rowData[5];
      delivery.deliveryType = rowData[6];
      delivery.sender = rowData[7];
      delivery.comment = rowData[8];
      delivery.shop = rowData[9];
      delivery.numberOfPlaces = rowData[10];
      delivery.torgNumber = rowData[11];
      delivery.invoice = rowData[12];
      this.dataToSend.push(delivery);
    }
    return this.dataToSend;
  }
}
