import {Component, OnInit} from '@angular/core';
import * as XLSX from 'xlsx';
import {TransferService} from '../../../../services/transfer.service';
import {BrandService} from '../../../../services/dao/impl/BrandService';
import {ShopService} from '../../../../services/dao/impl/ShopService';
import {WarehouseService} from '../../../../services/dao/impl/WarehouseService';
import {DeliveryTimeService} from '../../../../services/dao/impl/DeliveryTimeService';
import {DeliveryTypeService} from '../../../../services/dao/impl/DeliveryTypeService';
import {Delivery} from '../../../../model/Delivery';

type AOA = any[][];

@Component({
  selector: 'app-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.scss']
})
export class ImporterComponent implements OnInit {
  data: AOA = [];
  wopts: XLSX.WritingOptions = {bookType: 'xlsx', type: 'array'};
  fileName = 'SheetJS.xlsx';
  pasteTableDisplayedColumns: string[] = ['deliveryDate', 'deliveryTime', 'carInfo', 'driverInfo', 'brand', 'orderNumber',
    'deliveryType', 'sender', 'comment', 'shop', 'numberOfPlaces', 'torgNumber', 'invoice', 'warehouse'];

  constructor(private readonly transferService: TransferService,
              private brandService: BrandService,
              private shopService: ShopService,
              private warehouseService: WarehouseService,
              private deliveryTimeService: DeliveryTimeService,
              private deliveryTypeService: DeliveryTypeService) {
  }

  ngOnInit(): void {
  }

  public setNewData(data: Delivery[]): void {
    this.transferService.updateData(data);
  }

  onFileDropped(evt: any): void {
    const target: DataTransfer = (evt.target) as DataTransfer;
    if (target.files.length !== 1) {
      throw new Error('Нельзя использовать более 1 файла');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* Читаем книгу */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* Берем первый лист */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* Сохраняем внутренности */
      this.data = ((XLSX.utils.sheet_to_json(ws, {header: 1})) as AOA);
      this.setNewData(this.handleData(this.prepareDataToSend(this.data.toString())));
    };
    // reader.readAsBinaryString(target.files[0]);
  }

  fileBrowseHandler(evt: any): void {
    const target: DataTransfer = (evt.target) as DataTransfer;
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* Читаем книгу */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* Вытаскиваем первый лист */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* Сохраняем данные */
      this.data = ((XLSX.utils.sheet_to_json(ws, {header: 1})) as AOA);
      this.setNewData(this.handleData(this.prepareDataToSend(this.data.toString())));
    };
    reader.readAsBinaryString(target.files[0]);
  }

  prepareDataToSend(data: string): string {
    let a = '';
    const splData = data.split(',');
    /* Пропускаем первые 15 значений, т.к. это шапка таблицы */
    for (let i = 15; i < splData.length; i++) {
      if (i % 14 === 0) {
        a = a + splData[i] + '\n';
      } else {
        a = a + splData[i] + '\t';
      }
    }
    return a;
  }

  handleData(data: string): Delivery[] {
    const rowData = data.split('\n');
    const dataObject = [];
    rowData.forEach(rd => {
      if (rd !== '') {
        const rowValues = rd.split('\t');
        rowValues[rowValues.length - 1] = rowValues[rowValues.length - 1].trim();
        const row = {};
        this.pasteTableDisplayedColumns.forEach((str, index) => {
          // Индекс = 0 , это столбец с датой
          if (index === 0) {
            row[str] = new Date((Number(rowValues[index]) - (25567 + 2)) * 86400 * 1000);
          } else if (index === 1) {
            row[str] = this.deliveryTimeService.toDeliveryTime(rowValues[index]);
          } else if (index === 4) {
            row[str] = this.brandService.toBrand(rowValues[index]);
          } else if (index === 6) {
            row[str] = this.deliveryTypeService.toDeliveryType(rowValues[index]);
          } else if (index === 9) {
            row[str] = this.shopService.toShop(rowValues[index]);
          } else if (index === 13) {
            row[str] = this.warehouseService.toWarehouse(rowValues[index]);
          } else {
            row[str] = rowValues[index];
          }
        });
        dataObject.push(row);
      }
    });
    return dataObject;
  }

}
