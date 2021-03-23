import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {CommonService} from './CommonService';
import {BrandSearchValues} from '../search/SearchObjects';
import {Observable} from 'rxjs';
import {BrandDao} from '../interface/BrandDao';
import {Brand} from '../../../model/Brand';

// глобальная переменная для хранения URL
export const BRANDS_URL_TOKEN = new InjectionToken<string>('url');

// класс реализует методы доступа к данным с помощью RESTful запросов в формате JSON

// JSON формируется автоматически для параметров и результатов

@Injectable({
  providedIn: 'root'
})

// благодаря DAO и единому интерфейсу - мы можем вынести общую реализация в класс выше и избежать дублирования кода
// классу остается только реализовать свои специфичные методы доступа к данным
export class BrandService extends CommonService<Brand> implements BrandDao {

  constructor(@Inject(BRANDS_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }

  // поиск брендов по любым параметрам
  findBrands(searchObj: BrandSearchValues): Observable<any> { // из backend получаем тип Page, поэтому указываем any
    return this.http.post<any>(this.baseUrl + '/search', searchObj);
  }

}
