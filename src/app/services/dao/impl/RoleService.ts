import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {CommonService} from './CommonService';
import {Role} from '../../../model/Role';
import {RoleDao} from '../interface/RoleDao';

// глобальная переменная для хранения URL
export const ROLES_URL_TOKEN = new InjectionToken<string>('url');

// класс реализует методы доступа к данным с помощью RESTful запросов в формате JSON

// JSON формируется автоматически для параметров и результатов

@Injectable({
  providedIn: 'root'
})

// благодаря DAO и единому интерфейсу - мы можем вынести общую реализация в класс выше и избежать дублирования кода
// классу остается только реализовать свои специфичные методы доступа к данным
export class RoleService extends CommonService<Role> implements RoleDao {

  constructor(@Inject(ROLES_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }

}
