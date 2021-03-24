// захардкоденные данные, которые мы пока не получаем с бэка

import {Role} from '../model/Role';
import {DeliveryTime} from '../model/DeliveryTime';
import {DeliveryType} from '../model/DeliveryType';

export class TestData {

  // роли пользователей
  static roles: Role[] = [
    {id: 1, role: 'ADMIN'},
    {id: 2, role: 'WAREHOUSE'},
    {id: 3, role: 'BRAND_MANAGER'}
  ];

  // время доставки
  static deliveryTimes: DeliveryTime[] = [
    {id: 1, deliveryTime: 'MORNING'},
    {id: 2, deliveryTime: 'AFTERNOON'},
    {id: 3, deliveryTime: 'WHOLE_DAY'}
  ];

  static deliveryTypes: DeliveryType[] = [
    {id: 1, type: 'WAREHOUSE'},
    {id: 2, type: 'CROSS-DOCKING'}
  ];

}

