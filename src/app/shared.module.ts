import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// import {BsDatepickerModule, ModalModule, TimepickerModule} from 'ngx-bootstrap';
import {AgmCoreModule} from '@agm/core';
import {FullCalendarModule} from '@fullcalendar/angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    InfiniteScrollModule,
    FullCalendarModule,
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    AgmCoreModule,
    FullCalendarModule,
    TimepickerModule,
    BsDatepickerModule
  ]
})
export class SharedCustomModule {
}
