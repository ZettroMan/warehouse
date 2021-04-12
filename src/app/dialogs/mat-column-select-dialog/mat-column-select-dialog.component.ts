import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSelectionList} from '@angular/material/list';

@Component({
  selector: 'app-column-select-dialog',
  templateUrl: './mat-column-select-dialog.component.html',
  styleUrls: ['./mat-column-select-dialog.component.css']
})
export class MatColumnSelectDialogComponent implements OnInit {

  selectedColumnsControl = new FormControl();

  @ViewChild('columns') columns: MatSelectionList;

  constructor(@Inject(MAT_DIALOG_DATA) public selectedColumns: string[]) {
  }

  ngOnInit(): void {
  }

  onSelectAll(): void {
    this.columns.selectAll();
  }

  onReset(): void {
    this.columns.deselectAll();
  }
}
