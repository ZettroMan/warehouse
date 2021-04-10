import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from './security/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  // тип устройства - на будущее
  isMobile: boolean;
  isTablet: boolean;

  title = 'warehouse';

  // параметры бокового меню с категориями
  menuOpened = true;  // по умолчанию - открыто
  _authService: AuthService;

  constructor(private authService: AuthService) {
    this._authService = authService;
  }

  ngOnInit(): void {
   }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  // getUserRole(): string {
  //   this.roles = this.tokenStorage.getAuthorities();
  //   let role: string;
  //   for (const item of this.roles) {
  //     role = JSON.stringify(item).split('":"')[1];
  //     role = role.substring(0, role.length - 2);
  //     if (role.startsWith('ROLE')) {
  //       return role;
  //     }
  //   }
  //   return null;
  // }

  // isAdmin(): boolean {
  //   return this.getUserRole() === 'ROLE_ADMIN';
  // }
  //
  // isWarehouse(): boolean {
  //   return this.getUserRole() === 'ROLE_WAREHOUSE';
  // }

  // TODO - здесь надо будет потом вставить SearchValues для тех сущностей, по которым нужно осуществлять поиск
  // TODO - потом сюда еще можно будет добавить DeviceDetectorService и IntroService

}
