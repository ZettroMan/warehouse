import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {CommonService} from './CommonService';
import {DeliveryDao} from '../interface/DeliveryDao';
import {Delivery} from '../../../model/Delivery';
import {DeliverySearchValues} from '../search/SearchObjects';
import {Observable} from 'rxjs';
import {saveAs} from 'file-saver';

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

  addAll(obj: Delivery[]): Observable<boolean> {
    return this.http.post<boolean>('https://command-project-warehouse.herokuapp.com/api/v1/grouped-deliveries', obj);
  }

  loadToExcel(data: Delivery[], displayedColumns: string[]): void {
    console.log(data);
    console.log(displayedColumns);
    this.http.post('https://command-project-warehouse.herokuapp.com/api/v1/deliveries/report',
      data, {params: {columns: displayedColumns}, responseType: 'blob'})
      .subscribe(onloadeddata => this.downloadFile(onloadeddata),
        () => console.log('Error downloading the file.'), () => console.log('OK'));
  }

  downloadFile(data: Blob): void {
    saveAs(data, 'report.xls');

    // это второй вариант сохранения, но он рандомно присваивает имя загруженному файлу
    // const url = window.URL.createObjectURL(data);
    // window.open(url);
  }

}
