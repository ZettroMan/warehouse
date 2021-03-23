
export class BrandSearchValues {
  name: string = null;
  abbr: string = null;
}

export class ShopSearchValues {
  name: string = null;
  abbr: string = null;
}

export class WarehouseSearchValues {
  name: string = null;
  abbr: string = null;
}

export class UserSearchValues {
  name: string = null;
  fullName: string = null;
  email: string = null;
  phone: string = null;
}

export class DeliverySearchValues {

  deliveryDate: Date = null;
  deliveryTimeId: number = null;
  carInfo = '';
  driverInfo = '';
  brandId: number = null;
  orderNumber = '';
  deliveryTypeId: number = null;
  sender = '';
  comment = '';
  shopId: number = null;
  torgNumber = '';
  invoice = '';
  warehouseId: number = null;

  pageNumber = 0; // 1-я страница (значение по-умолчанию)
  pageSize = 10; // сколько элементов на странице (значение по-умолчанию)

  // сортировка
  sortColumn = 'title';
  sortDirection = 'asc';

}


// Далее - это из тудушки, оставил для примера))

// // все возможные параметры поиска категорий
// export class CategorySearchValues {
//     title: string = null;
// }
//
// // все возможные параметры поиска приоритетов
// export class PrioritySearchValues {
//     title: string = null;
// }
//
// // все возможные параметры поиска категорий
// export class TaskSearchValues {
//
//     // начальные значения по-умолчанию
//     title = '';
//     completed: number = null;
//     priorityId: number = null;
//     categoryId: number = null;
//     pageNumber = 0; // 1-я страница (значение по-умолчанию)
//     pageSize = 5; // сколько элементов на странице (значение по-умолчанию)
//
//     // сортировка
//     sortColumn = 'title';
//     sortDirection = 'asc';
//
// }
