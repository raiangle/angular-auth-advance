import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataTablesModule} from 'angular-datatables';
import {NgSelectModule} from '@ng-select/ng-select';
import {SharedCustomModule} from '../../../shared.module';
import {FormElementsModule} from '../../../components/form-elements/form-elements.module';
import {ForgetComponent} from './forget.component';
import {ForgetRoutingModule} from './forget-routing.module';

@NgModule({
  declarations: [ForgetComponent],
  imports: [
    CommonModule,
    ForgetRoutingModule,
    DataTablesModule,
    SharedCustomModule,
    FormElementsModule,
    NgSelectModule
  ]
})
export class ForgetModule {
}
