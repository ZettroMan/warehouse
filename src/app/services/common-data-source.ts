import {BehaviorSubject, Observable} from 'rxjs';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {CommonService} from './dao/impl/CommonService';


export class CommonDataSource<T> implements DataSource<T> {

  dataSubject = new BehaviorSubject<T[]>([]);

  constructor(private commonService: CommonService<T>) {
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.dataSubject.complete();
  }

  refreshData(): void {
    this.commonService.refresh()
      .subscribe(data => this.dataSubject.next(data));
  }

}
