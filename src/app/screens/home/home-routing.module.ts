import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SegundoComponent } from './components/segundo/segundo.component';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'inicio',
        component: InicioComponent,
      },
      {
        path: 'segundo',
        component: SegundoComponent,
      },
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: '**',
        redirectTo: 'inicio',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
