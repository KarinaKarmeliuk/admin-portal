import { CommonModule, registerLocaleData } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ClientsListPageComponent } from 'src/app/admin-portal/clients-list/clients-list-page.component';
import { ClientsListRoutingModule } from 'src/app/admin-portal/clients-list/clients-list-routing.module';
import { ClockComponent } from 'src/app/admin-portal/feature/clock/clock.component';
import { ToolbarModule } from 'src/app/admin-portal/feature/toolbar/toolbar.module';
import { ClientsService } from 'src/app/services/clients.service';
import { LocalizerModule } from 'src/app/shared/localizer/localizer.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { LocalizedDatePipe } from 'src/app/shared/pipes/localized-date.pipe';
import { PriorityFormatNumberPipe } from 'src/app/shared/pipes/priority-format-number.pipe';
import { PriorityFormatStringPipe } from 'src/app/shared/pipes/priority-format-string.pipe';
import { ClientEditorComponent } from './client-editor/client-editor.component';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu, 'ru');

/**
 * Admin Portal root module.
 * Must be loaded lazy only after success login.
 */

@NgModule({
  declarations: [
    ClientsListPageComponent,
    PriorityFormatStringPipe,
    PriorityFormatNumberPipe,
    ClientEditorComponent,
    ClockComponent,
    LocalizedDatePipe
  ],
  imports: [
    CommonModule,
    ClientsListRoutingModule,
    ToolbarModule,
    LocalizerModule,
    MaterialModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  providers: [
    ClientsService,
    { provide: LOCALE_ID, useValue: 'ru' }
  ],
  exports: [ClockComponent, LocalizedDatePipe]
})
export class ClientsListModule { }
