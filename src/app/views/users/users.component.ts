import {Component, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {Observable} from 'rxjs';
import {UserService} from '../../services/dao/impl/UserService';

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

}
