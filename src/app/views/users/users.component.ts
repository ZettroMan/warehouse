import {Component, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {DataHandlerService} from '../../services/data-handler.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandlerService.usersSubject.subscribe(users => this.users = users);
  }

}
