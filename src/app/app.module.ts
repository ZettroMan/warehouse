import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {AppComponent} from './app.component';
import {BrandsComponent} from './views/brands/brands.component';
import {WarehousesComponent} from './views/warehouses/warehouses.component';
import {UsersComponent} from './views/users/users.component';
import {DeliveriesComponent} from './views/deliveries/deliveries.component';
import {ReportsComponent} from './views/reports/reports.component';
import {ProfileComponent} from './views/profile/profile.component';
import {ShopsComponent} from './views/shops/shops.component';

import {DELIVERY_URL_TOKEN} from './services/dao/impl/DeliveryService';
import {HttpClientModule} from '@angular/common/http';
import {SidebarModule} from 'ng-sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';

const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'brands', component: BrandsComponent},
  {path: 'warehouses', component: WarehousesComponent},
  {path: 'shops', component: ShopsComponent},
  {path: 'deliveries', component: DeliveriesComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '', component: UsersComponent},
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
    ShopsComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        SidebarModule.forRoot(),
        MatButtonModule,
        MatIconModule,
        BrowserAnimationsModule,
        MatTableModule
    ],
  providers: [
    {
      provide: DELIVERY_URL_TOKEN,
      useValue: 'https://command-project-warehouse.herokuapp.com/api/v1/deliveries'
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
