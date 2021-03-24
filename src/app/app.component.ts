import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  // тип устройства - на будущее
  isMobile: boolean;
  isTablet: boolean;

  title = 'warehouse';

  // параметры бокового меню с категориями
  menuOpened = true;  // по умолчанию - открыто

  // TODO - здесь надо будет потом вставить SearchValues для тех сущностей, по которым нужно осуществлять поиск
  // TODO - потом сюда еще можно будет добавить DeviceDetectorService и IntroService

}
