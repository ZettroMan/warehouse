import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from './views/security/auth/token-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  implements OnInit{
  roles: string[];
  authorized = false;
  // тип устройства - на будущее
  isMobile: boolean;
  isTablet: boolean;

  title = 'warehouse';

  // параметры бокового меню с категориями
  menuOpened = true;  // по умолчанию - открыто

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.authorized = true;
    } else {
      this.authorized = false;
    }
  }

  // TODO - здесь надо будет потом вставить SearchValues для тех сущностей, по которым нужно осуществлять поиск
  // TODO - потом сюда еще можно будет добавить DeviceDetectorService и IntroService

}
