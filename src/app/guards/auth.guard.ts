import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {StorageManagerService} from '../services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (StorageManagerService.getToken() && StorageManagerService.getUser()) {
      return true;
    } else {
      StorageManagerService.clearAll();
      this._router.navigate(['/', 'auth', 'login']);
      return true;
    }
  }
}
