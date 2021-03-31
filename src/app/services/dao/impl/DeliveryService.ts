import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {CommonService} from './CommonService';
import {DeliveryDao} from '../interface/DeliveryDao';
import {Delivery} from '../../../model/Delivery';
import {DeliverySearchValues} from '../search/SearchObjects';
import {Observable} from 'rxjs';

// глобальная переменная для хранения URL
export const DELIVERIES_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})

export class DeliveryService extends CommonService<Delivery> implements DeliveryDao {

  constructor(@Inject(DELIVERIES_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }

  // поиск поставок по любым параметрам
  findDeliveries(searchObj: DeliverySearchValues): Observable<any> { // из backend получаем тип Page, поэтому указываем any
    return this.http.post<any>(this.baseUrl + '/search', searchObj);
  }

}
