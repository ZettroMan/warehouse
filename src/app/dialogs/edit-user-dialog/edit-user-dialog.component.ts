import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {User} from '../../model/User';
import {Brand} from '../../model/Brand';
import {BrandService} from '../../services/dao/impl/BrandService';
import {RoleService} from '../../services/dao/impl/RoleService';
import {Role} from '../../model/Role';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements OnInit {

  user: User;
  allBrands: Brand[];
  allRoles: Role[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private brandService: BrandService,
              private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.user = new User(this.data.id, this.data.username, this.data.fullName,
      this.data.email, this.data.phone, this.data.brands, this.data.roles);
    this.brandService.findAll().subscribe(onloadeddata => this.allBrands = onloadeddata);
    this.roleService.findAll().subscribe(onloadeddata =>  this.allRoles = onloadeddata);
  }

  compareFn(o1: any, o2: any): boolean {
    return (o1.id === o2.id);
  }
}
