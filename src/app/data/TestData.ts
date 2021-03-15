// тестовые данные в виде массивов (заменяют таблицы БД)

import {Warehouse} from '../model/Warehouse';
import {Brand} from '../model/Brand';
import {User} from '../model/User';
import {Shop} from '../model/Shop';

export class TestData {

  static warehouses: Warehouse[] = [
    {id: 1, name: 'Склад 1', abbr: 'WH1'},
    {id: 2, name: 'Склад 2', abbr: 'WH2'},
    {id: 3, name: 'Склад 3', abbr: 'WH3'},
    {id: 4, name: 'Склад 4', abbr: 'WH4'},
    {id: 5, name: 'Склад 5', abbr: 'WH5'},
  ];

  static brands: Brand[] = [
    {id: 1, name: 'Бренд 1', abbr: 'BRND_1'},
    {id: 2, name: 'Бренд 2', abbr: 'BRND_2'},
    {id: 3, name: 'Бренд 3', abbr: 'BRND_3'},
    {id: 4, name: 'Бренд 4', abbr: 'BRND_4'},
    {id: 5, name: 'Бренд 5', abbr: 'BRND_5'},
    {id: 6, name: 'Бренд 6', abbr: 'BRND_6'},
    {id: 7, name: 'Бренд 7', abbr: 'BRND_7'},
    {id: 8, name: 'Бренд 8', abbr: 'BRND_8'},
    {id: 9, name: 'Бренд 9', abbr: 'BRND_9'},
  ];

  static shops: Shop[] = [
    {id: 1, name: 'Магазин 1', abbr: 'SHOP_1', brand: TestData.brands[3]},
    {id: 2, name: 'Магазин 2', abbr: 'SHOP_2', brand: TestData.brands[5]},
    {id: 3, name: 'Магазин 3', abbr: 'SHOP_3', brand: TestData.brands[7]},
    {id: 4, name: 'Магазин 4', abbr: 'SHOP_4', brand: TestData.brands[2]},
    {id: 5, name: 'Магазин 5', abbr: 'SHOP_5', brand: TestData.brands[2]},
    {id: 6, name: 'Магазин 6', abbr: 'SHOP_6', brand: TestData.brands[4]},
    {id: 7, name: 'Магазин 7', abbr: 'SHOP_7', brand: TestData.brands[7]},
    {id: 8, name: 'Магазин 8', abbr: 'SHOP_8', brand: TestData.brands[9]},
    {id: 9, name: 'Магазин 9', abbr: 'SHOP_9', brand: TestData.brands[1]},
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

