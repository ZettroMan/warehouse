import {Component, OnInit} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import {Warehouse} from '../../model/Warehouse';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit {

  warehouses: Warehouse[];

  constructor(private dataHandlerService: DataHandlerService) { }

  ngOnInit(): void {
    this.dataHandlerService.warehousesSubject.subscribe(warehouses => this.warehouses = warehouses);
  }

}
