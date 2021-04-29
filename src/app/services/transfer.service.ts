import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Delivery} from '../model/Delivery';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  public data$ = new Subject<Delivery[]>();

  public updateData(data: Delivery[]): void {
    this.data$.next(data);
  }
}
