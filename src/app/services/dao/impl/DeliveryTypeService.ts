import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DeliveryType} from '../../../model/DeliveryType';
import {DeliveryTypeDao} from '../interface/DeliveryTypeDao';
import {CommonCachedService} from './CommonCachedService';

// глобальная переменная для хранения URL
export const DELIVERY_TYPES_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})

export class DeliveryTypeService extends CommonCachedService<DeliveryType> implements DeliveryTypeDao {

  constructor(@Inject(DELIVERY_TYPES_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }

}
