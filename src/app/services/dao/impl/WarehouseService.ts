import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {CommonService} from './CommonService';
import {WarehouseSearchValues} from '../search/SearchObjects';
import {Observable} from 'rxjs';
import {Warehouse} from '../../../model/Warehouse';
import {WarehouseDao} from '../interface/WarehouseDao';

// глобальная переменная для хранения URL
export const WAREHOUSES_URL_TOKEN = new InjectionToken<string>('url');

// класс реализует методы доступа к данным с помощью RESTful запросов в формате JSON

// JSON формируется автоматически для параметров и результатов

@Injectable({
  providedIn: 'root'
})

// благодаря DAO и единому интерфейсу - мы можем вынести общую реализация в класс выше и избежать дублирования кода
// классу остается только реализовать свои специфичные методы доступа к данным
export class WarehouseService extends CommonService<Warehouse> implements WarehouseDao {

  constructor(@Inject(WAREHOUSES_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }

  // поиск поставок по любым параметрам
  findWarehouses(searchObj: WarehouseSearchValues): Observable<any> { // из backend получаем тип Page, поэтому указываем any
    return this.http.post<any>(this.baseUrl + '/search', searchObj);
  }

}
