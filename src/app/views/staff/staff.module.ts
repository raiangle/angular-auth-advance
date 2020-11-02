import {NgModule} from '@angular/core';
import {StaffFormComponent} from './staff-form/staff-form.component';
import {CommonModule} from '@angular/common';
import {StaffComponent} from './staff.component';
import {DataTablesModule} from 'angular-datatables';
import {NgSelectModule} from '@ng-select/ng-select';
import {FormElementsModule} from '../../components/form-elements/form-elements.module';
import {SharedCustomModule} from '../../shared.module';
import {StaffViewComponent} from './staff-view/staff-view.component';
import {StaffResetPwComponent} from './staff-reset-pw/staff-reset-pw.component';
import {StaffRoutingModule} from './staff-routing.module';

@NgModule({
  declarations: [StaffComponent, StaffFormComponent, StaffViewComponent, StaffResetPwComponent],
  imports: [
    CommonModule,
    StaffRoutingModule,
    DataTablesModule,
    SharedCustomModule,
    FormElementsModule,
    NgSelectModule
  ]
})
export class StaffModule {
}
