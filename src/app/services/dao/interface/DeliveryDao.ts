import {CommonDao} from './CommonDAO';
import {Delivery} from '../../../model/Delivery';

// специфичные методы для работы с категориями (которые не входят в обычный CRUD)
export interface DeliveryDao extends CommonDao<Delivery> {

    // поиск категорий по любым параметрам, указанных в CategorySearchValues
   // findCategories(categorySearchValues: CategorySearchValues): Observable<any>;

}
