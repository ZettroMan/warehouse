import {CommonDao} from './CommonDao';
import {User} from '../../../model/User';
import {Observable} from 'rxjs';
import {UserSearchValues} from '../search/SearchObjects';

// специфичные методы для работы с категориями (которые не входят в обычный CRUD)
export interface UserDao extends CommonDao<User> {

    // поиск категорий по любым параметрам, указанных в CategorySearchValues
   findUsers(userSearchValues: UserSearchValues): Observable<any>;

}
