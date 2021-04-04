import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Brand} from '../../model/Brand';

@Component({
  selector: 'app-edit-brand-dialog',
  templateUrl: './edit-brand-dialog.component.html',
  styleUrls: ['./edit-brand-dialog.component.css']
})
export class EditBrandDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public brand: Brand) {
  }

  ngOnInit(): void {
  }

}
