import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DefaultLayoutComponent} from './containers/default-layout';
import {SimpleLayoutComponent} from './containers/simple-layout';
import {AuthGuard} from './guards';
import {RoleGuard} from './guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: '',
        redirectTo: 'pets',
        pathMatch: 'full'
      },
      {
        path: 'agency',
        canActivate: [AuthGuard, RoleGuard],
        data: {assignRoles: ['Admin']},
        loadChildren: () => import('./views/agency/agency.module').then(m => m.AgencyModule)
      },
      {
        path: 'staff',
        canActivate: [AuthGuard, RoleGuard],
        data: {assignRoles: ['Admin', 'Agency Owner'], role_name: 'staff'},
        loadChildren: () => import('./views/staff/staff.module').then(m => m.StaffModule)
      },
      {
        path: 'pet-owner',
        canActivate: [AuthGuard, RoleGuard],
        data: {assignRoles: ['Admin', 'Agency Owner', 'Staff'], role_name: 'client'},
        loadChildren: () => import('./views/staff/staff.module').then(m => m.StaffModule)
      },
      {
        path: 'setting/pet-type',
        canActivate: [AuthGuard, RoleGuard],
        data: {assignRoles: ['Admin', 'Agency Owner']},
        loadChildren: () => import('./views/pets-type/pets-type.module').then(m => m.PetsTypeModule)
      },
      {
        path: 'setting/allergies',
        canActivate: [AuthGuard, RoleGuard],
        data: {assignRoles: ['Admin', 'Agency Owner']},
        loadChildren: () => import('./views/allergies/allergies.module').then(m => m.AllergiesModule)
      },
      {
        path: 'pets',
        canActivate: [AuthGuard, RoleGuard],
        data: {assignRoles: ['Admin', 'Agency Owner', 'Staff']},
        loadChildren: () => import('./views/pets/pets.module').then(m => m.PetsModule)
      },
      {
        path: 'setting/activity',
        canActivate: [AuthGuard, RoleGuard],
        data: {assignRoles: ['Admin', 'Agency Owner']},
        loadChildren: () => import('./views/activity/activity.module').then(m => m.ActivityModule)
      },
      // {
      //   path: 'pet-activity',
      //   canActivate: [AuthGuard, RoleGuard],
      //   data: {assignRoles: ['Admin', 'Agency Owner', 'Staff']},
      //   loadChildren: () => import('./views/pet-activity/pet-activity.module').then(m => m.PetActivityModule)
      // },
    
    ]
  },
  {
    path: 'reset/:token',
    loadChildren: () => import('./views/authentication/reset/reset.module').then(m => m.ResetModule)
  },
  {
    path: 'forget',
    component: SimpleLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/authentication/forget/forget.module').then(m => m.ForgetModule)
      }
    ]
  },
  {
    path: 'auth',
    component: SimpleLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '404',
    component: SimpleLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/error/404.module').then(m => m.P404Module)
      }
    ]
  },
  {
    path: 'pet-owner/redirect',
    component: SimpleLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/petowner-redirect/petowner-redirect.module').then(m => m.PetownerRedirectModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
