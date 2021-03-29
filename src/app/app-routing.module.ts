import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from './views/users/users.component';
import {BrandsComponent} from './views/brands/brands.component';
import {WarehousesComponent} from './views/warehouses/warehouses.component';
import {ShopsComponent} from './views/shops/shops.component';
import {DeliveriesComponent} from './views/deliveries/deliveries.component';
import {ReportsComponent} from './views/reports/reports.component';
import {ProfileComponent} from './views/profile/profile.component';
import {AuthGuard} from './views/security/auth.guard';
import {LoginComponent} from './views/security/login/login.component';

const routes: Routes = [
  {
    path: 'users', component: UsersComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {
    path: 'brands', component: BrandsComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {
    path: 'warehouses', component: WarehousesComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {
    path: 'shops', component: ShopsComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {
    path: 'deliveries', component: DeliveriesComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_WAREHOUSE']
    }
  },
  {
    path: 'reports', component: ReportsComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {
    path: 'profile', component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_WAREHOUSE']
    }
  },
  {
    path: 'auth', component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
