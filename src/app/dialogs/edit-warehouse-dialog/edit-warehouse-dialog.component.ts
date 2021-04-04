import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Warehouse} from '../../model/Warehouse';

@Component({
  selector: 'app-edit-warehouse-dialog',
  templateUrl: './edit-warehouse-dialog.component.html',
  styleUrls: ['./edit-warehouse-dialog.component.css']
})
export class EditWarehouseDialogComponent implements OnInit {

  warehouse: Warehouse;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.warehouse = new Warehouse(this.data.id, this.data.name, this.data.abbr);
  }

}
