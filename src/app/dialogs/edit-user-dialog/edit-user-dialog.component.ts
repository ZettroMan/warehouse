import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Brand} from '../../model/Brand';
import {BrandService} from '../../services/dao/impl/BrandService';
import {RoleService} from '../../services/dao/impl/RoleService';
import {Role} from '../../model/Role';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/User';
import {DialogService} from '../../services/dialog.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  password = '';
  allBrands: Brand[];
  allRoles: Role[];
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public data: User,
              private dialogRef: MatDialogRef<EditUserDialogComponent>,
              private brandService: BrandService,
              private roleService: RoleService,
              private dialogService: DialogService,
              private fb: FormBuilder) {
    this.form = fb.group({
      id: [data.id],
      username: [data.username, Validators.required],
      password: [this.password],
      fullName: [data.fullName],
      email: [data.email],
      phone: [data.phone],
      brands: [data.brands],
      roles: [data.roles, Validators.required]
    });
  }

  ngOnInit(): void {
    this.brandService.findAll().subscribe(onloadeddata => this.allBrands = onloadeddata);
    this.roleService.findAll().subscribe(onloadeddata => this.allRoles = onloadeddata);
    console.log(this.data);
  }

  compareFn(o1: any, o2: any): boolean {
    return (o1.id === o2.id);
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.dialogService.openConfirmDialog('Удалить пользователя ' + this.data.username + '?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.dialogRef.close('delete');
      }
    });
  }
}
