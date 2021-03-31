import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CommonService} from './CommonService';

// Сервис с кэшированием запросов для findAll(). Используется как базовый класс
// для сервисов, загружающих с бэкенда относительно постоянные данные
// (справочники)

export class CommonCachedService<T> extends CommonService<T> {

  private entities: T[] = null;

  constructor(url: string, httpClient: HttpClient) {
    super(url, httpClient);
  }

  // Overriding findAll() method to use a cache instead of sending a request to server
  findAll(): Observable<T[]> {
    if (this.entities != null) {
      return of(this.entities);
    }
    const response = super.findAll();
    response.subscribe(entities => this.entities = entities);
    return response;
  }

  add(t: T): Observable<T> {
    const response = super.add(t);
    response.subscribe(() => this.refresh());
    return response;
  }

  delete(id: number): Observable<string> {
    const response = super.delete(id);
    response.subscribe(() => this.refresh());
    return response;
  }

  update(id: number, t: T): Observable<T> {
    const response = super.update(id, t);
    response.subscribe(() => this.refresh());
    return response;
  }

  refresh(): void {
    super.findAll().subscribe(entities => this.entities = entities);
  }

}
