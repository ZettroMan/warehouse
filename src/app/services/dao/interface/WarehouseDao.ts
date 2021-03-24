import {CommonDao} from './CommonDao';
import {WarehouseSearchValues} from '../search/SearchObjects';
import {Warehouse} from '../../../model/Warehouse';
import {Observable} from 'rxjs';

// специфичные методы для работы с категориями (которые не входят в обычный CRUD)
export interface WarehouseDao extends CommonDao<Warehouse> {

    // поиск категорий по любым параметрам, указанных в CategorySearchValues
   findWarehouses(warehouseSearchValues: WarehouseSearchValues): Observable<any>;

}
