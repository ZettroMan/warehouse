import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {DELIVERY_TIMES_URL_TOKEN} from './services/dao/impl/DeliveryTimeService';
import {DELIVERY_TYPES_URL_TOKEN} from './services/dao/impl/DeliveryTypeService';
import {EditUserDialogComponent} from './dialogs/edit-user-dialog/edit-user-dialog.component';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './views/security/login/login.component';
import {TokenInterceptor} from './token-interceptor';
import {AppRoutingModule} from './app-routing.module';

const BACKEND_ROOT_URL = 'https://command-project-warehouse.herokuapp.com/api/v1';
// const BACKEND_ROOT_URL = 'http://localhost:8189/api/v1';

registerLocaleData(localeRu);

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
    EditUserDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: DELIVERIES_URL_TOKEN,
      useValue: BACKEND_ROOT_URL + '/deliveries'
    },
    {
      provide: BRANDS_URL_TOKEN,
      useValue: BACKEND_ROOT_URL + '/brands'
    },
    {
      provide: WAREHOUSES_URL_TOKEN,
      useValue: BACKEND_ROOT_URL + '/warehouses'
    },
    {
      provide: SHOPS_URL_TOKEN,
      useValue: BACKEND_ROOT_URL + '/shops'
    },
    {
      provide: USERS_URL_TOKEN,
      useValue: BACKEND_ROOT_URL + '/users'
    },
    {
      provide: ROLES_URL_TOKEN,
      useValue: BACKEND_ROOT_URL + '/roles'
    },
    {
      provide: DELIVERY_TIMES_URL_TOKEN,
      useValue: BACKEND_ROOT_URL + '/delivery-times'
    },
    {
      provide: DELIVERY_TYPES_URL_TOKEN,
      useValue: BACKEND_ROOT_URL + '/delivery-types'
    },
  ],
  entryComponents: [
    EditUserDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
