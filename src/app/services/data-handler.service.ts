import {Injectable} from '@angular/core';
import {User} from '../model/User';
import {TestData} from '../data/TestData';
import {Warehouse} from '../model/Warehouse';
import {Brand} from '../model/Brand';
import {BehaviorSubject} from 'rxjs';
import {Shop} from '../model/Shop';

@Injectable({
  providedIn: 'root'
})

export class DataHandlerService {

  usersSubject = new BehaviorSubject<User[]>(TestData.users);
  warehousesSubject = new BehaviorSubject<Warehouse[]>(TestData.warehouses);
  brandsSubject = new BehaviorSubject<Brand[]>(TestData.brands);
  shopsSubject = new BehaviorSubject<Shop[]>(TestData.shops);

  constructor() {
  }

}
