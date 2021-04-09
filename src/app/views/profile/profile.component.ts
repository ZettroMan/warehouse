import {Component, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {UserService} from '../../services/dao/impl/UserService';
import {Brand} from '../../model/Brand';
import {Role} from '../../model/Role';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatPasswordDialogComponent} from '../../dialogs/mat-password-dialog/mat-password-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  form: FormGroup;
  dialogConfig = new MatDialogConfig();

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private dialog: MatDialog ) {
  }

  ngOnInit(): void {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.userService.findAll().subscribe(() => {
      this.user = this.userService.getCurrentUser();
      this.form = this.fb.group({
        username: [this.user.username],
        fullName: [this.user.fullName],
        email: [this.user.email],
        phone: [this.user.phone],
      });
    });
  }

  saveProfile(): void {
    this.userService.update(this.user.id, this.user).subscribe(() => this.loadUser());
  }

  reset(): void {
    this.userService.refresh().subscribe(() => {
      this.user = this.userService.getCurrentUser();
      this.form.markAsPristine();
    });
  }

  private loadUser(): void {
    this.userService.findAll().subscribe(() => {
      this.user = this.userService.getCurrentUser();
      this.form.markAsPristine();
    });
  }

  changePassword(): void {
    console.log('Change password');
    const dialogRef = this.dialog.open(MatPasswordDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(password => {
      if (password) {
        this.user.password = password;
        this.userService.update(this.user.id, this.user);
      }
    });

  }

  getFormattedRoles(roles: Role[]): string {
    let rolesList = '';
    for (let i = 0; i < roles.length; i++) {
      i === roles.length - 1 ? rolesList = rolesList + roles[i].role : rolesList = rolesList + roles[i].role + ', ';
    }
    return rolesList;
  }

  getFormattedBrands(brands: Brand[]): string {
    let brandsList = '';
    for (let i = 0; i < brands.length; i++) {
      i === brands.length - 1 ? brandsList = brandsList + brands[i].abbr : brandsList = brandsList + brands[i].abbr + ', ';
    }
    return brandsList;
  }

}
