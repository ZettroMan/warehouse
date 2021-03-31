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
import {DELIVERIES_URL_TOKEN, DeliveryService} from './services/dao/impl/DeliveryService';
import {BRANDS_URL_TOKEN, BrandService} from './services/dao/impl/BrandService';
import {WAREHOUSES_URL_TOKEN, WarehouseService} from './services/dao/impl/WarehouseService';
import {SHOPS_URL_TOKEN, ShopService} from './services/dao/impl/ShopService';
import {USERS_URL_TOKEN, UserService} from './services/dao/impl/UserService';
import {ROLES_URL_TOKEN, RoleService} from './services/dao/impl/RoleService';
import {DELIVERY_TIMES_URL_TOKEN, DeliveryTimeService} from './services/dao/impl/DeliveryTimeService';
import {DELIVERY_TYPES_URL_TOKEN, DeliveryTypeService} from './services/dao/impl/DeliveryTypeService';
import {AuthService, LOGIN_URL_TOKEN, REGISTER_URL_TOKEN} from './security/auth.service';
import {EditUserDialogComponent} from './dialogs/edit-user-dialog/edit-user-dialog.component';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './views/login/login.component';
import {TokenInterceptor} from './security/token-interceptor';
import {AppRoutingModule} from './app-routing.module';
import {AuthGuard} from './security/auth.guard';

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
  providers: [ AuthService, AuthGuard, BrandService, DeliveryService,
    DeliveryTimeService, DeliveryTypeService, RoleService, ShopService,
    UserService, WarehouseService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: LOGIN_URL_TOKEN,
      useValue: BACKEND_ROOT_URL + '/auth'
    },
    {
      provide: REGISTER_URL_TOKEN,
      useValue: BACKEND_ROOT_URL + '/register'
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
