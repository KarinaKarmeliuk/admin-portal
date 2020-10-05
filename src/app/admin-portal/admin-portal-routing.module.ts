import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasePageComponent } from 'src/app/admin-portal/base/base-page.component';
import { ClientEditorComponent } from 'src/app/admin-portal/clients-list/client-editor/client-editor.component';
import { NotFoundPageComponent } from 'src/app/admin-portal/not-found-page/not-found-page.component';
import { AuthGuard } from 'src/app/guards/auth-guard';
import { FakePageComponent } from 'src/app/mocks/fake-page/fake-page.component';

const baseRoutes: Routes = [
  {
    path: '', redirectTo: '/ap/clients-list', pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'ap',
    component: BasePageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'clients-list',
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },
      {
        path: 'clients-list',
        loadChildren: () => import('src/app/admin-portal/clients-list/clients-list.module').then(module => module.ClientsListModule),
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },
      {
        path: 'clients-list/edit/:id',
        //loadChildren: () => import('src/app/admin-portal/clients-list/clients-list.module').then(module => module.ClientsListModule),
        component: ClientEditorComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'about',
        component: FakePageComponent,
        pathMatch: 'full',
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        component: NotFoundPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(baseRoutes)],
  exports: [RouterModule],
})
export class AdminPortalRoutingModule { }
