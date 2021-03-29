import {Component, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {UserService} from '../../services/dao/impl/UserService';
import {MatDialog} from '@angular/material/dialog';
import {EditUserDialogComponent} from '../../dialogs/edit-user-dialog/edit-user-dialog.component';
import {Role} from '../../model/Role';
import {Brand} from '../../model/Brand';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['No', 'username', 'fullname', 'email', 'phone', 'brands', 'roles'];
  users: User[];
  private selectedRow: null;
  private newUser: User;

  constructor(private userService: UserService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.reloadData();
  }

  addUser(): void {
    // this.newUser = new User();
    // const dialogRef = this.dialog.open(EditUserDialogComponent, {data: this.selectedRow});
    // dialogRef.afterClosed().subscribe(user => {
    //   if (user) {
    //     this.userService.update(user).subscribe(onloadeddata => this.reloadData());
    //   }
    // });

  }

  editUser(row): void {
    console.log(row);
    this.selectedRow = row;
    const dialogRef = this.dialog.open(EditUserDialogComponent, {data: this.selectedRow});
    dialogRef.afterClosed().subscribe(user => {
      if (user) {
        this.userService.update(user).subscribe(onloadeddata => this.reloadData());
      }
    });
  }

  reloadData(): void {
    this.userService.findAll().subscribe(onloadeddata => { this.users = onloadeddata; });
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
