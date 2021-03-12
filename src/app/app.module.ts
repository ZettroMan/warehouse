import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SectionsComponent } from './views/sections/sections.component';
import { BrandsComponent } from './views/brands/brands.component';
import { WarehousesComponent } from './views/warehouses/warehouses.component';
import { UsersComponent } from './views/users/users.component';
import { LandingsComponent } from './views/landings/landings.component';
import { ReportsComponent } from './views/reports/reports.component';

@NgModule({
  declarations: [
    AppComponent,
    SectionsComponent,
    BrandsComponent,
    WarehousesComponent,
    UsersComponent,
    LandingsComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'users', component: UsersComponent},
      {path: 'brands', component: BrandsComponent},
      {path: 'warehouses', component: WarehousesComponent},
      {path: 'landings', component: LandingsComponent},
      {path: 'reports', component: ReportsComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
