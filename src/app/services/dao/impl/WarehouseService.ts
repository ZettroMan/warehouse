import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WarehouseSearchValues} from '../search/SearchObjects';
import {Observable} from 'rxjs';
import {Warehouse} from '../../../model/Warehouse';
import {WarehouseDao} from '../interface/WarehouseDao';
import {CommonCachedService} from './CommonCachedService';
import {Shop} from '../../../model/Shop';
import {Brand} from '../../../model/Brand';

// глобальная переменная для хранения URL
export const WAREHOUSES_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})

export class WarehouseService extends CommonCachedService<Warehouse> implements WarehouseDao {

  constructor(@Inject(WAREHOUSES_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }

  // поиск поставок по любым параметрам
  findWarehouses(searchObj: WarehouseSearchValues): Observable<any> { // из backend получаем тип Page, поэтому указываем any
    return this.http.post<any>(this.baseUrl + '/search', searchObj);
  }

  toWarehouse(text: string): Brand {
    if (this.entities === null) { return null; }
    const result = this.entities.filter(entity => entity.name === text);
    if (result.length > 0) {
      return result[0];
    }
    return null;
  }
}
