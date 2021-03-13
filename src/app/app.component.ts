import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'warehouse';
  section = '';

  // tslint:disable-next-line:typedef
  setSection(section: string) {
    this.section = section;
  }
}
