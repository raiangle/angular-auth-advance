import {Component, OnInit} from '@angular/core';
import {navItems} from '../../_nav';
import {Router} from '@angular/router';
import {HelperService, StorageManagerService} from '../../services';
import _ from 'lodash';
// import {NgModule} from '@angular/core';
// import {NgSelectModule} from '@ng-select/ng-select';
// import {FormsModule,ReactiveFormsModule} from '@angular/forms';
// import {FormElementsModule} from '../../components/form-elements/form-elements.module';
// import {FormBuilder, FormGroup, Validators} from '@angular/forms';

// @NgModule({
//   imports: [
//     FormElementsModule,
//     NgSelectModule,
//   ],
//   providers: []
// })

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {

  localUser = JSON.parse(localStorage.getItem('user'));
  public minimized = false;
  public navItemsArray = [...navItems];
  navItems;

  constructor(private _router: Router) {

  }

  ngOnInit() {
    if (this.localUser && this.localUser['roles']) {
      if (this.localUser['roles'][0]['name'] === 'Agency Owner') {
        this.navItemsArray.splice(0, 1);
        this.navItems = this.navItemsArray;
      } else if (this.localUser['roles'][0]['name'] === 'Staff') {
        this.navItemsArray.splice(0, 2);
        this.navItemsArray.splice(3, 1);
        this.navItems = this.navItemsArray;
      } else {
        this.navItems = this.navItemsArray;
      }
    } else {
      this.logout();
    }
  }

  toggleMinimize(e) {
    this.minimized = e;
  }

  logout() {
    StorageManagerService.clearAll();
    this._router.navigate(['/', 'auth', 'login']);
  }
}
