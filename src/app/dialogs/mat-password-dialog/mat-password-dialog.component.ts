import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-mat-password-dialog',
  templateUrl: './mat-password-dialog.component.html',
  styleUrls: ['./mat-password-dialog.component.css']
})
export class MatPasswordDialogComponent implements OnInit {

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      passEdit1: new FormControl('', Validators.required),
      passEdit2: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
  }

}
