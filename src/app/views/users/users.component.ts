import {Component, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {Observable} from 'rxjs';
import {UserService} from '../../services/dao/impl/UserService';
import {Role} from '../../model/Role';
import {Brand} from '../../model/Brand';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: Observable<User[]>;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.users = this.userService.findAll();
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
