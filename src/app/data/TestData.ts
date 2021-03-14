// тестовые данные в виде массивов (заменяют таблицы БД)

import {Warehouse} from '../model/Warehouse';
import {Brand} from '../model/Brand';
import {User} from '../model/User';

export class TestData {

  static warehouses: Warehouse[] = [
    {id: 1, name: 'Склад 1', label: 'WH1'},
    {id: 2, name: 'Склад 2', label: 'WH2'},
    {id: 3, name: 'Склад 3', label: 'WH3'},
    {id: 4, name: 'Склад 4', label: 'WH4'},
    {id: 5, name: 'Склад 5', label: 'WH5'},
  ];


  static brands: Brand[] = [
    {id: 1, name: 'Бренд 1', label: 'BRND_1'},
    {id: 2, name: 'Бренд 2', label: 'BRND_2'},
    {id: 3, name: 'Бренд 3', label: 'BRND_3'},
    {id: 4, name: 'Бренд 4', label: 'BRND_4'},
    {id: 5, name: 'Бренд 5', label: 'BRND_5'},
    {id: 6, name: 'Бренд 6', label: 'BRND_6'},
    {id: 7, name: 'Бренд 7', label: 'BRND_7'},
    {id: 8, name: 'Бренд 8', label: 'BRND_8'},
    {id: 9, name: 'Бренд 9', label: 'BRND_9'},
  ];


  static users: User[] = [
    {
      id: 1,
      username: 'timur',
      fullName: 'Таймураз',
      email: 'tm@gmail.com',
      phone: '+78867892431',
      role: 'ADMIN',
    },
    {
      id: 2,
      username: 'igor',
      fullName: 'Игорь Владимирович Коробов',
      email: 'igorek@gmail.com',
      phone: '+75647983245',
      role: 'BRAND_MANAGER',
    },
    {
      id: 3,
      username: 'semen',
      fullName: 'Семён Андреевич Лалетин',
      email: 'sema@yandex.ru',
      phone: '+74657122347',
      role: 'BRAND_MANAGER',
    },
    {
      id: 4,
      username: 'ravshan',
      fullName: 'Равшан Абдимуталибович Мамасаидов',
      email: 'vanya@yandex.ru',
      phone: '+799996448945',
      role: 'WAREHOUSE',
    },
    {
      id: 5,
      username: 'dzhamshut',
      fullName: 'Джамшут Ибрагимович Аликбеков',
      email: 'dima@yandex.ru',
      phone: '+79654669123',
      role: 'WAREHOUSE',
    }
  ];

}

