import {Injectable} from '@angular/core';
import {TestData} from '../data/TestData';
import {BehaviorSubject} from 'rxjs';
import {Role} from '../model/Role';
import {DeliveryTime} from '../model/DeliveryTime';
import {DeliveryType} from '../model/DeliveryType';

@Injectable({
  providedIn: 'root'
})

export class DataHandlerService {

  rolesSubject = new BehaviorSubject<Role[]>(TestData.roles);
  deliveryTimesSubject = new BehaviorSubject<DeliveryTime[]>(TestData.deliveryTimes);
  deliveryTypesSubject = new BehaviorSubject<DeliveryType[]>(TestData.deliveryTypes);

  constructor() {
  }

}
