import {Component, OnInit} from '@angular/core';
import {Warehouse} from '../../model/Warehouse';
import {WarehouseService} from '../../services/dao/impl/WarehouseService';
import {MatDialog} from '@angular/material/dialog';
import {EditWarehouseDialogComponent} from '../../dialogs/edit-warehouse-dialog/edit-warehouse-dialog.component';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit {

  displayedColumns: string[] = ['No', 'name', 'abbr'];
  warehouses: Warehouse[];
  private selectedRow: null;
  private newWarehouse: Warehouse;

  constructor(private warehouseService: WarehouseService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.warehouseService.findAll().subscribe(onloadeddata => {
      this.warehouses = onloadeddata;
    });
  }

  addWarehouse(): void {
    this.newWarehouse = new Warehouse(null, '', '');
    const dialogRef = this.dialog.open(EditWarehouseDialogComponent, {data: this.newWarehouse});
    dialogRef.afterClosed().subscribe(warehouse => {
      if (warehouse) {
        this.warehouseService.add(warehouse).subscribe(onloadeddata => this.reloadData(), error => this.reloadData());
      }
    });
  }

  editWarehouse(row): void {
    console.log(row);
    this.selectedRow = row;
    const editedId = row.id;
    const dialogRef = this.dialog.open(EditWarehouseDialogComponent, {data: this.selectedRow});
    dialogRef.afterClosed().subscribe(warehouse => {
      if (warehouse) {
        if (typeof warehouse === 'string') {
          if (warehouse === 'delete') {
            this.warehouseService.delete(editedId).subscribe(() => this.reloadData(), error => this.reloadData());
          }
        } else {
          this.warehouseService.update(warehouse.id, warehouse).subscribe(() => this.reloadData(), error => this.reloadData());
        }
      }
    });
  }

  reloadData(): void {
    this.warehouseService.refresh().subscribe(onloadeddata => {
      this.warehouses = onloadeddata;
    });
  }

}
