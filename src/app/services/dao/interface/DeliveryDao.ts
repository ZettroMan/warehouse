import {CommonDao} from './CommonDao';
import {Delivery} from '../../../model/Delivery';
import {DeliverySearchValues} from '../search/SearchObjects';
import {Observable} from 'rxjs';

// специфичные методы для работы с категориями (которые не входят в обычный CRUD)
export interface DeliveryDao extends CommonDao<Delivery> {

   // поиск поставок по любым параметрам, указанных в DeliverySearchValues
   findDeliveries(deliverySearchValues: DeliverySearchValues): Observable<any>;

}
