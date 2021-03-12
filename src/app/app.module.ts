import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrandsComponent } from './views/brands/brands.component';
import { WarehousesComponent } from './views/warehouses/warehouses.component';
import { UsersComponent } from './views/users/users.component';
import { LandingsComponent } from './views/landings/landings.component';
import { ReportsComponent } from './views/reports/reports.component';
import { ProfileComponent } from './views/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandsComponent,
    WarehousesComponent,
    UsersComponent,
    LandingsComponent,
    ReportsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'users', component: UsersComponent},
      {path: 'brands', component: BrandsComponent},
      {path: 'warehouses', component: WarehousesComponent},
      {path: 'landings', component: LandingsComponent},
      {path: 'reports', component: ReportsComponent},
      {path: 'profile', component: ProfileComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
