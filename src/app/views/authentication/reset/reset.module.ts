import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import {NgSelectModule} from '@ng-select/ng-select';
import {ResetComponent} from './reset.component';
import {ResetRoutingModule} from './reset-routing.module';
import {SharedCustomModule} from '../../../shared.module';
import {FormElementsModule} from '../../../components/form-elements/form-elements.module';

@NgModule({
  declarations: [ResetComponent],
  imports: [
    CommonModule,
    ResetRoutingModule,
    DataTablesModule,
    SharedCustomModule,
    FormElementsModule,
    NgSelectModule
  ]
})
export class ResetModule {
}
