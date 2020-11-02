import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

import {HelperService, StorageManagerService} from '../services';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const role = JSON.parse(localStorage.getItem('user'));
    const role_name = role['roles'][0]['name'];
    console.log(role_name);
    if (role_name) {
      const assignRoles = route.data['assignRoles'];
      console.log(assignRoles);
      if (assignRoles && Object.keys(assignRoles).length > 0) {
        if (assignRoles.indexOf(role_name) > -1) {
          return true;
        } else {
          this._router.navigate(['pets']);
          return false;
        }
      }
      return true;
    } else {
      this._router.navigate(['pets']);
      return false;
    }
  }
}
