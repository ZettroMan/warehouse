import {CommonDao} from './CommonDao';
import {Brand} from '../../../model/Brand';
import {Observable} from 'rxjs';
import {BrandSearchValues} from '../search/SearchObjects';

// специфичные методы для работы с категориями (которые не входят в обычный CRUD)
export interface BrandDao extends CommonDao<Brand> {

    // поиск категорий по любым параметрам, указанных в CategorySearchValues
   findBrands(brandSearchValues: BrandSearchValues): Observable<any>;

}
