import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ForgetComponent} from './forget.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Forget',
    },
    children: [
      {
        path: '',
        component: ForgetComponent,
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
export class ForgetRoutingModule {
}
