import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {CommonService} from './CommonService';
import {DeliveryDao} from '../interface/DeliveryDao';
import {Delivery} from '../../../model/Delivery';

// глобальная переменная для хранения URL
export const DELIVERY_URL_TOKEN = new InjectionToken<string>('url');

// класс реализует методы доступа к данным с помощью RESTful запросов в формате JSON

// JSON формируется автоматически для параметров и результатов

@Injectable({
  providedIn: 'root'
})

// благодаря DAO и единому интерфейсу - мы можем вынести общую реализация в класс выше и избежать дублирования кода
// классу остается только реализовать свои специфичные методы доступа к данным
export class DeliveryService extends CommonService<Delivery> implements DeliveryDao {


  constructor(@Inject(DELIVERY_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }


  // поиск доставок по любым параметрам
  // findDeliveries(searchObj: DeliverySearchValues): Observable<any> { // из backend получаем тип Page, поэтому указываем any
  //   return this.http.post<any>(this.baseUrl + '/search', searchObj);
  // }


  name = 'Paste it';
  val: any;
  displayedColumns: string[] ;
  dataSource: any[] = [];

  data(event: ClipboardEvent): void {
    let clipboardData = event.clipboardData;
    let pastedText = clipboardData.getData('text');
    let row_data = pastedText.split('\n');
    this.displayedColumns = row_data[0].split('\t');
    delete row_data[0];
    // Create table dataSource
    let data=[];

    row_data.forEach(row_data=>{
      let row={};
      this.displayedColumns.forEach((a, index)=>{row[a]= row_data.split('\t')[index]});
      data.push(row);
    })
    this.dataSource = data;
  }

}
