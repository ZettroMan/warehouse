import {CommonDao} from './CommonDao';
import {Observable} from 'rxjs';
import {ShopSearchValues} from '../search/SearchObjects';
import {Shop} from '../../../model/Shop';

// специфичные методы для работы с категориями (которые не входят в обычный CRUD)
export interface ShopDao extends CommonDao<Shop> {

    // поиск категорий по любым параметрам, указанных в CategorySearchValues
   findShops(shopSearchValues: ShopSearchValues): Observable<any>;

}
