import {Component, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {UserService} from '../../services/dao/impl/UserService';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditUserDialogComponent} from '../../dialogs/edit-user-dialog/edit-user-dialog.component';
import {Role} from '../../model/Role';
import {Brand} from '../../model/Brand';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../security/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['No', 'username', 'fullname', 'email', 'phone', 'brands', 'roles'];
  dataSource = new MatTableDataSource<User>();
  dialogConfig = new MatDialogConfig();

  constructor(private userService: UserService,
              private authService: AuthService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dataSource.filterPredicate = (user, filter: string): boolean => (user.username !== filter);
    this.dataSource.filter = this.authService.getUserName();
    this.userService.findAll().subscribe(users => {
      this.dataSource.data = users;  // this forces mat-table to refresh data
    });
  }

  addUser(): void {
    this.dialogConfig.data = new User(null, '', '', '', '', [], []);
    const dialogRef = this.dialog.open(EditUserDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(user => {
      if (user) {
        this.userService.add(user).subscribe(() => this.reloadData(), error => this.reloadData());
      }
    });
  }

  editUser(row): void {
    this.dialogConfig.data = row;
    const dialogRef = this.dialog.open(EditUserDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(user => {
      if (user) {
        if (typeof user === 'string') {
          if (user === 'delete') {
            this.userService.delete(row.id).subscribe(() => this.reloadData(), error => this.reloadData());
          }
        } else {
          this.userService.update(user.id, user).subscribe(() => this.reloadData(), error => this.reloadData());
        }
      }
    });
  }

  reloadData(): void {
    this.userService.refresh().subscribe(users => {
      this.dataSource.data = users;  // this forces mat-table to refresh data
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
