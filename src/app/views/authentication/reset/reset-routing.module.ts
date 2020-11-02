import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ResetComponent} from './reset.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Reset',
    },
    children: [
      {
        path: '',
        component: ResetComponent,
        data: {
          title: '',
        }
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetRoutingModule {
}
