import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {TokenStorageService} from './auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private storageService: TokenStorageService, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // const url: string = state.url;
    return this.checkUserLogin(next.data.roles);
  }

  // canActivateChild(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return this.canActivate(next, state);
  //
  // }
  //
  // canDeactivate(
  //   component: unknown,
  //   currentRoute: ActivatedRouteSnapshot,
  //   currentState: RouterStateSnapshot,
  //   nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  checkUserLogin(allowedRoles: string[]): boolean {
    if (this.storageService.getToken()) {
      const authorities: string[] = this.storageService.getAuthorities();
      // Перебираем все роли, указанные в роутинге с теми, что есть у пользователя, если есть совпадение, то позволяем перейти
      for (const authority of authorities) {
        for (const role of allowedRoles) {
          if (role === authority) {
            return true;
          }
        }
      }
    }
   // this.router.navigate(['/auth']);
    return false;
  }
}
