import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {DatePipe, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';

import {AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule} from '@coreui/angular';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

import {DefaultLayoutComponent, SimpleLayoutComponent} from './containers';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app.routing';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationService, DatatableService, LoaderService,} from './services';

import {AuthGuard, TokenInterceptor} from './guards';
import {ngxLoadingAnimationTypes, NgxLoadingModule} from 'ngx-loading';
import {ToastrModule} from 'ngx-toastr';
import {ErrorInterceptor} from './guards/errror-interceptor';
import {StaffService} from './views/staff/staff.service';
import {AgencyService} from './views/agency/agency.service';
import {RoleGuard} from './guards/role.guard';
import {PetsService} from './views/pets/pets.service';
import {ActivityService} from './views/activity/activity.service';
import {PetsTypeService} from './views/pets-type/pets-type.service';
import {AllergiesService} from './views/allergies/allergies.service';

// services


const APP_CONTAINERS = [
  DefaultLayoutComponent,
  SimpleLayoutComponent
];

const APP_SERVICES = [
  LoaderService,
  AuthenticationService,
  DatatableService,
  StaffService,
  AgencyService,
  PetsService,
  ActivityService,
  PetsTypeService,
  AllergiesService
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    BsDropdownModule.forRoot(),
    HttpClientModule,
    PerfectScrollbarModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
    }),
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
  ],
  providers: [
    AuthGuard,
    RoleGuard,
    ...APP_SERVICES,
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
