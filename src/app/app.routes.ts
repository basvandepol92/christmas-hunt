import { Routes } from '@angular/router';
import { HuntPageComponent } from './components/hunt-page/hunt-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HuntPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
