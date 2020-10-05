import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AdminPortalModule } from 'src/app/admin-portal/admin-portal.module';

import { LoginPageComponent } from 'src/app/login/login-page.component';
import { LoginRoutingModule } from 'src/app/login/login-routing.module';
import { AuthenticationService } from 'src/app/services';
import { LocalizerModule } from 'src/app/shared/localizer/localizer.module';
import { MaterialModule } from 'src/app/shared/material.module';

import { AuthorizationComponent } from './feature/authorization/authorization.component';

@NgModule({
  declarations: [LoginPageComponent, AuthorizationComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    LocalizerModule,
    TranslateModule,
    MaterialModule,
    AdminPortalModule,
    LocalizerModule
  ],
  providers: [AuthenticationService]
})
export class LoginModule { }
