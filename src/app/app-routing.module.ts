import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoaderInterceptorService } from 'src/app/interceptors/loader.interceptor.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('src/app/admin-portal/admin-portal.module').then(module => module.AdminPortalModule),
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'login',
    loadChildren: () => import('src/app/login/login.module').then(module => module.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }]
})
export class AppRoutingModule { }
