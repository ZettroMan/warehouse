import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserSearchValues} from '../search/SearchObjects';
import {Observable} from 'rxjs';
import {UserDao} from '../interface/UserDao';
import {User} from '../../../model/User';
import {CommonCachedService} from './CommonCachedService';

// глобальная переменная для хранения URL
export const USERS_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})

// благодаря DAO и единому интерфейсу - мы можем вынести общую реализация в класс выше и избежать дублирования кода
// классу остается только реализовать свои специфичные методы доступа к данным
export class UserService extends CommonCachedService<User> implements UserDao {

  constructor(@Inject(USERS_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }

  // поиск поставок по любым параметрам
  findUsers(searchObj: UserSearchValues): Observable<any> {   // из backend получаем тип Page, поэтому указываем any
    return this.http.post<any>(this.baseUrl + '/search', searchObj);
  }
}
