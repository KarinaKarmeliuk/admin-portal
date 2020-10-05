import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsListPageComponent } from 'src/app/admin-portal/clients-list/clients-list-page.component';
import { AuthGuard } from 'src/app/guards/auth-guard';

const clientsRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: ClientsListPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(clientsRoutes)],
  exports: [RouterModule],
})
export class ClientsListRoutingModule {}
