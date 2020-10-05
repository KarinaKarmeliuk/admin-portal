import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ClientsListPageComponent } from 'src/app/admin-portal/clients-list/clients-list-page.component';
import { ClientsListRoutingModule } from 'src/app/admin-portal/clients-list/clients-list-routing.module';
import { ToolbarModule } from 'src/app/admin-portal/feature/toolbar/toolbar.module';
import { ClientsService } from 'src/app/services/clients.service';
import { LocalizerModule } from 'src/app/shared/localizer/localizer.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { PriorityFormatNumberPipe } from 'src/app/shared/pipes/priority-format-number.pipe';
import { PriorityFormatStringPipe } from 'src/app/shared/pipes/priority-format-string.pipe';
import { ClientEditorComponent } from './client-editor/client-editor.component';

/**
 * Admin Portal root module.
 * Must be loaded lazy only after success login.
 */

@NgModule({
  declarations: [ClientsListPageComponent, PriorityFormatStringPipe, PriorityFormatNumberPipe, ClientEditorComponent],
  imports: [
    CommonModule,
    ClientsListRoutingModule,
    ToolbarModule,
    LocalizerModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  providers: [
    ClientsService
  ]
})
export class ClientsListModule { }
