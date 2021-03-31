import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BrandSearchValues} from '../search/SearchObjects';
import {Observable} from 'rxjs';
import {BrandDao} from '../interface/BrandDao';
import {Brand} from '../../../model/Brand';
import {CommonCachedService} from './CommonCachedService';

// глобальная переменная для хранения URL
export const BRANDS_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})

export class BrandService extends CommonCachedService<Brand> implements BrandDao {

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
