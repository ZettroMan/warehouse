import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

// базовые методы доступа к данным, одинаковые для всех классов,
// чтобы не нужно было дублировать весь этот код в каждом классе-сервисе

// JSON формируется автоматически для параметров и результатов

export class CommonService<T> {

  private readonly url: string;

  constructor(url: string,  // базовый URL для доступа к данным
              private httpClient: HttpClient // для выполнения HTTP запросов
  ) {
    this.url = url;
  }

  add(t: T): Observable<T> {
    return this.httpClient.post<T>(this.url, t);
  }

  delete(t: T): Observable<T> {
    return this.httpClient.delete<T>(this.url, t);
  }

  findById(id: number): Observable<T> {
    return this.httpClient.get<T>(this.url + '/' + id);
  }

  findAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url);
  }

  update(t: T): Observable<T> {
    return this.httpClient.post<T>(this.url, t);
  }


}
