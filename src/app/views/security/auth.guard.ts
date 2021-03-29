import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, UrlSegment} from '@angular/router';
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
    const url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);

  }

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.storageService.getToken()) {
      const authorities: string[] = this.storageService.getAuthorities();
      // Перебираем все роли, указанные в роутинге с теми, что есть у пользователя, если есть совпадение, то позволяем перейти
      for (let i = 0; i < authorities.length; i++) {
        for (let j = 0; j < route.data.role.length; j++) {
          if (route.data.role[j] && (JSON.stringify(authorities[i]).indexOf(route.data.role[j]) > -1)) {
            return true;
          }
        }
      }
    }
    this.router.navigate(['/auth']);
    return false;
  }
}
