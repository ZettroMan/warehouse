import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrandsComponent } from './views/brands/brands.component';
import { WarehousesComponent } from './views/warehouses/warehouses.component';
import { UsersComponent } from './views/users/users.component';
import { DeliveriesComponent } from './views/deliveries/deliveries.component';
import { ReportsComponent } from './views/reports/reports.component';
import { ProfileComponent } from './views/profile/profile.component';
import { ShopsComponent } from './views/shops/shops.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandsComponent,
    WarehousesComponent,
    UsersComponent,
    DeliveriesComponent,
    ReportsComponent,
    ProfileComponent,
    ShopsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'users', component: UsersComponent},
      {path: 'brands', component: BrandsComponent},
      {path: 'warehouses', component: WarehousesComponent},
      {path: 'shops', component: ShopsComponent},
      {path: 'deliveries', component: DeliveriesComponent},
      {path: 'reports', component: ReportsComponent},
      {path: 'profile', component: ProfileComponent},
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
