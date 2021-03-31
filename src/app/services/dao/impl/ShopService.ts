import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShopSearchValues} from '../search/SearchObjects';
import {Observable} from 'rxjs';
import {ShopDao} from '../interface/ShopDao';
import {Shop} from '../../../model/Shop';
import {CommonCachedService} from './CommonCachedService';

// глобальная переменная для хранения URL
export const SHOPS_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})

export class ShopService extends CommonCachedService<Shop> implements ShopDao {

  constructor(@Inject(SHOPS_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }

  // поиск поставок по любым параметрам
  findShops(searchObj: ShopSearchValues): Observable<any> { // из backend получаем тип Page, поэтому указываем any
    return this.http.post<any>(this.baseUrl + '/search', searchObj);
  }

}
