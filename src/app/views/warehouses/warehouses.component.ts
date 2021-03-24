import {Component, OnInit} from '@angular/core';
import {Warehouse} from '../../model/Warehouse';
import {Observable} from 'rxjs';
import {WarehouseService} from '../../services/dao/impl/WarehouseService';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit {

  warehouses: Observable<Warehouse[]>;

  constructor(private warehouseService: WarehouseService) {
  }

  ngOnInit(): void {
    this.warehouses = this.warehouseService.findAll();
  }

}
