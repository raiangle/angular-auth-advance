import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StaffComponent} from './staff.component';
import {StaffFormComponent} from './staff-form/staff-form.component';
import {StaffViewComponent} from './staff-view/staff-view.component';
import {StaffResetPwComponent} from './staff-reset-pw/staff-reset-pw.component';
import {HelperService} from '../../services';


const routes: Routes = [
  {
    path: '',
    data: {
      title: HelperService.getBreadcumTitle(),
    },
    children: [
      {
        path: '',
        component: StaffComponent,
        data: {
          title: '',
        }
      },
      {
        path: 'add',
        component: StaffFormComponent,
        data: {
          title: 'Add',
        }
      },
      {
        path: 'edit/:id',
        component: StaffFormComponent,
        data: {
          title: 'Edit',
        }
      },
      {
        path: 'view/:id',
        component: StaffViewComponent,
        data: {
          title: 'View',
        }
      },
      {
        path: 'reset/:id',
        component: StaffResetPwComponent,
        data: {
          title: 'Reset',
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule {

}
