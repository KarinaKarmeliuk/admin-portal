import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AdminPortalRoutingModule } from 'src/app/admin-portal/admin-portal-routing.module';
import { UserMenuComponent } from 'src/app/admin-portal/base/main-menu/user-menu/user-menu.component';
import { FakePageComponent } from 'src/app/mocks/fake-page/fake-page.component';
import { LocalizerModule } from 'src/app/shared/localizer/localizer.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { BasePageComponent } from './base/base-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

/**
 * Admin Portal root module.
 * Must be loaded lazy only after success login.
 * Contains basic portal modules.
 */

@NgModule({
  declarations: [
    BasePageComponent,
    NotFoundPageComponent,
    FakePageComponent,
    UserMenuComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LocalizerModule,
    AdminPortalRoutingModule,
    MaterialModule,
    TranslateModule
  ],
  exports: [BasePageComponent],
})
export class AdminPortalModule { }
