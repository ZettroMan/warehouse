import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';

import {AppComponent} from './app.component';
import {BrandsComponent} from './views/brands/brands.component';
import {WarehousesComponent} from './views/warehouses/warehouses.component';
import {UsersComponent} from './views/users/users.component';
import {DeliveriesComponent} from './views/deliveries/deliveries.component';
import {ReportsComponent} from './views/reports/reports.component';
import {ProfileComponent} from './views/profile/profile.component';
import {ShopsComponent} from './views/shops/shops.component';


import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {DELIVERIES_URL_TOKEN} from './services/dao/impl/DeliveryService';
import {BRANDS_URL_TOKEN} from './services/dao/impl/BrandService';
import {WAREHOUSES_URL_TOKEN} from './services/dao/impl/WarehouseService';
import {SHOPS_URL_TOKEN} from './services/dao/impl/ShopService';
import {USERS_URL_TOKEN} from './services/dao/impl/UserService';
import {ROLES_URL_TOKEN} from './services/dao/impl/RoleService';
import { EditUserDialogComponent } from './dialogs/edit-user-dialog/edit-user-dialog.component';
import {FormsModule} from '@angular/forms';

registerLocaleData(localeRu);

const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'brands', component: BrandsComponent},
  {path: 'warehouses', component: WarehousesComponent},
  {path: 'shops', component: ShopsComponent},
  {path: 'deliveries', component: DeliveriesComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'profile', component: ProfileComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    BrandsComponent,
    WarehousesComponent,
    UsersComponent,
    DeliveriesComponent,
    ReportsComponent,
    ProfileComponent,
    ShopsComponent,
    EditUserDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    {
      provide: DELIVERIES_URL_TOKEN,
      // useValue: 'https://command-project-warehouse.herokuapp.com/api/v1/deliveries'
      useValue: 'http://localhost:8189/api/v1/deliveries'
    },
    {
      provide: BRANDS_URL_TOKEN,
      // useValue: 'https://command-project-warehouse.herokuapp.com/api/v1/brands'
      useValue: 'http://localhost:8189/api/v1/brands'
    },
    {
      provide: WAREHOUSES_URL_TOKEN,
      // useValue: 'https://command-project-warehouse.herokuapp.com/api/v1/warehouses'
      useValue: 'http://localhost:8189/api/v1/warehouses'
    },
    {
      provide: SHOPS_URL_TOKEN,
      // useValue: 'https://command-project-warehouse.herokuapp.com/api/v1/shops'
      useValue: 'http://localhost:8189/api/v1/shops'
    },
    {
      provide: USERS_URL_TOKEN,
      // useValue: 'https://command-project-warehouse.herokuapp.com/api/v1/users'
      useValue: 'http://localhost:8189/api/v1/users'
    },
    {
      provide: ROLES_URL_TOKEN,
      // useValue: 'https://command-project-warehouse.herokuapp.com/api/v1/roles'
      useValue: 'http://localhost:8189/api/v1/roles'
    },
  ],
  entryComponents: [
    EditUserDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
